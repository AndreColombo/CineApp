import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import artigos from "../../artigos.json";

// Criando consts para facilitar o acesso á dados necessários
const imagesURL = import.meta.env.VITE_IMG;
const moviesURL = import.meta.env.VITE_APIM;
const apiKey = import.meta.env.VITE_API_KEY;

export default function Home() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loadingNowPlaying, setLoadingNowPlaying] = useState(true);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);

  const getMovieNowPlaying = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setNowPlaying(data.results || []);
      setLoadingNowPlaying(false);
    } catch (error) {
      console.error("Erro ao buscar now playing movies:", error);
      setLoadingNowPlaying(false);
    }
  };

  const getMovieUpcoming = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setUpcoming(data.results || []);
      setLoadingUpcoming(false);
    } catch (error) {
      console.error("Erro ao buscar upcoming movies:", error);
      setLoadingUpcoming(false);
    }
  };

  useEffect(() => {
    // Colocando a url da API em uma const para fácil acesso
    const nowplayingUrl = `${moviesURL}now_playing?${apiKey}`;
    getMovieNowPlaying(nowplayingUrl);
  }, []);

  useEffect(() => {
    // Colocando a url da API em uma const para fácil acesso
    const upcomingUrl = `${moviesURL}upcoming?${apiKey}`;
    getMovieUpcoming(upcomingUrl);
  }, []);

  return (
    <>
      <h1 className="text-26  dark:text-FF pl-14 font-bold text-xl mt-4">
        Nos Cinemas
      </h1>

      {/* --------------------- Scroll de filmes 1: Filmes Nos Cinemas --------------------- */}
      <div className="p-5">
        <div className="flex gap-5 overflow-x-auto custom-scrollbar pb-1">
          {/* Mapeando a API de filmes Now Playing */}
          {nowPlaying.map((nowPlaying) => (
            <div
              key={nowPlaying.id}
              className="bg-DF dark:bg-18 text-26 text-opacity-75 dark:text-FF dark:text-opacity-75 flex-shrink-0 flex max-w-md overflow-hidden rounded-lg"
            >
              <Link to={`ingresso/${nowPlaying.id}`} className="flex">
                <img
                  className=""
                  src={`${imagesURL}${nowPlaying.poster_path}`}
                  alt={nowPlaying.title}
                />
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between">
                      <h1 className="text-lg font-bold line-clamp-1 w-44">
                        {nowPlaying.title}
                      </h1>
                      <div>
                        <span className="bg-FF dark:bg-black text-26 text-opacity-80 dark:text-FF dark:text-opacity-80 font-medium p-1 rounded text-xs flex-shrink-0">
                          00+
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-opacity-75 line-clamp-6 mt-2">
                      {nowPlaying.overview}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="bg-FF dark:bg-black text-26 text-opacity-80 dark:text-FF dark:text-opacity-80 font-medium p-1 rounded uppercase text-xs flex-shrink-0">
                        dub
                      </span>
                      <span className="bg-FF dark:bg-black text-26 text-opacity-80 dark:text-FF dark:text-opacity-80 font-medium p-1 rounded uppercase text-xs flex-shrink-0">
                        {nowPlaying.original_language}
                      </span>
                    </div>
                    <span className="bg-B0 text-FF font-medium p-1 rounded uppercase text-xs flex-shrink-0">
                      Comprar ingresso
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* ---------------------------------------------------------------------------------- */}

      <h1 className="text-26 dark:text-FF pl-14 font-bold text-xl mt-4">
        Próximas Estreias
      </h1>

      {/* --------------------- Scroll de filmes 2: Filmes Próximas Estreias --------------------- */}
      <div className="p-5">
        <div className="flex gap-5 overflow-x-auto custom-scrollbar pb-1">
          {/* Mapeando a API de filmes Upcoming */}
          {upcoming.map((upcoming) => (
            <div
              key={upcoming.id}
              className="bg-DF dark:bg-18 text-26 text-opacity-75 dark:text-FF dark:text-opacity-75 flex-shrink-0 flex max-w-md overflow-hidden rounded-lg"
            >
              <Link to={`filmes/${upcoming.id}`} className="flex">
                <img
                  className=""
                  src={`${imagesURL}${upcoming.poster_path}`}
                  alt={upcoming.title}
                />
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between">
                      <h1 className="text-lg font-bold line-clamp-1 w-44">
                        {upcoming.title}
                      </h1>
                      <div>
                        <span className="bg-FF dark:bg-black text-26 text-opacity-80 dark:text-FF dark:text-opacity-80 font-medium p-1 rounded text-xs">
                          00+
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-opacity-75 line-clamp-6 mt-2">
                      {upcoming.overview}
                    </p>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <span className="bg-FF dark:bg-black text-26 text-opacity-80 dark:text-FF dark:text-opacity-80 font-medium p-1 rounded uppercase text-xs">
                        dub
                      </span>
                      <span className="bg-FF dark:bg-black text-26 text-opacity-80 dark:text-FF dark:text-opacity-80 font-medium p-1 rounded uppercase text-xs">
                        {upcoming.original_language}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* ---------------------------------------------------------------------------------------- */}

      <h1 className="text-26 dark:text-FF pl-14 font-bold text-xl mt-4">
        Notícias Recentes
      </h1>

      {/* --------------------- Scroll de filmes 2: Filmes Próximas Estreias --------------------- */}
      <div className="p-5">
        <div className="flex gap-5 overflow-x-auto custom-scrollbar pb-1">
          {/* Mapeando o JSON de notícias */}
          {artigos
            .slice(21, 31)
            .reverse()
            .map((noticia) => (
              <div
                key={noticia.id}
                className="flex-shrink-0 rounded-lg p-3 bg-DF dark:bg-18 w-3/12"
              >
                <Link to={`noticias/${noticia.id}`} className="flex flex-col">
                  <img className="rounded" src={noticia.image} />
                  <h1 className="text-26 dark:text-FF font-bold text-lg line-clamp-1 my-2">
                    {noticia.title}
                  </h1>
                  <p className="line-clamp-3 text-26 text-opacity-90 dark:text-FF dark:text-opacity-90">
                    {noticia.text}
                  </p>
                  <div className="flex-grow"></div>
                  <div className="flex flex-row justify-between text-26 text-opacity-70 dark:text-FF dark:text-opacity-70 text-sm mt-5">
                    <p>{noticia.data}</p>
                    <p>{noticia.autor}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
