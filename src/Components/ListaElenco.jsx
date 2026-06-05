import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const defaultImageF = import.meta.env.VITE_DEFAULTIMGF;
const defaultImageH = import.meta.env.VITE_DEFAULTIMGH;
const defaultImageM = import.meta.env.VITE_DEFAULTIMGM;
const imagesURL = import.meta.env.VITE_IMG;
const moviesURL = import.meta.env.VITE_APIM;
const seriesURL = import.meta.env.VITE_APIS;
const apiKey = import.meta.env.VITE_API_KEY;

export default function ListaElenco() {
  const { id } = useParams();
  const location = useLocation();
  const [item, setItem] = useState(null);
  const [credits, setCredits] = useState({
    cast: [],
    crew: [],
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Verifica se a URL contém "filmes" ou "series"
        const isMovie = location.pathname.includes("filmes");
        const itemUrl = isMovie ? `${moviesURL}${id}?${apiKey}` : `${seriesURL}${id}?${apiKey}`;
        const creditsUrl = isMovie ? `${moviesURL}${id}/credits?${apiKey}` : `${seriesURL}${id}/credits?${apiKey}`;

        const [itemResponse, creditsResponse] = await Promise.all([fetch(itemUrl), fetch(creditsUrl)]);

        const [itemData, creditsData] = await Promise.all([itemResponse.ok ? itemResponse.json() : null, creditsResponse.ok ? creditsResponse.json() : null]);

        setItem(itemData);
        setCredits(creditsData);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      }
    };

    fetchDetails();
  }, [id, location.pathname]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='px-14'>
        <div className='my-3 flex items-center gap-5 rounded-lg bg-B0 px-20 py-4 text-FF'>
          <img className='h-24 rounded' src={item.poster_path ? `${imagesURL}${item.poster_path}` : defaultImageF} alt={item.title || item.name} />
          <div className='flex flex-col justify-center'>
            <div className='flex items-center gap-2'>
              <h1 className='text-3xl font-bold'>{item.title || item.name}</h1>
              <h1 className='text-3xl font-medium text-FF text-opacity-75'>({item.release_date ? new Date(item.release_date).getFullYear() : "-"})</h1>
            </div>
            <Link to={`/${location.pathname.includes("filmes") ? "filmes" : "series"}/${item.id}`} key={item.id}>
              <p className='text-lg text-FF text-opacity-75'>← Voltar {location.pathname.includes("filmes") ? "ao filme" : "à série"}</p>
            </Link>
          </div>
        </div>

        <div className='flex gap-60 px-20'>
          <div>
            <div className='flex flex-row items-center gap-2'>
              <h1 className='text-2xl font-bold text-26 dark:text-FF'>Elenco</h1>
              <h1 className='text-xl text-26 text-opacity-75 dark:text-FF dark:text-opacity-75'>({credits.cast.length})</h1>
            </div>
            <ol className='p-5'>
              {credits.cast.map((ator, index) => (
                <Link to={`/pessoa/${ator.id}`} key={`cast-${index}`}>
                  <li className='flex items-center'>
                    <img
                      src={ator.profile_path ? `${imagesURL}${ator.profile_path}` : defaultImageH}
                      alt={ator.name}
                      className='mb-2 h-20 w-20 rounded-lg bg-18 object-cover text-26'
                    />
                    <div className='pl-5'>
                      <h1 className='font-semibold text-26 dark:text-FF'>{ator.name}</h1>
                      <p className='font-light text-26 text-opacity-75 dark:text-FF dark:text-opacity-75'>{ator.character}</p>
                    </div>
                  </li>
                </Link>
              ))}
            </ol>
          </div>

          <div>
            <div className='flex flex-row items-center gap-2'>
              <h1 className='text-2xl font-bold text-26 dark:text-FF'>Equipe técnica</h1>
              <h1 className='text-xl text-26 text-opacity-75 dark:text-FF dark:text-opacity-75'>({credits.crew.length})</h1>
            </div>
            <ol className='p-5'>
              {credits.crew.map((equipe, index) => (
                <Link to={`/pessoa/${equipe.id}`} key={`crew-${index}`}>
                  <li className='flex items-center'>
                    <img
                      src={equipe.profile_path ? `${imagesURL}${equipe.profile_path}` : defaultImageH}
                      alt={equipe.name}
                      className='mb-2 h-20 w-20 rounded-lg bg-18 object-cover text-26'
                    />
                    <div className='pl-5'>
                      <h1 className='font-semibold text-26 dark:text-FF'>{equipe.name}</h1>
                      <p className='font-light text-26 text-opacity-75 dark:text-FF dark:text-opacity-75'>{equipe.job}</p>
                    </div>
                  </li>
                </Link>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
