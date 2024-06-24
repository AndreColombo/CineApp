import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

const imagesURL = import.meta.env.VITE_IMG;
const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

export default function Pesquisa() {
  const [searchParams] = useSearchParams();

  const [filmes, setFilmes] = useState([]);
  const query = searchParams.get("q");

  const getSearchedMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setFilmes(data.results || []);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      setFilmes([]);
    }
  };

  useEffect(() => {
    if (query) {
      const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;
      getSearchedMovies(searchWithQueryURL);
    }
  }, [query]);

  return (
    <>
      <h1 className="text-white pl-14 font-bold text-xl m-4">
        Resultados para: <span className="text-[#FF5733]">{query}</span>
      </h1>
      <div className="flex gap-7 flex-wrap justify-center">
        {filmes.length > 0 ? (
          filmes.map((filme) => (
            <Link
              key={filme.id}
              to={`${filme.id}`}
              className="relative text-white p-2 w-64 h-96 flex flex-col justify-end bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url(${imagesURL}${filme.poster_path})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none"></div>
              <div className="relative z-10 w-full">
                <h1 className="text-white font-bold pl-3 mb-2">
                  {filme.title}
                </h1>
                <p className="text-sm text-opacity-75 line-clamp-2 pl-3 pr-3">
                  {filme.overview}
                </p>
                <div className="infos flex justify-between p-3">
                  <div className="linguas flex items-center space-x-2">
                    <span className="bg-18 text-white text-opacity-75 font-medium p-1 rounded uppercase text-sm flex-shrink-0">
                      dub
                    </span>
                    <span className="bg-18 text-white text-opacity-75 font-medium p-1 rounded uppercase text-sm flex-shrink-0">
                      {filme.original_language}
                    </span>
                  </div>
                  <span className="bg-18 text-white text-opacity-75 font-medium p-1 rounded text-sm flex-shrink-0">
                    00+
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-white">Nenhum resultado encontrado.</p>
        )}
      </div>
    </>
  );
}
