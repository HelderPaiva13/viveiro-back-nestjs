import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { CurrentUserIterceptor } from './interceptors/current-user.interceptor';


@Module({
  imports: [
    TypeOrmModule.forFeature([UsersService]), 
    PassportModule.register({defaultStrategy: 'jwt'}),
    UsersModule,
    JwtModule.register({
      secret: 'super-secret',
      signOptions: {
        expiresIn: 18000,
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    UsersService, 
    JwtStrategy, 
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserIterceptor
    }
    ],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
