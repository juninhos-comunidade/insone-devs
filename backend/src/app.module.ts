import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ControladorApp } from './app.controller';
import { ServicoApp } from './app.service';
import { ModuloAutenticacao } from './auth/auth.module';
import { ModuloPrisma } from './prisma/prisma.module';
import { ModuloUsuarios } from './users/users.module';

@Module
(
  {
    imports: 
    [
      ConfigModule.forRoot({ isGlobal: true }),
      ModuloPrisma,
      ModuloAutenticacao,
      ModuloUsuarios,
    ],
    controllers: [ControladorApp],
    providers: [ServicoApp],
  }
)
export class ModuloPrincipal 
{}