import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const IdUsuarioLogado = createParamDecorator
(
    (_dado: unknown, contexto: ExecutionContext): string | undefined => 
    {
        const requisicao = contexto.switchToHttp().getRequest();
        return requisicao.user?.id;
    },
);