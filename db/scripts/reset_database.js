

CREATE TABLE "Movies" (
    "id" INTEGER,
    "name" TEXT,
    "director_id" INTEGER,
    "genre" TEXT,
    "release_date" DATE,
    "rating" DECIMAL,
    PRIMARY KEY ("id")
  );
  
  CREATE TABLE "Directors" (
    "id" INTEGER,
    "first_name" TEXT,
    "last_name" TEXT,
    PRIMARY KEY ("id")
  );
  
  CREATE TABLE "Accolades" (
    "movie_id" INTEGERS,
    "director_id" INTEGERS,
    "oscars" INTEGERS,
    "baftas" INTEGERS,
    "golden_globes" INTEGERS,
    "revenue" INTEGERS
  );
  
  