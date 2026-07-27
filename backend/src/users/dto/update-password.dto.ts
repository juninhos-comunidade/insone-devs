import { IsEmail, IsString, MinLength } from 'class-validator';

export class AtualizarSenhaUsuarioDto
{
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(10)
  novaSenha!: string;
}
