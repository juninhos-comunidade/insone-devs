import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ModuloPrincipal } from './app.module';

const PORTA_PADRAO = 3000;

async function iniciar(): Promise<void> 
{
  const aplicacao = await NestFactory.create(ModuloPrincipal);
  const configuracao = aplicacao.get(ConfigService);

  aplicacao.enableCors();
  aplicacao.useGlobalPipes
  (
    new ValidationPipe
    (
      {
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }
    ),
  );

  const porta = configuracao.get<number>('PORT') ?? PORTA_PADRAO;
  await aplicacao.listen(porta);

  console.log(`O servidor está ativo e rodando na porta ${porta} ❤️🏥`);
}

iniciar();