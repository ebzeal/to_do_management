 echo "Setting up todo_db_test"

 dropdb -h localhost -p 5432 --if-exists -U postgres "todo_db_test"
 createdb -h localhost -p 5432 -U postgres "todo_db_test"
 
 psql todo_db_test -U postgres < ./src/models/postgres/dbMigrationAndSeeder.sql

 echo "$database completed"
