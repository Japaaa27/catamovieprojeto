import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMovieSchema, updateMovieSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Seed database with sample movies on startup
  await storage.seedMovies();

  // GET /api/movies - Get all movies
  app.get("/api/movies", async (_req, res) => {
    try {
      const movies = await storage.getAllMovies();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch movies" });
    }
  });

  // GET /api/movies/:id - Get a single movie
  app.get("/api/movies/:id", async (req, res) => {
    try {
      const movie = await storage.getMovie(req.params.id);
      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }
      res.json(movie);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch movie" });
    }
  });

  // POST /api/movies - Create a new movie
  app.post("/api/movies", async (req, res) => {
    try {
      const result = insertMovieSchema.safeParse(req.body);

      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ error: validationError.message });
      }

      const movie = await storage.createMovie(result.data);
      res.status(201).json(movie);
    } catch (error) {
      res.status(500).json({ error: "Failed to create movie" });
    }
  });

  // PUT /api/movies/:id - Update a movie
  app.put("/api/movies/:id", async (req, res) => {
    try {
      const result = updateMovieSchema.safeParse(req.body);

      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ error: validationError.message });
      }

      const movie = await storage.updateMovie(req.params.id, result.data);
      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }
      res.json(movie);
    } catch (error) {
      res.status(500).json({ error: "Failed to update movie" });
    }
  });

  // DELETE /api/movies/:id - Delete a movie
  app.delete("/api/movies/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteMovie(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Movie not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete movie" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
