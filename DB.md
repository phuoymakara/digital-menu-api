#Generate Your Migration
yarn migration:generate src/migrations/InitDatabase --pretty
yarn migration:generate src/migrations/UseSnakeNaming

#Generate Your Migration
yarn migration:run
