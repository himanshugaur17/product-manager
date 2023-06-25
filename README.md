# product-manager
# Steps to run product-manager
1. Make sure docker is installed on your system, spin up the postgres using docker image, don't forget to expose it on port 5342 (docker run -d -p 5432:5432 --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword postgres)
2. Create andisor database
3. Install redis, and this should be accepting connections on port 6379
4. npm install
5. npx prisma migrate --dev (Run this command to generate schema)
6. npx prisma db seed
7. node index.js
8. Your server will be up and running port 8080.
