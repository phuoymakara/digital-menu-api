import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy,  } from 'typeorm-naming-strategies';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerBehindProxyGuard } from '../common/guards/throttler-behind-proxy.guard';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/role.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: config.getOrThrow<string>('DB_HOST'),
        port: parseInt(config.get('DB_PORT') ?? '3306', 10),
        username: config.getOrThrow<string>('DB_USERNAME'),
        password: config.getOrThrow<string>('DB_PASSWORD'),
        database: config.getOrThrow<string>('DB_NAME'),
        synchronize: config.get<boolean>('DB_SYNC') || false,
        autoLoadEntities: true,
        logging: config.get('DB_LOGGING') === 'true',  // Enable logging by env
        charset: 'utf8mb4', // Charset for Khmer / Emoji safe
        timezone: 'Z', // Prevent timezone shifting issues
        retryAttempts: 5, // Retry if DB not ready (Docker / Cloud)
        retryDelay: 3000,
        // Connection pool
        extra: {
          connectionLimit: Number(config.get('DB_POOL', 10)),
        },
        // ----------------- Migrations -----------------
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        migrationsRun: config.get('DB_MIGRATIONS_RUN') === 'true', // Run migrations automatically if enabled
        // Query cache
        cache: {
          duration: Number(config.get('DB_CACHE_TTL', 30000)), // ms
        },
        isolation: 'READ COMMITTED',  // Transaction isolation
        namingStrategy: new SnakeNamingStrategy(),
        ssl:
          config.get<string>('DB_SSL') === 'true'
            ? { rejectUnauthorized: false }
            : false,
        // Replication (optional)
        /*
        ...(config.get('DB_REPLICA_HOST')
          ? {
              replication: {
                master: {
                  host: config.get('DB_HOST'),
                  port: Number(config.get('DB_PORT', 3306)),
                  username: config.get('DB_USERNAME'),
                  password: config.get('DB_PASSWORD'),
                  database: config.get('DB_NAME'),
                },
                slaves: [
                  {
                    host: config.get('DB_REPLICA_HOST'),
                    port: Number(config.get('DB_REPLICA_PORT', 3306)),
                    username: config.get('DB_REPLICA_USER'),
                    password: config.get('DB_REPLICA_PASS'),
                    database: config.get('DB_NAME'),
                  },
                ],
              },
            }
          : {}),
        */
      }),
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      })
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 100,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard
    // },
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
  ],
})
export class AppModule {}
