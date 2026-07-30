import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicoApp {
  obterStatus() {
    return {
      mensagem: 'API insone-devs no ar.',
      horario: new Date().toISOString(),
    };
  }
}
