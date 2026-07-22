import { IsString, MinLength } from 'class-validator';

export class AtualizarSenhaDto
{
  @IsString()
  @MinLength(10)
  senhaAtual: string;

  @IsString()
  @MinLength(10)
  novaSenha: string;
}