--
-- PostgreSQL database dump
--

\restrict HxUiPUh7dzscDbZocjs9aG9dBBgSoPNXX7EOyG0yb42V2dBephrsggFHrnxRcph

-- Dumped from database version 16.9 (415ebe8)
-- Dumped by pg_dump version 16.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: movies; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.movies (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    year integer NOT NULL,
    genre text NOT NULL,
    synopsis text NOT NULL,
    rating real DEFAULT 0,
    poster_url text
);


ALTER TABLE public.movies OWNER TO neondb_owner;

--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.movies (id, title, year, genre, synopsis, rating, poster_url) FROM stdin;
82653f23-1b6e-46f4-810a-7d09559cd8e5	O Poderoso Chefão	1972	Drama	O patriarca idoso de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.	4.9	https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg
f25fe07d-5d46-45a8-ab2f-662f3c9df7fc	Pulp Fiction	1994	Drama	As vidas de dois assassinos da máfia, um boxeador, a esposa de um gângster e dois bandidos se entrelaçam em quatro histórias de violência e redenção.	4.7	https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg
591d4aef-37ef-4456-8219-7800a83672b8	Clube da Luta	1999	Drama	Um funcionário de escritório insone e um fabricante de sabão formam um clube de luta clandestino que evolui para algo muito mais.	4.6	https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg
17f1c43b-0c60-4831-bd78-98c636c6c8d6	Matrix	1999	Ficção Científica	Um hacker descobre que a realidade que conhece é uma simulação criada por máquinas inteligentes e se junta à resistência contra elas.	4.7	https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg
0e363d18-c1f0-42a1-83fa-40a650ce4568	Interestelar	2014	Ficção Científica	Uma equipe de exploradores viaja através de um buraco de minhoca no espaço em uma tentativa de garantir a sobrevivência da humanidade.	4.8	https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg
8d705016-2118-4f70-8bcd-36f698a53853	A Origem 	2010	Ficção Científica	Um ladrão que rouba segredos corporativos através do uso da tecnologia de compartilhamento de sonhos recebe a tarefa inversa de plantar uma ideia na mente de um CEO.	3	https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg
\.


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

\unrestrict HxUiPUh7dzscDbZocjs9aG9dBBgSoPNXX7EOyG0yb42V2dBephrsggFHrnxRcph

