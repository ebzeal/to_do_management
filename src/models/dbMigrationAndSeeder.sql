DROP TABLE IF EXISTS list, item;
CREATE EXTENSION "uuid-ossp";

   CREATE TABLE IF NOT EXISTS
        list(
        id SERIAL PRIMARY KEY,
        name VARCHAR(96),
        dateCreated DATE NOT NULL DEFAULT CURRENT_DATE,
        dateModified DATE NOT NULL DEFAULT CURRENT_DATE
      );


   CREATE TABLE IF NOT EXISTS
        item(
        id SERIAL PRIMARY KEY,
        description VARCHAR(256),
        checked BOOLEAN DEFAULT FALSE,
        list_id INTEGER REFERENCES list(id) ON DELETE CASCADE,
        dateCreated DATE NOT NULL DEFAULT CURRENT_DATE,
        dateModified DATE NOT NULL DEFAULT CURRENT_DATE
      );
      

INSERT INTO list(name)VALUES('Saturday routine'), ('Sunday routine');

INSERT INTO item(description, checked, list_id)VALUES('Get groceries',false, 1),('Clean room',false, 1),('Work out',false, 1),('Go to church',false, 2),('Go to cinema',false, 2);