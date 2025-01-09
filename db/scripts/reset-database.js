// FUNCTION TO ADD TABLES AND DATA
//This code is resetting the database, meaning it:
// Drops (deletes) any existing movies and directors tables if they exist.
// Creates two new tables: movies and directors.
// Inserts some sample data into these tables.

import { pool } from "../index.js";

async function resetDatabase() {
  try {
    // Drop existing tables if they exist
    await pool.query(`
        DROP TABLE IF EXISTS movies CASCADE;
        DROP TABLE IF EXISTS directors CASCADE;
        DROP TABLE IF EXISTS accolades CASCADE;
      `);

    // Create the directors table
    await pool.query(`
        CREATE TABLE directors (
      id INT PRIMARY KEY,           
      first_name VARCHAR(100) NOT NULL,      
      last_name VARCHAR(100) NOT NULL
      );
    `);
    // Create the movies table with a foreign key to the directors table
    await pool.query(`
          CREATE TABLE movies (
        id INT PRIMARY KEY,              
        name VARCHAR(100) NOT NULL, 
        director_id INT REFERENCES directors(id),      
        genre VARCHAR(100) NOT NULL,                      
        release_date DATE NOT NULL,                      
        rating DECIMAL(3, 2),
        FOREIGN KEY (director_id) REFERENCES directors(id)         
        );
      `);

    // Create the accolades table
    await pool.query(`
        CREATE TABLE accolades (   
      id INT PRIMARY KEY,      
      movies_id INT,                                        
      oscars INT,                             
      baftas INT,
      revenue DECIMAL(15, 2),                  
      FOREIGN KEY (movies_id) REFERENCES movies(id)
        ); 
      `);

    //Insert into Directors
    await pool.query(`
    INSERT INTO directors (id, first_name, last_name) VALUES
    (1, 'Hayao', 'Miyazaki'),
    (2, 'Makoto', 'Shinkai'),
    (3, 'John', 'Lasseter'),
    (4, 'Brad', 'Bird'),
    (5, 'Zack', 'Snyder'),
    (6, 'Martin', 'Scorsese'),
    (7, 'Peter', 'Farrelly'),      
    (8, 'Todd', 'Phillips'),        
    (9, 'Greg', 'Mottola'),         
    (10, 'James', 'Wan'),           
    (11, 'John', 'Krasinski'),      
    (12, 'Jordan', 'Peele');       
  `);

    // Insert Movies
    await pool.query(`
    INSERT INTO movies (id, name, director_id, genre, release_date, rating) VALUES
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
    (12, 'The Departed', 6, 'General', '2006-10-06', 8.5),
    (13, 'Dumb and Dumber', 7, 'Comedy', '1994-12-16', 7.3),
    (14, 'The Hangover', 8, 'Comedy', '2009-06-05', 7.7),
    (15, 'Superbad', 9, 'Comedy', '2007-08-17', 7.6),
    (16, 'The Conjuring', 10, 'Supernatural Horror', '2013-07-19', 7.5),
    (17, 'A Quiet Place', 11, 'Thriller Horror', '2018-04-06', 7.5),
    (18, 'Get Out', 12, 'Psychological Horror', '2017-02-24', 7.7);
  `);

    //Insert Accolades
    await pool.query(`
    INSERT INTO accolades (id, movies_id, oscars, baftas, revenue) VALUES
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
    (12, 12, 1, 1, 290000000),
    (13, 13, 0, 0, 247000000), 
    (14, 14, 0, 0, 467000000), 
    (15, 15, 0, 0, 169000000),  
    (16, 16, 0, 0, 319000000),  
    (17, 17, 0, 0, 341000000),  
    (18, 18, 0, 0, 255000000);  
  `);

    console.log("Database reset successful");
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // End the pool
    await pool.end();
  }
}

await resetDatabase();
