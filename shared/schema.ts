import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const movies = pgTable("movies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  year: integer("year").notNull(),
  genre: text("genre").notNull(),
  synopsis: text("synopsis").notNull(),
  rating: real("rating").default(0),
  posterUrl: text("poster_url"),
});

export const insertMovieSchema = createInsertSchema(movies).omit({
  id: true,
}).extend({
  year: z.number().int().min(1888).max(new Date().getFullYear() + 5),
  title: z.string().min(1, "Título é obrigatório"),
  genre: z.string().min(1, "Gênero é obrigatório"),
  synopsis: z.string().min(1, "Sinopse é obrigatória"),
  rating: z.number().min(0).max(5).optional(),
  posterUrl: z.string().url("URL inválida").optional().or(z.literal("")),
});

export const updateMovieSchema = insertMovieSchema.partial();

export type InsertMovie = z.infer<typeof insertMovieSchema>;
export type UpdateMovie = z.infer<typeof updateMovieSchema>;
export type Movie = typeof movies.$inferSelect;
