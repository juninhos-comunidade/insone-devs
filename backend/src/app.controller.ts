import { Controller, Get } from '@nestjs/common';
import { ServicoApp } from './app.service';

@Controller()
export class ControladorApp 
{
  constructor(private readonly servicoApp: ServicoApp) 
  {}

  @Get()
  obterStatus() 
  {
    return this.servicoApp.obterStatus();
  }
}