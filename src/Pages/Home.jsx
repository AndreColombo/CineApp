import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import artigos from "../../artigos.json";

// Creating consts to access tha necessary data easier
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
      <h1 className='mt-4 pl-14 text-xl font-bold text-26 dark:text-FF'>Nos Cinemas</h1>

      {/* --------------------- Scroll de filmes 1: Filmes Nos Cinemas --------------------- */}
      <div className='p-5'>
        <div className='custom-scrollbar flex gap-5 overflow-x-auto pb-1'>
          {/* Mapeando a API de filmes Now Playing */}
          {nowPlaying.map((nowPlaying) => (
            <div
              key={nowPlaying.id}
              className='flex max-w-md flex-shrink-0 overflow-hidden rounded-lg bg-DF text-26 text-opacity-75 dark:bg-18 dark:text-FF dark:text-opacity-75'>
              <Link to={`ingresso/${nowPlaying.id}`} className='flex'>
                <img className='' src={`${imagesURL}${nowPlaying.poster_path}`} alt={nowPlaying.title} />
                <div className='flex flex-col justify-between p-4'>
                  <div>
                    <div className='flex justify-between'>
                      <h1 className='line-clamp-1 w-44 text-lg font-bold'>{nowPlaying.title}</h1>
                      <div>
                        <span className='flex-shrink-0 rounded bg-FF p-1 text-xs font-medium text-26 text-opacity-80 dark:bg-black dark:text-FF dark:text-opacity-80'>
                          00+
                        </span>
                      </div>
                    </div>
                    <p className='mt-2 line-clamp-6 text-sm'>{nowPlaying.overview}</p>
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex items-center space-x-2'>
                      <span className='flex-shrink-0 rounded bg-FF p-1 text-xs font-medium uppercase text-26 text-opacity-80 dark:bg-black dark:text-FF dark:text-opacity-80'>
                        dub
                      </span>
                      <span className='flex-shrink-0 rounded bg-FF p-1 text-xs font-medium uppercase text-26 text-opacity-80 dark:bg-black dark:text-FF dark:text-opacity-80'>
                        {nowPlaying.original_language}
                      </span>
                    </div>
                    <span className='flex-shrink-0 rounded bg-E4 p-1 text-xs font-medium uppercase text-FF dark:bg-B0'>Comprar ingresso</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* ---------------------------------------------------------------------------------- */}

      <h1 className='mt-4 pl-14 text-xl font-bold text-26 dark:text-FF'>Próximas Estreias</h1>

      {/* ------------------ Scroll de filmes 2: Filmes Próximas Estreias ------------------ */}
      <div className='p-5'>
        <div className='custom-scrollbar flex gap-5 overflow-x-auto pb-1'>
          {/* Mapeando a API de filmes Upcoming */}
          {upcoming.map((upcoming) => (
            <div
              key={upcoming.id}
              className='flex max-w-md flex-shrink-0 overflow-hidden rounded-lg bg-DF text-26 text-opacity-75 dark:bg-18 dark:text-FF dark:text-opacity-75'>
              <Link to={`filmes/${upcoming.id}`} className='flex'>
                <img className='' src={`${imagesURL}${upcoming.poster_path}`} alt={upcoming.title} />
                <div className='flex flex-col justify-between p-4'>
                  <div>
                    <div className='flex justify-between'>
                      <h1 className='line-clamp-1 w-44 text-lg font-bold'>{upcoming.title}</h1>
                      <div>
                        <span className='rounded bg-FF p-1 text-xs font-medium text-26 text-opacity-80 dark:bg-black dark:text-FF dark:text-opacity-80'>00+</span>
                      </div>
                    </div>
                    <p className='mt-2 line-clamp-6 text-sm'>{upcoming.overview}</p>
                  </div>
                  <div className='mt-2'>
                    <div className='flex items-center space-x-2'>
                      <span className='rounded bg-FF p-1 text-xs font-medium uppercase text-26 text-opacity-80 dark:bg-black dark:text-FF dark:text-opacity-80'>dub</span>
                      <span className='rounded bg-FF p-1 text-xs font-medium uppercase text-26 text-opacity-80 dark:bg-black dark:text-FF dark:text-opacity-80'>
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
      {/* ---------------------------------------------------------------------------------- */}

      <h1 className='mt-4 pl-14 text-xl font-bold text-26 dark:text-FF'>Notícias Recentes</h1>

      {/* ---------------------- Scroll de notícias: Notícias Recentes ---------------------- */}
      <div className='p-5'>
        <div className='custom-scrollbar flex gap-5 overflow-x-auto pb-1'>
          {/* Mapeando o JSON de notícias */}
          {artigos
            .slice(21, 31)
            .reverse()
            .map((noticia) => (
              <div key={noticia.id} className='w-3/12 flex-shrink-0 rounded-lg bg-DF p-3 dark:bg-18'>
                <Link to={`noticias/${noticia.id}`} className='flex flex-col'>
                  <img className='rounded' src={noticia.image} />
                  <h1 className='my-2 line-clamp-1 text-lg font-bold text-26 dark:text-FF'>{noticia.title}</h1>
                  <p className='line-clamp-3 text-26 text-opacity-90 dark:text-FF dark:text-opacity-90'>{noticia.text}</p>
                  <div className='flex-grow'></div>
                  <div className='mt-5 flex flex-row justify-between text-sm text-26 text-opacity-70 dark:text-FF dark:text-opacity-70'>
                    <p>{noticia.data}</p>
                    <p>{noticia.autor}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
      {/* ---------------------------------------------------------------------------------- */}
    </>
  );
}
