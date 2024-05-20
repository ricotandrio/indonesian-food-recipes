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

Open http://localhost:8080/ with your browser to see the result.
## Running Tests

To run tests, run the following command

```bash
bun test
```


## Contributing

Contributions are always welcome!

