import {Controller, Get, Post, Body, Param, Delete, Put, HttpCode, Res, HttpStatus} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {UserEntity} from "./entities/user.entity";
import {Response} from 'express'
import {UserDto} from "./dto/user.dto";

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  /**
   * Add a user and send the created user as a response with 201 status.
   */
  @Post()
  async add(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.addOrUpdate(createUserDto);
  }

  /**
   * Get all users and send users as a response with 200 status.
   */
  @Get()
  async getAll(): Promise<UserDto[]> {
    return this.userService.getAll();
  }

  /**
   * Get a user by ID and send the user as a response with 200 status if found.
   * Otherwise, send 404 response
   */
  @Get(':id')
  async getById(
    @Param('id') userId: string,
    @Res() res: Response
  ): Promise<UserEntity | undefined> {
    const user: UserDto | undefined = await this.userService.getById(userId);

    if (!user) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    res.status(HttpStatus.OK).send(user);
  }

  /**
   * Update a user and send the updated user as a response with 200 status if found.
   * Otherwise, send 404 response.
   */
  @Put(':id')
  async update(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response
  ): Promise<void> {
    if (userId !== updateUserDto.id && updateUserDto.id !== null) {
      res.status(HttpStatus.BAD_REQUEST).send({ message: 'Mismatch of id' });
      return;
    }

    const userExists = !!(await this.userService.getById(userId));

    if (!userExists) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    const user: UserDto = await this.userService.addOrUpdate(updateUserDto);
    res.status(HttpStatus.OK).send(user);
  }

  /**
   * Remove a user and send a response with 204 status if found. Otherwise, send 404 response.
   */
  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id') userId: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<void> {
    const userExists = !!(await this.userService.getById(userId));

    if (!userExists) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    await this.userService.remove(userId);
  }
}
