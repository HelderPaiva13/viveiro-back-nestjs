import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserRepository } from './users/user.repository';
import { UsersController } from './users/users.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), 
    UsersModule, 
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UserRepository],
})
export class AppModule {}
