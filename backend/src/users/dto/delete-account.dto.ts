import { Equals, IsEmail, IsString } from 'class-validator';

export const FRASE_CONFIRMACAO_EXCLUSAO = 'EXCLUIR MINHA CONTA';

export class ExcluirContaDto
{
  @IsEmail()
  email!: string;

  @IsString()
  @Equals(FRASE_CONFIRMACAO_EXCLUSAO, {
    message: `Digite exatamente "${FRASE_CONFIRMACAO_EXCLUSAO}" para confirmar a exclusão permanente da sua conta.`,
  })
  confirmacao!: string;
}
