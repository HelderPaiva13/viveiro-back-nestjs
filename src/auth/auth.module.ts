import { Module, forwardRef } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from 'src/users/user.repository';
import { jwtConstants } from './constants';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]), 
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtStrategy,
    UserRepository,
    ],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
