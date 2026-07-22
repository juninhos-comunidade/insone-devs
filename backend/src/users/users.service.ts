import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User as Usuario } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ServicoPrisma } from '../prisma/prisma.service';
import { AtualizarUsuarioDto } from './dto/update-user.dto';
import { CriarUsuarioDto } from './dto/create-user.dto';

const NUMERO_RODADAS_SALT = 10;

export type UsuarioSemSenha = Omit<Usuario, 'password'>;

@Injectable()
export class ServicoUsuarios 
{
  constructor(private readonly prisma: ServicoPrisma) 
  {}

  private removerSenha(usuario: Usuario): UsuarioSemSenha 
  {
    const { password: _senha, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }

  async criar(dadosUsuario: CriarUsuarioDto): Promise<UsuarioSemSenha> 
  {
    const usuarioExistente = await this.prisma.user.findUnique
    (
      {
      where: { email: dadosUsuario.email },
      }
    );

    if (usuarioExistente) 
      {
      throw new ConflictException('ERRO! ❌ Já existe um usuário cadastrado com este e-mail.');
    }

    const senhaCriptografada = await bcrypt.hash(dadosUsuario.senha, NUMERO_RODADAS_SALT);

    const novoUsuario = await this.prisma.user.create(
    {
      data: 
      {
        name: dadosUsuario.nome,
        email: dadosUsuario.email,
        password: senhaCriptografada,
      },
    });

    return this.removerSenha(novoUsuario);
  }

  async listarTodos(): Promise<UsuarioSemSenha[]> 
  {
    const usuarios = await this.prisma.user.findMany();
    return usuarios.map((usuario) => this.removerSenha(usuario));
  }

  async buscarPorId(id: string): Promise<UsuarioSemSenha> 
  {
    const usuario = await this.prisma.user.findUnique({ where: { id } });

    if (!usuario) 
      {
      throw new NotFoundException('ERRO! ❌ Usuário não encontrado.');
    }

    return this.removerSenha(usuario);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> 
  {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async atualizar(id: string, dadosAtualizacao: AtualizarUsuarioDto): Promise<UsuarioSemSenha> 
  {
    await this.buscarPorId(id);

    const dados: { name?: string; email?: string; password?: string } = {};

    if (dadosAtualizacao.nome !== undefined) 
    {
      dados.name = dadosAtualizacao.nome;
    }

    if (dadosAtualizacao.email !== undefined) 
    {
      dados.email = dadosAtualizacao.email;
    }

    if (dadosAtualizacao.senha !== undefined) 
    {
      dados.password = await bcrypt.hash(dadosAtualizacao.senha, NUMERO_RODADAS_SALT);
    }

    const usuarioAtualizado = await this.prisma.user.update
    (
      {
        where: { id },
        data: dados,
      }
    );

    return this.removerSenha(usuarioAtualizado);
  }

  async atualizarSenha(id: string, senhaAtual: string, novaSenha: string): Promise<UsuarioSemSenha>
  {
    const usuario = await this.prisma.user.findUnique({ where: { id } });

    if (!usuario)
    {
      throw new NotFoundException('ERRO! ❌ Usuário não encontrado.');
    }

    const senhaAtualValida = await bcrypt.compare(senhaAtual, usuario.password);

    if (!senhaAtualValida)
    {
      throw new UnauthorizedException('ERRO! ❌ Senha atual incorreta.');
    }

    const senhaCriptografada = await bcrypt.hash(novaSenha, NUMERO_RODADAS_SALT);

    const usuarioAtualizado = await this.prisma.user.update
    (
      {
        where: { id },
        data: { password: senhaCriptografada },
      }
    );

    return this.removerSenha(usuarioAtualizado);
  }

  async remover(id: string): Promise<void>
  {
    await this.buscarPorId(id);
    await this.prisma.user.delete({ where: { id } });
  }
}