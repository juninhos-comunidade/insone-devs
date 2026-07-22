import { Global, Module } from '@nestjs/common';
import { ServicoPrisma } from './prisma.service';

@Global()
@Module
(
    {
        providers: [ServicoPrisma],
        exports: [ServicoPrisma],
    }
)
export class ModuloPrisma {}