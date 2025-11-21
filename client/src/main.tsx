import { createRoot } from "react-dom/client";
import { useState } from "react";
import { useQuery, useMutation, QueryClient, QueryClientProvider, useQueryClient, QueryFunction } from "@tanstack/react-query";
import { type Movie } from "@shared/schema";
import { Film, Plus, Trash2, Edit } from "lucide-react";
import "./index.css";

// QueryClient config
const getQueryFn: QueryFunction = async ({ queryKey }) => {
  const res = await fetch(queryKey.join("/") as string, { credentials: "include" });
  if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
  return await res.json();
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: { retry: false },
  },
});

async function apiRequest(method: string, url: string, data?: unknown): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });
  if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
  return res;
}

const genres = ["Ação", "Comédia", "Drama", "Ficção Científica", "Terror", "Romance", "Suspense", "Animação"];

function App() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Movie | null>(null);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(2024);
  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [rating, setRating] = useState(0);
  const [posterUrl, setPosterUrl] = useState("");

  const { data: movies = [] } = useQuery<Movie[]>({ queryKey: ["/api/movies"] });

  const create = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/movies", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/movies"] });
      setOpen(false);
      clear();
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: any) => apiRequest("PUT", `/api/movies/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/movies"] });
      setOpen(false);
      clear();
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/movies/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/movies"] });
    },
  });

  const clear = () => {
    setTitle("");
    setYear(2024);
    setGenre("");
    setSynopsis("");
    setRating(0);
    setPosterUrl("");
    setEditing(null);
  };

  const add = () => {
    clear();
    setOpen(true);
  };

  const edit = (movie: Movie) => {
    setEditing(movie);
    setTitle(movie.title);
    setYear(movie.year);
    setGenre(movie.genre);
    setSynopsis(movie.synopsis);
    setRating(movie.rating || 0);
    setPosterUrl(movie.posterUrl || "");
    setOpen(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { title, year, genre, synopsis, rating, posterUrl };
    editing ? update.mutate({ id: editing.id, data }) : create.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">CataMovie</h1>
          </div>
          <button onClick={add} className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90" data-testid="button-add-movie">
            <Plus className="h-4 w-4 inline mr-2" />
            Adicionar
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setOpen(false)}>
          <div className="bg-background rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()} data-testid="dialog-add-movie">
            <h2 className="text-lg font-bold mb-4">{editing ? "Editar" : "Adicionar"}</h2>
            <form onSubmit={submit} className="space-y-3">
              <div>
                <label className="text-sm">Título</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border rounded" data-testid="input-title" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm">Ano</label>
                  <input type="number" value={year} onChange={(e) => setYear(+e.target.value)} required className="w-full p-2 border rounded" data-testid="input-year" />
                </div>
                <div>
                  <label className="text-sm">Gênero</label>
                  <select value={genre} onChange={(e) => setGenre(e.target.value)} required className="w-full p-2 border rounded" data-testid="select-genre">
                    <option value="">Selecione</option>
                    {genres.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm">Sinopse</label>
                <textarea value={synopsis} onChange={(e) => setSynopsis(e.target.value)} required className="w-full p-2 border rounded" rows={3} data-testid="textarea-synopsis" />
              </div>
              <div>
                <label className="text-sm">Avaliação</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} type="button" onClick={() => setRating(s)} className="text-2xl">
                      {s <= rating ? "⭐" : "☆"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm">Pôster (URL)</label>
                <input type="text" value={posterUrl} onChange={(e) => setPosterUrl(e.target.value)} className="w-full p-2 border rounded" data-testid="input-posterUrl" />
              </div>
              <button type="submit" className="w-full p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90" data-testid="button-submit">
                {editing ? "Salvar" : "Adicionar"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6">
        {movies.length === 0 ? (
          <div className="text-center py-20">
            <Film className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg mb-4">Nenhum filme</p>
            <button onClick={add} className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
              <Plus className="h-4 w-4 inline mr-2" />
              Adicionar Filme
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <div key={movie.id} className="group relative overflow-hidden rounded-lg border bg-card" data-testid={`card-movie-${movie.id}`}>
                <div className="aspect-[2/3] relative">
                  {movie.posterUrl ? (
                    <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                      <Film className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-3 pt-20">
                    {movie.rating && movie.rating > 0 && (
                      <div className="flex gap-0.5 mb-1 text-xs">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <span key={i}>{i <= (movie.rating || 0) ? "⭐" : "☆"}</span>
                        ))}
                      </div>
                    )}
                    <h3 className="font-semibold text-white text-sm mb-1">{movie.title}</h3>
                    <p className="text-xs text-white/80 mb-1">{movie.year} • {movie.genre}</p>
                    <p className="text-xs text-white/70 line-clamp-2">{movie.synopsis}</p>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100">
                    <button onClick={() => edit(movie)} className="p-2 bg-secondary rounded-md" data-testid={`button-edit-${movie.id}`}>
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => remove.mutate(movie.id)} className="p-2 bg-destructive text-destructive-foreground rounded-md" data-testid={`button-delete-${movie.id}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
