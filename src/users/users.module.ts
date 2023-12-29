import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
  
})
export class UsersModule {}

/* If you want to use the repository outside of the module which 
imports TypeOrmModule.forFeature, you'll need to re-export the 
providers generated by it. You can do this by exporting the whole 
module, like this:
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule]
})
export class UsersModule {} */