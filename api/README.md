# BBC Ukraine News Frontend (Nest.js)

## :bookmark: Project Description

This project is designed to parse RSS feeds from the resource https://feeds.bbci.co.uk/ukrainian/rss.xml and also manage changes to these articles using CRUD

## Installation and Running



To install dependencies, run the following command:

```bash
npm i
```
- In the `.env` file, set the `DATABASE_URL` field to your database connection string.
- For example: postgresql://username:password@localhost:5432/database_name


To run app the following command:


```bash

# Before starting the project, you need to generate and migrate a schema to your database; to do this, use the commands below
npx prisma generate
npx prisma migrate dev # and then enter the name of migration
````

```bash
# Start App
npm run start:dev
```

- Entry point to the application :arrow_right: http://localhost:3001/api

# Accessing Protected Endpoints in Swagger

In order to interact with protected endpoints in Swagger, you need to be authenticated. Here's how you can do it:

1. Open Swagger and navigate to the "Authorize" tab.
   <a href="https://ibb.co/6F15FPG"><img src="https://i.ibb.co/rHcJH6q/auth-btn.png" alt="auth-btn" border="0"></a>

2. Enter your access token in the provided input field.
   <a href="https://ibb.co/3ypj6fw"><img src="https://i.ibb.co/fYky68b/token-auth.png" alt="token-auth" border="0"></a>
   <a href="https://ibb.co/09vb2PT"><img src="https://i.ibb.co/R6dwbLf/auth-window.png" alt="auth-window" border="0"></a>

3. Click on the "Authorize" button to authenticate yourself.

4. Once authenticated, you'll have access to the protected endpoints and can interact with them as needed.

Remember to use a valid access token that grants you the necessary permissions to access the protected endpoints. If you don't have an access token, you may need to obtain one through the authentication process provided by your application.

## Project Main structure
    📁 api
        │
        ├── 📁 libs/common
        │    └── 📁 src
        │       └── 📁 Decorators
        │           📁 utils
        ├── 📁 prisma
        └── 📁 src
            │
            ├─ 📁 app
            ├─ 📁 articles
            ├─ 📁 auth
            ├─ 📁 interfaces
            ├─ 📁 prisma
            └─ 📁 rss
Project dependencies
  - Libraries Used for Development
      - [nestjs/jwt]
      - [nestjs/passport]
      - [nestjs/swagger]
      - [bcrypt]
      - [cache-manager]
      - [class-transformer]
      - [class-validator]
      - [cookie-parser]
      - [date-fns]
      - [moment]
      - [prisma]
      - [passport-jwt]
      - [reflect-metadata]
      - [rss-parser]
      - [rxjs]
      - [uuid]
  - DB
    - PostgresSQL

## Application Overview 🛠

This application is designed with simplicity in mind and includes the following core functionalities:

- 📝 User Registration: New users can register for an account to access the application's features.
- 🔒 User Authentication: Registered users can securely log in to the application using their credentials.
- 📰 Article Viewing: Users can explore articles available within the application. They have the ability to filter articles based on their publication date, access the direct link to the original news source, and utilize a search feature for easier navigation.
- 🛡️ User Privileges: Authenticated users have additional privileges. They can delete, edit, and update articles within the application, providing them with control over their content experience.

*❗❗❗ The search should be carried out only in Ukrainian, since in other languages it will not produce results unless you
  create an article yourself, for example in English, this is due to the fact that the resource from which to parse
  articles uses data in Ukrainian.

## Since SWAGGER is integrated into the project, you can view all endpoints and test them using the link http://localhost:3001/api
<a href="https://ibb.co/VDN6WCP"><img src="https://i.ibb.co/sQP7v1M/swagger-Api.png" alt="swagger-Api" border="0"></a>

### Basically, the parsing mechanism starts 5 seconds by default after the application is launched, this period of time can be changed in .env in START_PARSE_RSS_AFTER_SECO
- The mechanism itself looks like this
```typescript
async parseRss() {
  let interval =
    Number(this.configService.get('START_PARSE_RSS_AFTER_SECONDS', 5)) * 1000;

  setTimeout(async () => {
    //get interval witch named as ttl in obj rssIntervalParse
    const rssIntervalParse = await this.parseRssArticles();
    // change interval
    if (rssIntervalParse) {
      interval = Number(rssIntervalParse) * 60 * 1000;
    } else {
      interval = 15 * 1000;
    }
    // start parse rss
    setInterval(async () => {
      await this.parseRssArticles();
    }, interval);
  }, interval);
}

async onModuleInit() {
  try {
    await this.parseRss();
  } catch (err) {
    this.logger.error(err);
    throw new InternalServerErrorException('Error parse RSS');
  }
```
## The application has several endpoints
http://localhost:3001/api

    🔗 [api](#)
    ├── 🔗 [auth]
    │   ├── POST [/api/auth/register] - Register user
    │   ├── POST [/api/auth/login] - Login
    │   ├── GET [/api/auth/check-auth] - Check authentication
    │   ├── GET [/api/auth/logout] - Logout
    │   └── GET [/api/auth/refresh-tokens] - Refresh token
    └── 🔗 [articles]
        ├── GET [/api/articles/{id}] - Get article by id
        ├── PUT [/api/articles/{id}] - Update article
        ├── DELETE [/api/articles/{id}] - Delete article
        ├── GET [/api/articles](#) - Get articles by QUERY PARAMS
        └── POST [/api/articles](#) - Create article

# Authentication in the Application

Authentication in our application is done using access tokens and refresh tokens.

## JWT

- **AccessToken**: The access token is used to authenticate the user on the server. It provides access to the application's protected resources after successful authentication.

- **RefreshToken**: The refresh token is used to refresh the access token. It typically has a longer lifespan and is used to obtain a new access token after the previous one expires.

## Authentication Process

1. The user enters their credentials (username and password).
2. Upon successful authentication, the server returns an access token and a refresh token.
3. The access token is stored on the client-side and is used for authentication with each request to protected resources.
4. If the access token expires or becomes invalid, the client can use the refresh token to obtain a new access token without the need to re-enter credentials.

## Advantages of Token-Based Authentication

- **Security**: Using tokens helps prevent the transmission of credentials with every request, thus enhancing the security of the application.
- **Convenience**: Users can remain authenticated for extended periods without needing to re-authenticate with each request.





## Author

[ClydeEroor](https://github.com/ClydeEroor)


## MIT License


