 echo "Setting up todo_db"

 dropdb -h localhost -p 5432 --if-exists -U postgres "todo_db"
 createdb -h localhost -p 5432 -U postgres "todo_db"
 
 psql todo_db -U postgres < ./src/models/dbMigrationAndSeeder.sql

 echo "$database completed"
