import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { HashHelper } from 'src/common/hash/password.hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // This hash is for the password: "Password123!"
  private readonly MOCK_USER = {
    id: 1,
    email: 'admin@example.com',
    passwordHash: '$2b$10$7p6pGjX7kK.fQZ.pA7/UeO3U9y8W9zV5m9Q8R7S6T5U4V3W2X1Y0Z', 
  };

  async login(payload: LoginAuthDto) {
    const { email, password } = payload;

    if (email !== this.MOCK_USER.email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = HashHelper.compare(password, this.MOCK_USER.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Create the JWT payload
    const jwtPayload = { 
      sub: this.MOCK_USER.id, 
      email: this.MOCK_USER.email 
    };

    return {
      access_token: await this.jwtService.signAsync(jwtPayload),
    };
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
