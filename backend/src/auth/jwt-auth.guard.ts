import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//AuthGuardとは、Nest.js が提供する、リクエストを認証するためのクラスです。
//クライアントから送られてきたリクエストを、JwtStrategy で定義した検証ロジックに基づいて検証します。
export class JwtAuthGuard extends AuthGuard('jwt') {}
