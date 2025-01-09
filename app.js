// Import the required modules
import express from "express";
import morgan from "morgan";

import moviesRouter from "./routes/movies.js";
import directorsRouter from "./routes/directors.js";
import accoladesRouter from "./routes/accolades.js";

// Initialize the express app
const app = express();

// Middleware
app.use(morgan("dev")); // Morgan is used for logging HTTP requests to the console in a developer-friendly format
app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests

// Use sub-routers
app.use("/movies", moviesRouter);
app.use("/directors", directorsRouter);
app.use("/accolades", accoladesRouter);

export default app;