import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const NUMERO_RODADAS_SALT = 10;

const prisma = new PrismaClient();

async function main(): Promise<void>
{
  const senhaCriptografada = await bcrypt.hash('senhaDeTeste123', NUMERO_RODADAS_SALT);

  const usuariosTeste =
  [
    { name: 'Usuário de Teste 1', email: 'teste1@insone.dev' },
    { name: 'Usuário de Teste 2', email: 'teste2@insone.dev' },
    { name: 'Usuário de Teste 3', email: 'teste3@insone.dev' },
    { name: 'Usuário de Teste 4', email: 'teste4@insone.dev' },
    { name: 'Usuário de Teste 5', email: 'teste5@insone.dev' },
    { name: 'Usuário de Teste 6', email: 'teste6@insone.dev' },
    { name: 'Usuário de Teste 7', email: 'teste7@insone.dev' },
    { name: 'Usuário de Teste 8', email: 'teste8@insone.dev' },
    { name: 'Usuário de Teste 9', email: 'teste9@insone.dev' },
    { name: 'Usuário de Teste 10', email: 'teste10@insone.dev' },
  ];

  for (const dadosUsuario of usuariosTeste)
  {
    const usuarioTeste = await prisma.user.upsert
    (
      {
        where: { email: dadosUsuario.email },
        update: {},
        create:
        {
          name: dadosUsuario.name,
          email: dadosUsuario.email,
          password: senhaCriptografada,
        },
      }
    );

    console.log(`Usuário de teste pronto: ${JSON.stringify(usuarioTeste)}`);
  }
}

main()
  .catch((erro) => {
    console.error(`Erro ao criar usuário de teste❌: ${erro}`);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });