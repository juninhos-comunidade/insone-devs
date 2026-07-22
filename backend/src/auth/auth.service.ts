import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User as Usuario } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CriarUsuarioDto } from '../users/dto/create-user.dto';
import { ServicoUsuarios, UsuarioSemSenha } from '../users/users.service';
import { AtualizarSenhaDto } from './dto/login-update.dto';
import { LoginDto } from './dto/login.dto';

export interface RespostaAutenticacao 
{
  tokenAcesso: string;
  usuario: UsuarioSemSenha;
}

@Injectable()
export class ServicoAutenticacao 
{
  constructor
  (
    private readonly servicoUsuarios: ServicoUsuarios,
    private readonly jwtService: JwtService,
  ) 
  {}

  private gerarToken(usuario: { id: string; email: string }): string 
  {
    return this.jwtService.sign({ sub: usuario.id, email: usuario.email });
  }

  private removerSenha(usuario: Usuario): UsuarioSemSenha 
  {
    const { password: _senha, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }

  async registrar(dadosUsuario: CriarUsuarioDto): Promise<RespostaAutenticacao> 
  {
    const usuarioCriado = await this.servicoUsuarios.criar(dadosUsuario);

    return {
      tokenAcesso: this.gerarToken(usuarioCriado),
      usuario: usuarioCriado,
    };
  }

  async entrar(credenciais: LoginDto): Promise<RespostaAutenticacao> 
  {
    const usuario = await this.servicoUsuarios.buscarPorEmail(credenciais.email);

    if (!usuario) 
    {
      throw new UnauthorizedException('E-mail ou senha inválidos. ❌ Tente novamente.');
    }

    const senhaValida = await bcrypt.compare(credenciais.senha, usuario.password);

    if (!senhaValida) 
    {
      throw new UnauthorizedException('E-mail ou senha inválidos. ❌ Tente novamente.');
    }

    return {
      tokenAcesso: this.gerarToken(usuario),
      usuario: this.removerSenha(usuario),
    };
  }

  async atualizarSenha(idUsuario: string, dados: AtualizarSenhaDto): Promise<UsuarioSemSenha>
  {
    return this.servicoUsuarios.atualizarSenha(idUsuario, dados.senhaAtual, dados.novaSenha);
  }
}