import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import CardNoticia from "../Components/CardNoticia";
import artigos from "../../artigos.json";

const imagesURL = import.meta.env.VITE_IMG;
const searchURLM = import.meta.env.VITE_SEARCHM;
const searchURLS = import.meta.env.VITE_SEARCHS;
const apiKey = import.meta.env.VITE_API_KEY;

// Função para determinar o link de destino
const getLinkTo = (producao) => {
  return producao.title
    ? `/filmes/${producao.id}`
    : producao.name
    ? `/series/${producao.id}`
    : `/artigo/${producao.id}`;
};

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

    // Função para filtrar artigos localmente com base na query
    const getFilteredArticles = (query) => {
      return artigos.filter((artigo) =>
        artigo.title.toLowerCase().includes(query.toLowerCase())
      );
    };

    Promise.all([
      getSearchedContent(searchWithQueryURLM),
      getSearchedContent(searchWithQueryURLS),
    ])
      .then(([filmes, series]) => {
        const filteredArtigos = getFilteredArticles(query);
        const resultadosConcatenados = [
          ...filmes.map((filme) => ({ ...filme, type: "movie" })),
          ...series.map((serie) => ({ ...serie, type: "tv" })),
          ...filteredArtigos.map((artigo) => ({ ...artigo, type: "article" })),
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
      <h1 className="text-26 dark:text-FF  pl-14 font-bold text-xl m-5">
        Resultados para: <span className="text-[#FF5733]">{query}</span>
      </h1>
      <div className="flex gap-7 flex-wrap justify-center">
        {resultados.length > 0 ? (
          resultados.map((resultado) => (
            <Link
              key={resultado.id}
              to={getLinkTo(resultado)}
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
                  {resultado.overview || resultado.description}
                </p>
                <div className="infos flex justify-between p-3">
                  <div className="linguas flex items-center space-x-2">
                    <span className="bg-18 text-FF text-opacity-75 font-medium p-1 rounded uppercase text-sm flex-shrink-0">
                      dub
                    </span>
                    <span className="bg-18 text-FF text-opacity-75 font-medium p-1 rounded uppercase text-sm flex-shrink-0">
                      {resultado.original_language || "PT"}
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
          <div className="flex flex-col items-center text-26 dark:text-FF py-36">
            <p className="text-2xl font-medium">Nenhum resultado encontrado.</p>
            <p className="text-lg">😞💔</p>
          </div>
        )}
      </div>
    </>
  );
}
