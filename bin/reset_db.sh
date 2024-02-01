# Run with `bash reset_db.sh endpntr`

DATABASE_NAME=$1

dropdb $DATABASE_NAME --if-exists
createdb $DATABASE_NAME

psql $DATABASE_NAME < ./sql/schema.sql
psql $DATABASE_NAME < ./sql/seed-data.sql
