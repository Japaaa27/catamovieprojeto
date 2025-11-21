import "dotenv/config";
import { db } from "../db/index";
import { movies } from "@shared/schema";

const realMovies = [
  {
    title: "O Poderoso Chefão",
    year: 1972,
    genre: "Drama",
    synopsis: "O patriarca idoso de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.",
    rating: 5,
    posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
  },
  {
    title: "Pulp Fiction",
    year: 1994,
    genre: "Drama",
    synopsis: "As vidas de dois assassinos da máfia, um boxeador, a esposa de um gângster e dois bandidos se entrelaçam em quatro histórias de violência e redenção.",
    rating: 5,
    posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg"
  },
  {
    title: "Clube da Luta",
    year: 1999,
    genre: "Drama",
    synopsis: "Um funcionário de escritório insone e um fabricante de sabão formam um clube de luta clandestino que evolui para algo muito mais.",
    rating: 5,
    posterUrl: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"
  },
  {
    title: "Matrix",
    year: 1999,
    genre: "Ficção Científica",
    synopsis: "Um hacker descobre que a realidade que conhece é uma simulação criada por máquinas inteligentes e se junta à resistência contra elas.",
    rating: 5,
    posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
  },
  {
    title: "Interestelar",
    year: 2014,
    genre: "Ficção Científica",
    synopsis: "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço em uma tentativa de garantir a sobrevivência da humanidade.",
    rating: 5,
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
  },
  {
    title: "A Origem",
    year: 2010,
    genre: "Ficção Científica",
    synopsis: "Um ladrão que rouba segredos corporativos através do uso da tecnologia de compartilhamento de sonhos recebe a tarefa inversa de plantar uma ideia na mente de um CEO.",
    rating: 3,
    posterUrl: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg"
  }
];

async function seed() {
  try {
    console.log("🌱 Iniciando seed do banco de dados...");
    
    await db.delete(movies);
    console.log("✓ Dados antigos removidos");
    
    await db.insert(movies).values(realMovies);
    console.log(`✓ ${realMovies.length} filmes inseridos com sucesso!`);
    
    console.log("\n🎬 Filmes no banco:");
    realMovies.forEach(m => console.log(`  - ${m.title} (${m.year})`));
    
    console.log("\n✅ Seed concluído!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao fazer seed:", error);
    process.exit(1);
  }
}

seed();