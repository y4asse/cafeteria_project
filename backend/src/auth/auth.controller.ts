import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CredentialsDto } from 'src/users/dto/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<{
    id: string;
    email: string;
    image?: string;
    name?: string;
    accessToken: string;
  }> {
    return await this.authService.signUp(createUserDto);
  }

  @Post('login')
  async login(@Body() credentialsDto: CredentialsDto): Promise<{
    id: string;
    email: string;
    image?: string;
    name?: string;
    accessToken: string;
  }> {
    Logger.log(credentialsDto);
    return await this.authService.login(credentialsDto);
  }
}
