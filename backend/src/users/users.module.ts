import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Importante para injetar o PrismaService

@Module({
  imports: [PrismaModule], // Importa o Prisma para ser usado no Service
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}