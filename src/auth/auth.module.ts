import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/user.repository';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), UsersModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
