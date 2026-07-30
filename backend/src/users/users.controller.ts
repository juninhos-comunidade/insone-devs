import 
{
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { GuardaJwt } from '../common/guards/jwt-auth.guard';
import { IdUsuarioLogado } from '../common/decorators/current-user-id.decorator';
import { AtualizarUsuarioDto } from './dto/update-user.dto';
import { AtualizarSenhaUsuarioDto } from './dto/update-password.dto';
import { ExcluirContaDto } from './dto/delete-account.dto';
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

  @HttpCode(HttpStatus.OK)
  @Patch(':id/senha')
  async atualizarSenha(
    @Param('id') id: string,
    @Body() dados: AtualizarSenhaUsuarioDto,
    @IdUsuarioLogado() idUsuarioLogado?: string,
  )

  {
    if (id !== idUsuarioLogado)
    {
      throw new ForbiddenException('ERRO! ❌ Você só pode atualizar a senha do seu próprio usuário.');
    }

    return this.servicoUsuarios.atualizarSenhaComEmail(id, dados.email, dados.novaSenha);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remover(
    @Param('id') id: string,
    @Body() dados: ExcluirContaDto,
    @IdUsuarioLogado() idUsuarioLogado?: string,
  )
  
  {
    if (id !== idUsuarioLogado)
    {
      throw new ForbiddenException('ERRO! ❌ Você só pode excluir permanentemente o seu próprio usuário.');
    }

    await this.servicoUsuarios.removerPermanente(id, dados.email);

    return { mensagem: 'Sua conta foi excluída permanentemente. ✅' };
  }
}