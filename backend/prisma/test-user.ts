import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const NUMERO_RODADAS_SALT = 10;

const prisma = new PrismaClient();

async function main(): Promise<void> 
{
  const senhaCriptografada = await bcrypt.hash('senhaDeTeste123', NUMERO_RODADAS_SALT);

  const usuarioTeste = await prisma.user.upsert
  (
    {
    where: { email: 'teste@insone.dev' },
    update: {},
    create: 
    {
      name: 'Usuário de Teste',
      email: 'teste@insone.dev',
      password: senhaCriptografada,
    },
  });

  console.log('Usuário de teste pronto:', usuarioTeste);
}

main()
  .catch((erro) => {
    console.error('Erro ao criar usuário de teste:', erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });