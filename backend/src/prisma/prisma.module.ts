import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Deixa o PrismaService disponível no projeto todo
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}