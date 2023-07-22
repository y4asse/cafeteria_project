# プロジェクト名

Cafeteria Project

学生同士の学食評価、共有アプリケーション

## セットアップ

mkdir プロジェクト名
git clone https://github.com/reomin/cafeteria_project.git

### 前提条件

以下のソフトウェアがインストールされていることを確認してください。

- Node.js
- npm
- Docker
- Sequel ace(データベースを GUI で確認するためのアプリケーション mac専用)

### インストール

1. プロジェクトをクローンします。

   ```shell
   mkdir "プロジェクト名"
   git clone このリポジトリ
   ```


2. Docker での実行

   docker-compose.ymlの中身
   * M1 macbookのみ以下を追加する
   ```shell
     db:
    platform: linux/x86_64 //m1 macbookのみに追加
    image: mysql:5.7
    container_name: db_container
    command: --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
    ports:
      - "3306:3306"
   ```

   ルートディレクトリで以下を実行
   ```shell
   docker-compose up -d
   ```


### 動作確認

*http://localhost:3000/ にアクセスして、「Hello World!」の文字が確認できたらバックエンド編は完了.
*http://localhost:4444/ にアクセスして Next.js の画面が確認できたらフロントエンドは完了.

Sequel Ace で下記の情報でログインできるかを確認

```shell
DATABASE_HOST: localhost
DATABASE_PORT: 3306
DATABASE_USERNAME: user
DATABASE_PASSWORD: password
DATABASE_NAME: develop
 ```

### 参考

参考 URL:https://qiita.com/a_ya_ka/items/229e234fbf0fbcf8743d
