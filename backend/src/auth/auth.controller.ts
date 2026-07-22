import { Body, Controller, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { IdUsuarioLogado } from '../common/decorators/updated-user.decorator';
import { GuardaJwt } from '../common/guards/jwt-auth.guard';
import { CriarUsuarioDto } from '../users/dto/create-user.dto';
import { ServicoAutenticacao } from './auth.service';
import { AtualizarSenhaDto } from './dto/login-update.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class ControladorAutenticacao 
{
  constructor(private readonly servicoAutenticacao: ServicoAutenticacao) 
  {}

  @Post('register')
  async registrar(@Body() dadosUsuario: CriarUsuarioDto) 
  {
    return this.servicoAutenticacao.registrar(dadosUsuario);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async entrar(@Body() credenciais: LoginDto)
  {
    return this.servicoAutenticacao.entrar(credenciais);
  }

  @UseGuards(GuardaJwt)
  @Patch('senha')
  async atualizarSenha(
    @IdUsuarioLogado() idUsuarioLogado: string,
    @Body() dados: AtualizarSenhaDto,
  )
  {
    return this.servicoAutenticacao.atualizarSenha(idUsuarioLogado, dados);
  }
}