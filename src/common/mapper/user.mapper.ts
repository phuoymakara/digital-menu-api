import { User, UserResponseDto } from '../../types/user';

export class UserMapper {
  static toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  static toResponseList(users: User[]): UserResponseDto[] {
    return users.map((user) => this.toResponse(user));
  }
}
