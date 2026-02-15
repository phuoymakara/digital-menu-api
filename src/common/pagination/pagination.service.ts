import { SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from './pagination.dto';
import { PaginatedResult } from '../../types/pagination';

export class BasePaginationService {
  async paginate<T>(
    queryBuilder: SelectQueryBuilder<T>,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResult<T>> {
    const page = paginationDto.page ?? 1;
    const limit = paginationDto.limit ?? 10;
    const sortBy = paginationDto.sortBy;
    const order = paginationDto.order ?? 'DESC';

    const skip = (page - 1) * limit;

    if (sortBy) {
      queryBuilder.orderBy(`${queryBuilder.alias}.${sortBy}`, order);
    }

    queryBuilder.skip(skip).take(limit);

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
