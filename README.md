# Movies Database Project

## Table of Contents
- [Project Structure](#project-structure)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Routes - Movies, Directors, and Accolades CRUD](#api-routes---movies-directors-and-accolades-crud)
  - [Directors Endpoints](#directors-endpoints)
  - [Movies Endpoints](#movies-endpoints)
  - [Accolades Endpoints](#accolades-endpoints)
  - [Top 10 Oscars Endpoints](#top-10-oscars-endpoints)
  - [Top 10 BAFTAs Endpoints](#top-10-baftas-endpoints)
- [License](#license)

## Project Structure

The project includes the following main components:

- **Movies Table**: Contains details about movies including the name, director, genre, release date, and rating.
- **Directors Table**: Contains information about directors, including their first and last names.
- **Accolades Table**: Stores information about movie accolades including Oscars, BAFTAs, and revenue.

### Database Tables

#### 1. Directors Table
This table stores information about movie directors.
- **id** (INT): The unique identifier for each director.
- **first_name** (VARCHAR): The first name of the director.
- **last_name** (VARCHAR): The last name of the director.

#### 2. Movies Table
This table contains information about movies.
- **id** (INT): The unique identifier for each movie.
- **name** (VARCHAR): The name of the movie.
- **director_id** (INT): A foreign key linking to the `directors` table (ID of the director).
- **genre** (VARCHAR): The genre of the movie.
- **release_date** (DATE): The release date of the movie.
- **rating** (DECIMAL): The rating of the movie (out of 10).

#### 3. Accolades Table
This table contains information about accolades received by movies.
- **id** (INT): The unique identifier for each accolade entry.
- **movies_id** (INT): A foreign key linking to the `movies` table (ID of the movie).
- **oscars** (INT): The number of Oscars the movie won.
- **baftas** (INT): The number of BAFTAs the movie won.
- **revenue** (DECIMAL): The revenue generated by the movie.

## Setup

### Prerequisites
- **Node.js**: Make sure Node.js is installed on your machine.
- **PostgreSQL**: You need a running PostgreSQL instance for the project.

### Installation
1. Clone the repository or download the project files.
2. Install the required dependencies:
    ```bash
    npm install
    ```
3. Set up the database connection by configuring the `index.js` file with your PostgreSQL credentials.
4. Run the `resetDatabase` script to create and populate the database:
    ```bash
    npm run reset-database
    ```
    This function will drop existing tables if they exist, create new tables, and insert sample data.

## API Routes - Movies, Directors, and Accolades CRUD

This project exposes a RESTful API to perform CRUD operations on the **Movies**, **Directors**, and **Accolades** tables. Below are the available API endpoints.

### Directors Endpoints
1. **Get All Directors**
   - **Endpoint**: `GET /directors`
   - **Description**: Fetch all directors from the database.

2. **Get Director by ID**
   - **Endpoint**: `GET /directors/:id`
   - **Description**: Fetch a specific director based on their ID.
   - **URL Params**: 
     - `id` (int): The ID of the director.

3. **Create a New Director**
   - **Endpoint**: `POST /directors`
   - **Description**: Create a new director record.
   - **Request Body**:
     - `first_name` (string): The first name of the director.
     - `last_name` (string): The last name of the director.

4. **Update Director by ID**
   - **Endpoint**: `PATCH /directors/:id`
   - **Description**: Update an existing director's details based on their ID.
   - **URL Params**:
     - `id` (int): The ID of the director to be updated.
   - **Request Body**: Fields that need to be updated (e.g., first_name, last_name).

5. **Delete Director by ID**
   - **Endpoint**: `DELETE /directors/:id`
   - **Description**: Delete a director record by ID.
   - **URL Params**:
     - `id` (int): The ID of the director to be deleted.

### Movies Endpoints
1. **Get All Movies**
   - **Endpoint**: `GET /movies`
   - **Description**: Fetch all movies from the database.

2. **Get Movie by ID**
   - **Endpoint**: `GET /movies/:id`
   - **Description**: Fetch a specific movie based on its ID.
   - **URL Params**: 
     - `id` (int): The ID of the movie.

3. **Create a New Movie**
   - **Endpoint**: `POST /movies`
   - **Description**: Create a new movie record.
   - **Request Body**:
     - `name` (string): The name of the movie.
     - `director_id` (int): The ID of the director.
     - `genre` (string): The genre of the movie.
     - `release_date` (string): The release date of the movie.
     - `rating` (decimal): The rating of the movie (out of 10).

4. **Update Movie by ID**
   - **Endpoint**: `PATCH /movies/:id`
   - **Description**: Update an existing movie's details based on its ID.
   - **URL Params**:
     - `id` (int): The ID of the movie to be updated.
   - **Request Body**: Fields that need to be updated (e.g., name, genre, rating).

5. **Delete Movie by ID**
   - **Endpoint**: `DELETE /movies/:id`
   - **Description**: Delete a movie record by ID.
   - **URL Params**:
     - `id` (int): The ID of the movie to be deleted.

### Accolades Endpoints
1. **Get All Accolades**
   - **Endpoint**: `GET /accolades`
   - **Description**: Fetch all accolades from the database.

2. **Get Accolade by ID**
   - **Endpoint**: `GET /accolades/:id`
   - **Description**: Fetch a specific accolade based on its ID.
   - **URL Params**:
     - `id` (int): The ID of the accolade.

3. **Create a New Accolade**
   - **Endpoint**: `POST /accolades`
   - **Description**: Create a new accolade record.
   - **Request Body**:
     - `movies_id` (int): The ID of the movie.
     - `oscars` (int): The number of Oscars the movie won.
     - `baftas` (int): The number of BAFTAs the movie won.
     - `revenue` (decimal): The revenue generated by the movie.

4. **Update Accolade by ID**
   - **Endpoint**: `PATCH /accolades/:id`
   - **Description**: Update an existing accolade's details based on its ID.
   - **URL Params**:
     - `id` (int): The ID of the accolade to be updated.
   - **Request Body**: Fields that need to be updated (e.g., oscars, baftas, revenue).

5. **Delete Accolade by ID**
   - **Endpoint**: `DELETE /accolades/:id`
   - **Description**: Delete an accolade record by ID.
   - **URL Params**:
     - `id` (int): The ID of the accolade to be deleted.

### Top 10 Oscars Endpoints
1. **Get Top 10 Movies with Most Oscars**
   - **Endpoint**: `GET /top10oscars`
   - **Description**: Fetch the top 10 movies based on the number of Oscars won.

### Top 10 BAFTAs Endpoints
1. **Get Top 10 Movies with Most BAFTAs**
   - **Endpoint**: `GET /top10baftas`
   - **Description**: Fetch the top 10 movies based on the number of BAFTAs won.



