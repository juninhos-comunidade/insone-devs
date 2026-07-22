import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsuarioAutenticado } from '../../types/globals';

export const UsuarioAtual = createParamDecorator
(
  (_dado: unknown, contexto: ExecutionContext): UsuarioAutenticado | undefined => 
  {
    const requisicao = contexto.switchToHttp().getRequest();
    return requisicao.user;
  },
);