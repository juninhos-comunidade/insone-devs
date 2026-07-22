import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CriarUsuarioDto 
{
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  senha: string;
}