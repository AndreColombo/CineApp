import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

const imagesURL = import.meta.env.VITE_IMG;
const searchURLM = import.meta.env.VITE_SEARCHM;
const searchURLS = import.meta.env.VITE_SEARCHS;
const apiKey = import.meta.env.VITE_API_KEY;

export default function Pesquisa() {
  const [searchParams] = useSearchParams();
  const [resultados, setResultados] = useState([]);
  const query = searchParams.get("q");

  const getSearchedContent = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      return data.results || [];
    } catch (error) {
      console.error("Erro ao buscar conteúdo:", error);
      return [];
    }
  };

  useEffect(() => {
    const searchWithQueryURLM = `${searchURLM}?${apiKey}&query=${query}`;
    const searchWithQueryURLS = `${searchURLS}?${apiKey}&query=${query}`;

    Promise.all([
      getSearchedContent(searchWithQueryURLM),
      getSearchedContent(searchWithQueryURLS),
    ])
      .then(([filmes, series]) => {
        const resultadosConcatenados = [
          ...filmes.map((filme) => ({ ...filme, type: "movie" })),
          ...series.map((serie) => ({ ...serie, type: "tv" })),
        ];
        setResultados(resultadosConcatenados);
      })
      .catch((error) => {
        console.error("Erro ao buscar filmes e séries:", error);
        setResultados([]);
      });
  }, [query]);

  return (
    <>
      <h1 className="text-26 dark:text-FF  pl-14 font-bold text-xl m-4">
        Resultados para: <span className="text-[#FF5733]">{query}</span>
      </h1>
      <div className="flex gap-7 flex-wrap justify-center">
        {resultados.length > 0 ? (
          resultados.map((resultado) => (
            <Link
              key={resultado.id}
              to={`/${resultado.type === "tv" ? "series" : "filmes"}/${resultado.id}`}
              className="relative text-FF p-2 w-64 h-96 flex flex-col justify-end bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url(${imagesURL}${resultado.poster_path})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none"></div>
              <div className="relative z-10 w-full">
                <h1 className="text-FF font-bold pl-3 mb-2">
                  {resultado.title || resultado.name}
                </h1>
                <p className="text-sm text-opacity-75 line-clamp-2 pl-3 pr-3">
                  {resultado.overview}
                </p>
                <div className="infos flex justify-between p-3">
                  <div className="linguas flex items-center space-x-2">
                    <span className="bg-18 text-FF text-opacity-75 font-medium p-1 rounded uppercase text-sm flex-shrink-0">
                      dub
                    </span>
                    <span className="bg-18 text-FF text-opacity-75 font-medium p-1 rounded uppercase text-sm flex-shrink-0">
                      {resultado.original_language}
                    </span>
                  </div>
                  <span className="bg-18 text-FF text-opacity-75 font-medium p-1 rounded text-sm flex-shrink-0">
                    00+
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-FF">Nenhum resultado encontrado.</p>
        )}
      </div>
    </>
  );
}
