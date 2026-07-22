import { PartialType } from '@nestjs/mapped-types';
import { CriarUsuarioDto } from './create-user.dto';

export class AtualizarUsuarioDto extends PartialType(CriarUsuarioDto) {}