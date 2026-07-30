import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('--- Iniciando teste do Prisma ---')

  // 1. Criar um usuário de teste
  const newUser = await prisma.user.create({
    data: {
      name: 'Dev de Teste',
      email: `teste_${Date.now()}@hackathon.com`, // Email único usando timestamp
      password: 'senha_criptografada_aqui',
      role: 'CANDIDATE',
    },
  })

  console.log('✅ Usuário criado com sucesso:', newUser)

  // 2. Buscar todos os usuários do banco
  const allUsers = await prisma.user.findMany()
  console.log('📋 Lista de usuários no banco:', allUsers)
}

main()
  .catch((e) => {
    console.error('❌ Erro no teste do Prisma:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })