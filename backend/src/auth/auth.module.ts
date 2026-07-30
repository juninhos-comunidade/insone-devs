import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ModuloUsuarios } from '../users/users.module';
import { ControladorAutenticacao } from './auth.controller';
import { ServicoAutenticacao } from './auth.service';
import { EstrategiaJwt } from './jwt.strategy';

@Module(
  {
  imports: 
  [
    ModuloUsuarios,
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync
    (
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configuracao: ConfigService) => 
        (
          {
            secret: configuracao.get<string>('JWT_SECRET'),
            signOptions: 
            {
              expiresIn: configuracao.get<string>('JWT_EXPIRES_IN') ?? '1d',
            },
          }
        ),
      }
    ),
  ],

    controllers: [ControladorAutenticacao],
    providers: [ServicoAutenticacao, EstrategiaJwt],
    exports: [ServicoAutenticacao],
}
)

export class ModuloAutenticacao 
{}