import { Module } from '@nestjs/common';
import { ControladorUsuarios } from './users.controller';
import { ServicoUsuarios } from './users.service';

@Module
(
  {
    controllers: [ControladorUsuarios],
    providers: [ServicoUsuarios],
    exports: [ServicoUsuarios],
  }
)
export class ModuloUsuarios 
{}