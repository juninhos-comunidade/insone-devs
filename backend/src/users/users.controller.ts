import { Controller, Post, Body, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users') // Define a rota base: /users
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Rota de Cadastro de Usuário: POST /users
  @Post()
  @HttpCode(HttpStatus.CREATED) // Retorna Status 201
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}