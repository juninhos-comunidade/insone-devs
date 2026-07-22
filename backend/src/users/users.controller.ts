import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { GuardaJwt } from '../common/guards/jwt-auth.guard';
import { IdUsuarioLogado } from '../common/decorators/updated-user.decorator';
import { AtualizarUsuarioDto } from './dto/update-user.dto';
import { ServicoUsuarios } from './users.service';

@Controller('users')
@UseGuards(GuardaJwt)
export class ControladorUsuarios 
{
  constructor(private readonly servicoUsuarios: ServicoUsuarios) 
  {}

  @Get()
  async listarTodos() 
  {
    return this.servicoUsuarios.listarTodos();
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string) 
  {
    return this.servicoUsuarios.buscarPorId(id);
  }

  @Patch(':id')
  async atualizar(
    @Param('id') id: string,
    @Body() dadosAtualizacao: AtualizarUsuarioDto,
    @IdUsuarioLogado() idUsuarioLogado?: string,
  ) 
  {
    if (id !== idUsuarioLogado) 
    {
      throw new ForbiddenException('ERRO! ❌ Você só pode atualizar o seu próprio usuário.');
    }

    return this.servicoUsuarios.atualizar(id, dadosAtualizacao);
  }

  @Delete(':id')
  async remover(@Param('id') id: string, @IdUsuarioLogado() idUsuarioLogado?: string) 
  {
    if (id !== idUsuarioLogado) 
    {
      throw new ForbiddenException('ERRO! ❌ Você só pode remover o seu próprio usuário.');
    }

    return this.servicoUsuarios.remover(id);
  }
}