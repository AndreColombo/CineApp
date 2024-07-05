import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const imagesURL = import.meta.env.VITE_IMG;
const moviesURL = import.meta.env.VITE_APIM;
const apiKey = import.meta.env.VITE_API_KEY;

export default function CardFilme() {
  const [topFilmes, setTopFilmes] = useState([]);

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setTopFilmes(data.results);
  };

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;

    getTopRatedMovies(topRatedUrl);
  }, []);

  return (
    <>
      <h1 className="text-26 dark:text-FF pl-14 font-bold text-xl m-4">
        Mais Bem Avaliados
      </h1>
      <div className="flex gap-7 flex-wrap justify-center">
        {topFilmes.map((filme) => (
          <Link
            key={filme.id}
            to={`${filme.id}`}
            className="relative text-FF p-2 w-64 h-96 flex flex-col justify-end bg-cover bg-center rounded-lg"
            style={{
              backgroundImage: `url(${imagesURL}${filme.poster_path})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none rounded-lg"></div>
            <div className="relative z-10 w-full">
              <h1 className="font-bold pl-3 mb-2">{filme.title}</h1>
              <p className="text-FF text-sm text-opacity-75 line-clamp-2 pl-3 pr-3">
                {filme.overview}
              </p>
              <div className="infos flex justify-between p-3">
                <div className="linguas flex items-center space-x-2">
                  <span className="bg-18 text-FF text-opacity-75 font-medium p-1 rounded uppercase text-sm flex-shrink-0">
                    dub
                  </span>
                  <span className="bg-18 text-FF text-opacity-75 font-medium p-1 rounded uppercase text-sm flex-shrink-0">
                    {filme.original_language}
                  </span>
                </div>
                <span className="bg-18 text-FF text-opacity-75 font-medium p-1 rounded text-sm flex-shrink-0">
                  00+
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
