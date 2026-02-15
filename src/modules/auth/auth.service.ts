import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { HashHelper } from 'src/common/hash/password.hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private jwtService: JwtService) {}

  // This hash is for the password: "Xieni123!"
  private readonly MOCK_USER = {
    id: 1,
    email: 'xiexieni@gmail.com',
    passwordHash:
      '$2b$12$8y/HqT2rvd15LUskJxT1..dDYEJzQrGAuYj6Hes/ZWXpLCHrbS2TS',
  };

  async login(payload: LoginAuthDto) {
    const { email, password } = payload;
    this.logger.debug(`==== User ${email} ====> Attemp to login....`);
    if (email !== this.MOCK_USER.email) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = HashHelper.compare(
      password,
      this.MOCK_USER.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const userVerified = await this.generateTokens(
      this.MOCK_USER.id,
      this.MOCK_USER.email,
    );
    this.logger.debug(`==== USER VERIFIED ====`, { ...userVerified });

    return userVerified;
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

  // Private method to generate access & refresh tokens
  private async generateTokens(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    ]);

    return {
      user: { email },
      accessToken,
      refreshToken,
    };
  }
}
