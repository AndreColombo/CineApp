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
  return producao.title ? `/filmes/${producao.id}` : producao.name ? `/series/${producao.id}` : `/noticias/${producao.id}`;
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
    const getArtigosFiltrados = (query) => {
      return artigos.filter((artigo) => artigo.title.toLowerCase().includes(query.toLowerCase()));
    };

    Promise.all([getSearchedContent(searchWithQueryURLM), getSearchedContent(searchWithQueryURLS)])
      .then(([filmes, series]) => {
        const artigosFiltrados = getArtigosFiltrados(query);
        const resultadosConcatenados = [
          ...filmes.map((filme) => ({ ...filme, type: "movie" })),
          ...series.map((serie) => ({ ...serie, type: "tv" })),
          ...artigosFiltrados.map((artigo) => ({ ...artigo, type: "article" })),
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
      <h1 className='m-5 pl-14 text-xl font-bold text-26 dark:text-FF'>
        Resultados para: <span className='text-[#FF5733]'>{query}</span>
      </h1>
      <div className='flex flex-wrap justify-center gap-7'>
        {resultados.length > 0 ? (
          resultados.map((resultado) =>
            resultado.type === "article" ? (
              // Renderiza o estilo de notícia
              <div key={resultado.id} className='flex w-96 rounded-lg bg-DF p-3 dark:bg-18'>
                <Link to={`/noticias/${resultado.id}`} className='flex flex-col'>
                  <img className='rounded' src={resultado.image} alt={resultado.title} />
                  <h1 className='my-2 line-clamp-1 text-lg font-bold text-26 dark:text-FF'>{resultado.title}</h1>
                  <p className='line-clamp-3 text-26 text-opacity-90 dark:text-FF dark:text-opacity-90'>{resultado.text}</p>
                  <div className='flex-grow'></div>
                  <div className='mt-5 flex flex-row justify-between text-sm text-26 text-opacity-70 dark:text-FF dark:text-opacity-70'>
                    <p>{resultado.data}</p>
                    <p>{resultado.autor}</p>
                  </div>
                </Link>
              </div>
            ) : (
              // Renderiza o estilo de filme/série
              <Link
                key={resultado.id}
                to={getLinkTo(resultado)}
                className='relative flex h-96 w-64 flex-col justify-end rounded-lg bg-cover bg-center p-2 text-FF'
                style={{
                  backgroundImage: `url(${imagesURL}${resultado.poster_path})`,
                }}>
                <div className='pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-t from-[#000000] to-transparent'></div>
                <div className='relative z-10 w-full'>
                  <h1 className='mb-2 pl-3 font-bold text-FF'>{resultado.title || resultado.name}</h1>
                  <p className='line-clamp-2 pl-3 pr-3 text-sm text-opacity-75'>{resultado.overview || resultado.description}</p>
                  <div className='flex justify-between p-3'>
                    <div className='flex items-center space-x-2'>
                      <span className='flex-shrink-0 rounded bg-18 p-1 text-sm font-medium uppercase text-FF text-opacity-75'>dub</span>
                      <span className='flex-shrink-0 rounded bg-18 p-1 text-sm font-medium uppercase text-FF text-opacity-75'>{resultado.original_language || "PT"}</span>
                    </div>
                    <span className='flex-shrink-0 rounded bg-18 p-1 text-sm font-medium text-FF text-opacity-75'>00+</span>
                  </div>
                </div>
              </Link>
            ),
          )
        ) : (
          <div className='flex flex-col items-center py-36 text-26 dark:text-FF'>
            <p className='text-2xl font-medium'>Nenhum resultado encontrado.</p>
            <p className='text-lg'>😞💔</p>
          </div>
        )}
      </div>
    </>
  );
}
