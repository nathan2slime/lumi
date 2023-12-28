<div align="center">
  <h2>Sample</h2>
</div>

```
Name: Francisco Cajlon Jhonathan Moura Batista
Email: nathan3boss@gmail.com
LinkedIn: https://www.linkedin.com/in/nathan2slime/
Portfolio: https://www.nathan3boss.dev/
```



### 💻 Prerequisites

> If you have Docker installed, skip this step

You need the following prerequisites installed on your system.

- [Node.js](https://nodejs.org/)
  
  > Use version 18
- [Yarn](https://yarnpkg.com/)
  > Use PKG version
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/)

<!-- Packages -->
### 💾 Packages

> This is a modularized project in different packages, each with a specific function

| Name              | Description                                                            | 
| ----------------- | ---------------------------------------------------------------------- |
| `@lumi/api`       | API GraphQL for data management, made in Nestjs and TypeGraphQL                        |
| `@lumi/types`     |  Auto-generated GraphQL types                                |
| `@lumi/tsconfig`  | TypeScript configuration files                              |
| `@lumi/service`   | API for extracting data from PDFs, made in Nestjs                                   |
| `@lumi/database`   | Contains the table models for the database                                   |
| `@lumi/env`       | Configuration and validation of environment variables      |
| `@lumi/firebase`  | Loading firebase-admin credentials                          |
| `@lumi/logs`      | Custom logging                                                         |


### 👾 Environment variables

> If you are using Docker, you will not need to configure a ```.env``` . I left a file ```.env.prod``` with environment variables needed to run in a Docker environment.

> There is a ```.env.example``` file where there are examples of how to configure environment variables

```
## PostgreSQL

POSTGRES_PORT=
POSTGRES_USER=
DATABASE_TYPE=postgres
POSTGRES_PASSWORD=
POSTGRES_HOST=localhost
POSTGRES_DB=

## JWT
TOKEN_SECRET=

## Seed Data
ADMIN_PASSWORD=
ADMIN_EMAIL=

## Enviroment
NODE_ENV=production

## Service Ports
APP_API_PORT=
APP_SERVICE_PORT=

## Services URL
NEXT_PUBLIC_APP_API_URL=
NEXT_PUBLIC_APP_SERVICE_URL=
APP_WEB_URL=


## Firebase Credentials 
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_APP_ID=
```
### 🧁 Setup

Start by downloading the repository using this Git command.

```
git clone https://github.com/nathan2slime/lumi.git
```

Enter the project directory.

```
cd lumi
```

### 🚀 Running

- Using Docker

  > Run the command below, make sure the ports configured in .env.prod are available.

  ```
  docker compose up
  ```

 - No Docker

   Create the ```.env``` file with the environment variables configured.

   > Run the following commands, make sure you are using a package manager that supports workspaces. For this project I recommend using Yarn in its PKG version.
  
    ```
    yarn install
    ```
    ```
    yarn dotenv -e .env -- yarn build
    ```

    > If you have been successful so far, run the following commands on different terminals. Make sure the PostgreSQL database is running,
    with the database created and its name referenced in the ```.env```, along with the credentials.

    This runs a seed that creates the administrator user with necessary rules and permissions.
    
    ```
    yarn seed
    ```
  
   This runs the API for extracting data from a PDF.
    
    ```
    yarn dev --filter=@lumi/service
    ```

    This runs the API GraphQL
    ```
    yarn dev --filter=@lumi/api
    ```

    This runs the web application in Next.js.
    ```
    yarn dev --filter=@lumi/web
    ```
### ✔️ Testing
[Jest](https://jestjs.io/) was used to implement tests.

  - UT

    To run the unit tests, run the command below.
    
    > The following command depends on the build command (```yarn build```), consider running them first if you haven't done so before.

    ```
      yarn test
    ```
  - Cov
    
    To run coverage tests, run the command below.

    > The following command depends on the build command (```yarn build```), consider running them first if you haven't done so before.

    ```
      yarn test:cov
    ```

### 🔖 Docs
The extraction API documentation is available in the ```/api/docs``` route and the GraphQL API PLayground GraphQL is available in ```/graphql```. Make sure you put the correct host and port to access them

### 🤙 Usage
To interact with the Lumi application, authentication is required. Follow the steps below to manage users and create invoices:

1. **User authentication:**
    - Log in using your admin credentials (You can find them in your .env).
    - If you don't have an admin account, create a regular user account.

2. **Invoice creation:**
    - Only admin users have the privilege to create invoices.

3. **Invoice creation page:**
    - Navigate to the "New Bill" section by clicking on your avatar, available in the side menu.
    - Select the "New bill" option from the dropdown menu.

4. **New invoice:**
    - On the invoice creation page, you can upload an invoice.
    - Validate the extracted data to ensure accuracy.

### :snowman: Preview

<img src="https://github.com/nathan2slime/lumi/blob/master/.github/assets/312231233.png" width="80%" />
<img src="https://github.com/nathan2slime/lumi/blob/master/.github/assets/312312231.png" width="80%" />
<img src="https://github.com/nathan2slime/lumi/blob/master/.github/assets/312312311.png" width="80%" />
<img src="https://github.com/nathan2slime/lumi/blob/master/.github/assets/312312312.png" width="80%" />
<img src="https://github.com/nathan2slime/lumi/blob/master/.github/assets/312313131.png" width="80%" />
<img src="https://github.com/nathan2slime/lumi/blob/master/.github/assets/321312321.png" width="80%" />
<img src="https://github.com/nathan2slime/lumi/blob/master/.github/assets/321321313.png" width="80%" />
<img src="https://github.com/nathan2slime/lumi/blob/master/.github/assets/321321333.png" width="80%" />

