cp .env.local .env
yarn install

yarn prisma:migrate
yarn generate
yarn lint