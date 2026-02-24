import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
const privateKey = readFileSync('jwt-private.key', 'utf8');
const publicKey = readFileSync('jwt-public.key', 'utf8');
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        // secret: config.getOrThrow<string>('JWT_SECRET'),
        privateKey: privateKey,
        publicKey: publicKey,
        signOptions: {
          algorithm: 'RS256',
          expiresIn: '1d',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
