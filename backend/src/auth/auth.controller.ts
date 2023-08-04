import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { CredentialsDto } from 'src/users/dto/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.signUp(createUserDto);
  }

  @Post('login')
  async login(
    @Body() credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    Logger.log(credentialsDto);
    return await this.authService.login(credentialsDto);
  }
}
