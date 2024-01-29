# Run with `bash reset_db.sh <name-of-database>`

DATABASE_NAME=$1

dropdb $DATABASE_NAME --if-exists
createdb $DATABASE_NAME

psql $DATABASE_NAME < schema.sql
psql $DATABASE_NAME < lib/seed-data.sql
