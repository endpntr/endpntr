# endpntr
endpntr is a tool designed to allow developers to monitor webhook notifications
- It allows you to monitor generic HTTP requests as well
- Provides you with detailed informatin about request headers, as well as paylaod

## Instuctions
1. 
```
git clone https://github.com/LSCS2401-08/endpntr.git
```
2.
```
npm install
```
3. Make sure you have both `postgresql` and `mongodb` installed
- MongoDB is community edition
- Postgres used to test was Postgres 12

4. Set up necessary schema in postgres database
- From the root of the project
```
./bin/reset_db.sh
```

5. Start the server
- Can use `npm start` for `nodemon`
```
npm run server
```
## Environment variables to include:
```
PORT='your application port'
USER='your user'
POSTGRES_DB_NAME='datbase_name'
POSTGRES_URL='host name for pg, use \conninfo to view'
POSTGRES_PORT='PORT for pg, use \conninfo to view'
MONGO_URL='mongodb://localhost:some_port'
MONGO_DB_NAME='database_name'
ENV='staging or prod or dev'
```
