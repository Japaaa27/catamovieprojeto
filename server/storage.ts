import { type Movie, type InsertMovie, type UpdateMovie, movies } from "@shared/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAllMovies(): Promise<Movie[]>;
  getMovie(id: string): Promise<Movie | undefined>;
  createMovie(movie: InsertMovie): Promise<Movie>;
  updateMovie(id: string, movie: UpdateMovie): Promise<Movie | undefined>;
  deleteMovie(id: string): Promise<boolean>;
  seedMovies(): Promise<void>;
}

export class DbStorage implements IStorage {
  async getAllMovies(): Promise<Movie[]> {
    const allMovies = await db.select().from(movies).orderBy(movies.title);
    return allMovies;
  }

  async getMovie(id: string): Promise<Movie | undefined> {
    const result = await db.select().from(movies).where(eq(movies.id, id)).limit(1);
    return result[0];
  }

  async createMovie(insertMovie: InsertMovie): Promise<Movie> {
    const result = await db.insert(movies).values(insertMovie).returning();
    return result[0];
  }

  async updateMovie(id: string, updateMovie: UpdateMovie): Promise<Movie | undefined> {
    const result = await db
      .update(movies)
      .set(updateMovie)
      .where(eq(movies.id, id))
      .returning();
    return result[0];
  }

  async deleteMovie(id: string): Promise<boolean> {
    const result = await db.delete(movies).where(eq(movies.id, id)).returning();
    return result.length > 0;
  }

  async seedMovies(): Promise<void> {
    const existingMovies = await this.getAllMovies();
    if (existingMovies.length > 0) {
      return;
    }

    const sampleMovies: InsertMovie[] = [
      {
        title: "A Origem",
        year: 2010,
        genre: "Ficção Científica",
        synopsis: "Um ladrão que rouba segredos corporativos através do uso da tecnologia de compartilhamento de sonhos recebe a tarefa inversa de plantar uma ideia na mente de um CEO.",
        rating: 4.8,
        posterUrl: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
      },
      {
        title: "O Poderoso Chefão",
        year: 1972,
        genre: "Drama",
        synopsis: "O patriarca idoso de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.",
        rating: 4.9,
        posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      },
      {
        title: "Pulp Fiction",
        year: 1994,
        genre: "Drama",
        synopsis: "As vidas de dois assassinos da máfia, um boxeador, a esposa de um gângster e dois bandidos se entrelaçam em quatro histórias de violência e redenção.",
        rating: 4.7,
        posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      },
      {
        title: "Clube da Luta",
        year: 1999,
        genre: "Drama",
        synopsis: "Um funcionário de escritório insone e um fabricante de sabão formam um clube de luta clandestino que evolui para algo muito mais.",
        rating: 4.6,
        posterUrl: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      },
      {
        title: "Matrix",
        year: 1999,
        genre: "Ficção Científica",
        synopsis: "Um hacker descobre que a realidade que conhece é uma simulação criada por máquinas inteligentes e se junta à resistência contra elas.",
        rating: 4.7,
        posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      },
      {
        title: "Interestelar",
        year: 2014,
        genre: "Ficção Científica",
        synopsis: "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço em uma tentativa de garantir a sobrevivência da humanidade.",
        rating: 4.8,
        posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      },
    ];

    for (const movie of sampleMovies) {
      await this.createMovie(movie);
    }
  }
}

export const storage = new DbStorage();
