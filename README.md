# API The Blog

## Tecnologias Utilizadas

- **Node.js**
- **NestJS**
- **TypeORM**
- **PostgreSQL**
- **AWS S3**
- **JWT (JSON Web Tokens)**
- **ESLint e Prettier**

## Instruções para o deployment

Para fazer o deployment da aplicação recomendo o uso do Docker para diminuir a
complexidade do deployment em produção.

> [!NOTE]
> Use a última versão disponível do Docker, que está disponível em:
> https://docs.docker.com/engine/install/.

> [!NOTE]
> Caso queira fazer o deployment local, é necessário ter instalado o
> Node.js, disponível em: https://nodejs.org/en/download.

## Configure as variáveis de ambiente

você deve renomear o .env.example para .env e então especificar as variáveis de
ambiente conforme foi solicitado ali

## Deployment via docker

1. Clone o repositório

```bash

  git clone <url-repositorio>

  cd nestjs-for-nextjs
```

2. Execute o arquivo docker-compose.yml

```bash

  docker compose up -d
```

## Deployment manual

1.  Clone o repositório

```bash
  git clone <url-repositorio>

  cd nestjs-for-nextjs
```

2. Instale as dependêcias

```bash
  npm install
```

3. Faça a build do projeto

```bash
  npm run build
```

4. Inicie o processo

```bash
  npm run start:prod
```

> [!IMPORTANT]
> A não configuração de qualquer variavel de ambiente pode causar o
> projeto a não funcionar da maneira devida
