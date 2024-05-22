# Indonesian Food Recipes 

Indonesian Food Recipes is an API that provides access to 13,503 data entries of Indonesian food recipes that I obtained from [Kaggle](https://www.kaggle.com/datasets/canggih/indonesian-food-recipes). This allows developers to fetch data related to Indonesian food for their projects.


## Tech Stack

This API is built using [Elysia](https://elysiajs.com/) with the [Bun](https://bun.sh/) runtime. It uses MySQL as the database, with Prisma as the ORM.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL = "mysql://<username>:<password>@localhost:3306/food_recipes"`

`PORT = "8080"`



## Installation

Clone the project

```bash
git clone https://github.com/ricotandrio/indonesian-food-recipes.git
```

Go to the project directory

```bash
cd indonesian-food-recipes
```

Install dependencies

```bash
bun install
```

Migrate database
```bash
bunx prisma migrate dev --name init
```

Start the server

```bash
bun run dev
```

Use http://localhost:8080/api/v1/ as the base URL and check http://localhost:8080/api/v1/swagger for API documentation.

## Dataset

To initialize your database with food recipes data, please run tests with the following command:

```bash
bun test
```
