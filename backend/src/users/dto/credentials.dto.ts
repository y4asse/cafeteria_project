import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

//認証に必要な情報をまとめたデータ転送オブジェクト
export class CredentialsDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password: string;
}
