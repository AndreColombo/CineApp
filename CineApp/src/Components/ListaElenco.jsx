import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const defaultImage = import.meta.env.VITE_DEFAULTIMGP;
const imagesURL = import.meta.env.VITE_IMG;
const moviesURL = import.meta.env.VITE_APIM;
const apiKey = import.meta.env.VITE_API_KEY;

export default function ListaElenco() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);
  const [credits, setCredits] = useState({
    cast: [],
    crew: [],
  });

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieUrl = `${moviesURL}${id}?${apiKey}`;
        const creditsUrl = `${moviesURL}${id}/credits?${apiKey}`;

        const [movieResponse, creditsResponse] = await Promise.all([
          fetch(movieUrl),
          fetch(creditsUrl),
        ]);

        if (!movieResponse.ok || !creditsResponse.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const [movieData, creditsData] = await Promise.all([
          movieResponse.json(),
          creditsResponse.json(),
        ]);

        setFilme(movieData);
        setCredits(creditsData);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!filme) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex gap-5 text-white bg-B0 px-20 py-4 my-3">
        <img
          className="rounded h-24"
          src={`${imagesURL}${filme.poster_path}`}
          alt={filme.title}
        />
        <div className="flex flex-col justify-center">
          <div className="flex gap-2 items-center">
            <h1 className="font-bold text-3xl">{filme.title}</h1>
            <h1 className="text-white text-opacity-75 font-medium text-3xl">
              {" "}
              (
              {filme.release_date
                ? new Date(filme.release_date).getFullYear()
                : "-"}
              )
            </h1>
          </div>
          <Link to={`/filmes/${filme.id}`} key={filme.id}>
            <p className="text-white text-opacity-75 text-lg">
              ← Voltar ao filme
            </p>
          </Link>
        </div>
      </div>

      <div className="flex px-20 gap-60">
        <div>
          <div className="flex flex-row gap-2 items-center">
            <h1 className="text-white font-bold text-2xl">Elenco</h1>
            <h1 className="text-white text-opacity-75 text-xl">
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
                        : defaultImage
                    }
                    alt={ator.name}
                    className="rounded-lg w-20 h-20 object-cover mb-2 bg-18"
                  />
                  <div className="pl-5">
                    <h1 className="text-white font-semibold">{ator.name}</h1>
                    <p className="text-white font-light text-opacity-75">
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
            <h1 className="text-white font-bold text-2xl">Equipe técnica</h1>
            <h1 className="text-white text-opacity-75 text-xl">
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
                        : defaultImage
                    }
                    alt={equipe.name}
                    className="rounded-lg w-20 h-20 object-cover mb-2 bg-18"
                  />
                  <div className="pl-5">
                    <h1 className="text-white font-semibold">{equipe.name}</h1>
                    <p className="text-white font-light text-opacity-75">
                      {equipe.job}
                    </p>
                  </div>
                </li>
              </Link>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
