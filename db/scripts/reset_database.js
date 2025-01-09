// FUNCTION TO ADD TABLES AND DATA
//This code is resetting the database, meaning it:
// Drops (deletes) any existing movies and directors tables if they exist.
// Creates two new tables: movies and directors.
// Inserts some sample data into these tables.

import { pool } from "../index.js";

// CREATE TABLE "Movies" (
//     "id" INTEGER,
//     "name" TEXT,
//     "director_id" INTEGER,
//     "genre" TEXT,
//     "release_date" DATE,
//     "rating" DECIMAL,
//     PRIMARY KEY ("id")
//   );
  
//   CREATE TABLE "Directors" (
//     "id" INTEGER,
//     "first_name" TEXT,
//     "last_name" TEXT,
//     PRIMARY KEY ("id")
//   );
  
//   CREATE TABLE "Accolades" (
//     "movie_id" INTEGERS,
//     "director_id" INTEGERS,
//     "oscars" INTEGERS,
//     "baftas" INTEGERS,
//     "golden_globes" INTEGERS,
//     "revenue" INTEGERS
//   );

  async function resetDatabase() {
    try {
      // Drop existing tables if they exist
      await pool.query(`
        DROP TABLE IF EXISTS Movies CASCADE;
        DROP TABLE IF EXISTS Directors CASCADE;
      `);
  
      // Create the authors table
      await pool.query(`
          CREATE TABLE Movies (
        id INT PRIMARY KEY,              
        name VARCHAR(100) NOT NULL, 
        director_id INT REFERENCES Directors(id),      
        genre VARCHAR(100) NOT NULL,                      
        release_date DATE NOT NULL,                      
        rating DECIMAL(2, 2),            
        );
      `);
     // FOREIGN KEY (director_id) REFERENCES Directors(id)  

      // Create the books table with a foreign key to the authors table
      await pool.query(`
          CREATE TABLE Directors (
        id INT PRIMARY KEY,           
        first_name VARCHAR(100) NOT NULL,      
        last_name VARCHAR(100) NOT NULL,
        
        );
      `);
  
      // Seed the authors table
      await pool.query(`
        CREATE TABLE Accolades (   
      id PRIMARY KEY,      
      movies_id INT,                                        
      oscars INT,                             
      baftas INT,
      Revenue DECIMAL(15, 2),                  
      FOREIGN KEY (Movies_ID) REFERENCES Movies(Movies_ID) 
      `);
      

      //Insert into Directors
      await pool.query(`
        INSERT INTO Directors (id, first_name, last_name) VALUES
        (1, 'Hayao', 'Miyazaki'),
        (2, 'Makoto', 'Shinkai'),
        (3, 'John', 'Lasseter'),
        (4, 'Brad', 'Bird'),
        (5, 'Zack', 'Snyder'),
        (6, 'Martin', 'Scorsese');
      `);
  
      // Insert Movies 
      await pool.query(`
        INSERT INTO Movies (id, name, director_id, genre, release_date, rating) VALUES
        (1, 'Spirited Away', 1, 'Anime', '2001-07-20', 8.6),
        (2, 'Your Name', 2, 'Anime', '2016-08-26', 8.4),
        (3, 'Toy Story', 3, 'Animation', '1995-11-22', 8.3),
        (4, 'The Incredibles', 4, 'Animation', '2004-11-05', 8.0),
        (5, '300', 5, 'General', '2006-03-09', 7.6),
        (6, 'Castle in the Sky', 1, 'Anime', '1986-08-02', 8.1),
        (7, 'Weathering with You', 2, 'Anime', '2019-07-19', 7.5),
        (8, 'Goodfellas', 6, 'General', '1990-09-19', 8.7),
        (9, 'Taxi Driver', 6, 'General', '1976-02-08', 8.3),
        (10, 'The Irishman', 6, 'General', '2019-11-27', 7.8),
        (11, 'Casino', 6, 'General', '1995-11-22', 8.2),
        (12, 'The Departed', 6, 'General', '2006-10-06', 8.5);
      `);
      
      //Insert Accolades
      await pool.query(`
        INSERT INTO Accolades (id, movies_id, oscars, baftas, revenue) VALUES
        (1, 1, 1, 2, 235000000),
        (2, 2, 0, 1, 358000000),
        (3, 3, 0, 1, 373000000),
        (4, 4, 0, 0, 633000000),
        (5, 5, 0, 0, 456000000),
        (6, 6, 0, 0, 180000000),
        (7, 7, 0, 0, 193000000),
        (8, 8, 1, 1, 465000000),
        (9, 9, 0, 0, 290000000),
        (10, 10, 0, 0, 350000000),
        (11, 11, 0, 0, 116000000),
        (12, 12, 1, 1, 290000000);
      `);

      console.log("Database reset successful");
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // End the pool
    await pool.end();
  }
};

await resetDatabase();
