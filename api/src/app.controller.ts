import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {UserDto} from './user.dto';

@Controller()
export class AppController {
    @UsePipes(new ValidationPipe())
    @Post('login')
    login(@Body() user: UserDto): UserDto {
        return user;
    }
}
