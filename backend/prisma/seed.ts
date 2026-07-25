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
    { name: 'Ana Silva', email: 'ana.silva@insone.dev' },
    { name: 'Bruno Costa', email: 'bruno.costa@insone.dev' },
    { name: 'Carla Souza', email: 'carla.souza@insone.dev' },
    { name: 'Diego Santos', email: 'diego.santos@insone.dev' },
    { name: 'Elisa Oliveira', email: 'elisa.oliveira@insone.dev' },
    { name: 'Felipe Almeida', email: 'felipe.almeida@insone.dev' },
    { name: 'Gabriela Lima', email: 'gabriela.lima@insone.dev' },
    { name: 'Hugo Pereira', email: 'hugo.pereira@insone.dev' },
    { name: 'Isabela Rocha', email: 'isabela.rocha@insone.dev' },
    { name: 'João Ferreira', email: 'joao.ferreira@insone.dev' },
  ];

  for (const dadosUsuario of usuariosTeste)
  {
    const usuario = await prisma.user.upsert
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

    console.log(`\nO usuário de nome ${usuario.name} e de E-mail ${usuario.email} 
      foi cadastrado com sucesso✅`);
  }
}

main()
  .catch(
    (erro) =>
  {
    console.error('Erro ao rodar o seed:', erro);
    process.exit(1);
  })
  .finally(async () =>
  {
    await prisma.$disconnect();
  });
