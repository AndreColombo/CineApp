import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardElenco from "../Components/CardElenco";

const imagesURL = import.meta.env.VITE_IMG;
const backdropURL = import.meta.env.VITE_BKD;
const moviesURL = import.meta.env.VITE_APIM;
const apiKey = import.meta.env.VITE_API_KEY;

// Função para formatar Data, mudando de yyyy-mm-dd para dd/mm/yyyy
const formatarData = (data) => {
  if (!data) return "";

  const partes = data.split("-");
  if (partes.length !== 3) return "";

  const dia = partes[2];
  const mes = partes[1];
  const ano = partes[0];

  return `${dia}/${mes}/${ano}`;
};

// Função para formatar tempo de filme, mudando de 000 para 0h00m
const formatarRuntime = (runtime) => {
  const horas = Math.floor(runtime / 60);
  const minutos = runtime % 60;
  return `${horas}h ${minutos}m`;
};

// Função para mudar a cor da avaliação de acordo com a %
const getBorderColor = (avaliacao) => {
  if (avaliacao === 0) {
    return "border-gray-500";
  } else if (avaliacao > 0 && avaliacao < 40) {
    return "border-red-500";
  } else if (avaliacao >= 40 && avaliacao < 70) {
    return "border-yellow-500";
  } else {
    return "border-green-500";
  }
};

export default function DetalhesFilme() {
  const { id } = useParams();
  const [filme, setFilme] = useState({
    budget: 0,
    revenue: 0,
    genres: [],
  });
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

  const avaliacao = Math.round(filme.vote_average * 10);
  const borderColorClass = getBorderColor(avaliacao);

  return (
    <div
      className="fundo"
      style={{
        position: "relative",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${backdropURL}${filme.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
      }}
    >
      <div className="flex flex-row p-10 pt-4 justify-between">
        <img
          className="rounded h-96"
          src={`${imagesURL}${filme.poster_path}`}
          alt={filme.title}
        />
        <div className="flex flex-col justify-evenly pl-5">
          <div>
            <div className="flex gap-2">
              <h1 className="font-bold text-3xl">{filme.title}</h1>
              <h1 className="text-3xl">
                {" "}
                (
                {filme.release_date
                  ? new Date(filme.release_date).getFullYear()
                  : "-"}
                )
              </h1>
            </div>

            <div className="flex gap-3">
              <p>{formatarData(filme.release_date)} (BR)</p>
              <p>-</p>
              <p className="text-white">
                {filme.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p>-</p>
              <p>{formatarRuntime(filme.runtime)}</p>
            </div>
            <div
              className={`h-14 w-14 mt-2 rounded-full flex justify-center items-center bg-18 border-2 ${borderColorClass}`}
            >
              <p className="font-semibold">{avaliacao}</p>
              <p className="font-light">%</p>
            </div>
          </div>

          <div>
            <p className="text-white text-opacity-75 my-2">{filme.tagline}</p>

            <div className="flex gap-1 flex-col">
              <h1 className="font-medium text-lg">Sinopse</h1>
              <p className="font-light">{filme.overview}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col backdrop-blur-md p-5 justify-evenly">
          <div className="pb-3">
            <h1 className="font-semibold">Título original</h1>
            <p className="pl-1">{filme.original_title}</p>
          </div>
          <div className="pb-3">
            <h1 className="font-semibold">Situação</h1>
            <p className="pl-1">{filme.status}</p>
          </div>
          <div className="pb-3">
            <h1 className="font-semibold w-28">Idioma original</h1>
            <p className="pl-1">{filme.original_language}</p>
          </div>
          <div className="pb-3">
            <h1 className="font-semibold">Orçamento</h1>
            <p className="pl-1">
              {filme.budget.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
          <div className="pb-3">
            <h1 className="font-semibold">Receita</h1>
            <p className="pl-1">
              {filme.revenue.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-row backdrop-blur-xl p-5 justify-evenly m-10 mt-0">
        <div className="pb-3 flex flex-col w-64">
          <h1 className="font-semibold">Produtora</h1>
          <p className="pl-1">
            {filme.production_companies
              ?.map((company) => company.name)
              .join(", ") || "N/A"}
          </p>
        </div>
        <div className="pb-3 flex flex-col w-64">
          <h1 className="font-semibold">Diretor</h1>
          <p className="pl-1">
            {credits.crew
              ?.filter((member) => member.job === "Director")
              .map((director) => director.name)
              .join(", ") || "N/A"}
          </p>
        </div>
        <div className="pb-3 flex flex-col w-64">
          <h1 className="font-semibold">Roteirista</h1>
          <p className="pl-1">
            {credits.crew
              ?.filter((member) => member.job === "Screenplay")
              .map((screenplay) => screenplay.name)
              .join(", ") || "N/A"}
          </p>
        </div>
        <div className="pb-3 flex flex-col w-64">
          <h1 className="font-semibold">Autor do Livro</h1>
          <p className="pl-1">
            {credits.crew
              ?.filter((member) => member.job === "Novel")
              .map((novel) => novel.name)
              .join(", ") || "N/A"}
          </p>
        </div>
      </div>
      {credits.cast.length > 0 && <CardElenco elenco={credits.cast} />}
    </div>
  );
}
