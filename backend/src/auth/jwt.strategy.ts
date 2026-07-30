import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuarioAutenticado } from '../types/globals';

interface PayloadToken 
{
  sub: string;
  email: string;
}

@Injectable()
export class EstrategiaJwt extends PassportStrategy(Strategy, 'jwt') 
{
  constructor(configuracao: ConfigService) 
  {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configuracao.get<string>('JWT_SECRET') ?? '',
      }
    );
  }

  async validate(payload: PayloadToken): Promise<UsuarioAutenticado> 
  {
    if (!payload?.sub) 
      {
      throw new UnauthorizedException('Token inválido. ❌ Usuario não encontrado.');
    }

    return { id: payload.sub, email: payload.email };
  }
}