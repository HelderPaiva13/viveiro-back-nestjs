import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { RoleGuard } from 'src/guards/roles.guard';



@Module({
  imports: [TypeOrmModule.forFeature([User]),
  PassportModule.register({ defaultStrategy: 'jwt'}),
],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, UsersModule]
})
export class UsersModule {}
