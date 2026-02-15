import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';
import snakecaseKeys from 'snakecase-keys';

@Injectable()
export class SnakeCaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        if (!data || typeof(data)!=="object") return data;

        const plainData = instanceToPlain(data);

        return snakecaseKeys(plainData, { deep: true });
      }),
    );
  }
}
