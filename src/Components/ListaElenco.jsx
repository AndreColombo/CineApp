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
        const itemUrl = isMovie
          ? `${moviesURL}${id}?${apiKey}`
          : `${seriesURL}${id}?${apiKey}`;
        const creditsUrl = isMovie
          ? `${moviesURL}${id}/credits?${apiKey}`
          : `${seriesURL}${id}/credits?${apiKey}`;

        const [itemResponse, creditsResponse] = await Promise.all([
          fetch(itemUrl),
          fetch(creditsUrl),
        ]);

        const [itemData, creditsData] = await Promise.all([
          itemResponse.ok ? itemResponse.json() : null,
          creditsResponse.ok ? creditsResponse.json() : null,
        ]);

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
      <div className="px-14">
        <div className="flex text-FF bg-B0 rounded-lg gap-5 px-20 py-4 my-3 items-center">
          <img
            className="rounded h-24"
            src={
              item.poster_path
                ? `${imagesURL}${item.poster_path}`
                : defaultImageF
            }
            alt={item.title || item.name}
          />
          <div className="flex flex-col justify-center">
            <div className="flex gap-2 items-center">
              <h1 className="font-bold text-3xl">{item.title || item.name}</h1>
              <h1 className="text-FF text-opacity-75 font-medium text-3xl">
                (
                {item.release_date
                  ? new Date(item.release_date).getFullYear()
                  : "-"}
                )
              </h1>
            </div>
            <Link
              to={`/${
                location.pathname.includes("filmes") ? "filmes" : "series"
              }/${item.id}`}
              key={item.id}
            >
              <p className="text-FF text-opacity-75 text-lg">
                ← Voltar{" "}
                {location.pathname.includes("filmes") ? "ao filme" : "à série"}
              </p>
            </Link>
          </div>
        </div>

        <div className="flex px-20 gap-60">
          <div>
            <div className="flex flex-row gap-2 items-center">
              <h1 className="text-26 dark:text-FF font-bold text-2xl">
                Elenco
              </h1>
              <h1 className="text-26 text-opacity-75 dark:text-FF dark:text-opacity-75 text-xl">
                ({credits.cast.length})
              </h1>
            </div>
            <ol className="p-5">
              {credits.cast.map((ator, index) => (
                <Link to={`/pessoa/${ator.id}`} key={`cast-${index}`}>
                  <li className="flex items-center">
                    <img
                      src={
                        ator.profile_path
                          ? `${imagesURL}${ator.profile_path}`
                          : defaultImageH
                      }
                      alt={ator.name}
                      className="rounded-lg w-20 h-20 object-cover mb-2 bg-18"
                    />
                    <div className="pl-5">
                      <h1 className="text-26 dark:text-FF font-semibold">
                        {ator.name}
                      </h1>
                      <p className="text-26 text-opacity-75 dark:text-FF dark:text-opacity-75 font-light">
                        {ator.character}
                      </p>
                    </div>
                  </li>
                </Link>
              ))}
            </ol>
          </div>

          <div>
            <div className="flex flex-row gap-2 items-center">
              <h1 className="text-26 dark:text-FF font-bold text-2xl">
                Equipe técnica
              </h1>
              <h1 className="text-26 text-opacity-75 dark:text-FF dark:text-opacity-75 text-xl">
                ({credits.crew.length})
              </h1>
            </div>
            <ol className="p-5">
              {credits.crew.map((equipe, index) => (
                <Link to={`/pessoa/${equipe.id}`} key={`crew-${index}`}>
                  <li className="flex items-center">
                    <img
                      src={
                        equipe.profile_path
                          ? `${imagesURL}${equipe.profile_path}`
                          : defaultImageH
                      }
                      alt={equipe.name}
                      className="rounded-lg w-20 h-20 object-cover mb-2 bg-18"
                    />
                    <div className="pl-5">
                      <h1 className="text-26 dark:text-FF font-semibold">
                        {equipe.name}
                      </h1>
                      <p className="text-26 text-opacity-75 dark:text-FF dark:text-opacity-75 font-light">
                        {equipe.job}
                      </p>
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
