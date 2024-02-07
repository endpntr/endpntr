# endpntr
endpntr is a tool that allows developers to monitor webhooks by generating random endpoints to target
- It allows you to monitor generic HTTP requests as well
- Provides you with detailed information about request headers, as well as payload

To see frontend react app, go to: https://github.com/LSCS2401-08/endpntr-frontend



## Instructions to run app
### 1. Clone the repo
```
git clone https://github.com/LSCS2401-08/endpntr.git
```
### 2. Install packages
```
npm install
```
### 3. Make sure you have both `postgresql` and `mongodb` installed
- MongoDB is community edition
- Postgres used to test was Postgres 12

### 4. Set up necessary schema in postgres database
- From the root of the project
```
./bin/reset_db.sh
```

### 5. Environment variables to include:
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

### 6. Start the server
- Can alternatively `npm start` for `nodemon`
```
npm run server
```

### 7. Exposing localhost endpoint using ngrok
- We need a way to expose a public IP address to register an endpoint with webhook provider
- ngrok is used for this purpose in testing
- Replace domain name with whatever ngrok produces

```
ngrok http localhost:3000
```
