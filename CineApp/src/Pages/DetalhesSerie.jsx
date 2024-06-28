import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const imagesURL = import.meta.env.VITE_IMG;
const backdropURL = import.meta.env.VITE_BKD;
const seriesURL = import.meta.env.VITE_APIS;
const apiKey = import.meta.env.VITE_API_KEY;

// Função para formatar Data, mudando de yyyy-mm-dd para dd/mm/yyyy
const formatarData = (data) => {
  if (!data) return "N/A";

  const partes = data.split("-");
  if (partes.length !== 3) return "N/A";

  const dia = partes[2];
  const mes = partes[1];
  const ano = partes[0];

  return `${dia}/${mes}/${ano}`;
};

// Função para mudar a cor da avaliação de acordo com a %
const getBorderColor = (avaliacao) => {
  if (avaliacao === 0) {
    return "border-gray-500";
  } else if (avaliacao < 40) {
    return "border-red-500";
  } else if (avaliacao < 70) {
    return "border-yellow-500";
  } else {
    return "border-green-500";
  }
};

export default function DetalhesSerie() {
  const { id } = useParams();
  const [serie, setSerie] = useState({});
  const [credits, setCredits] = useState({ cast: [], crew: [] });

  useEffect(() => {
    const fetchSerie = async () => {
      try {
        const response = await fetch(`${seriesURL}${id}?${apiKey}`);
        const data = await response.json();
        setSerie(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da série:", error);
      }
    };

    const fetchCredits = async () => {
      try {
        const response = await fetch(`${seriesURL}${id}/credits?${apiKey}`);
        const data = await response.json();
        setCredits(data);
      } catch (error) {
        console.error("Erro ao buscar créditos da série:", error);
      }
    };

    fetchSerie();
    fetchCredits();
  }, [id]);

  const avaliacao = Math.round(serie.vote_average * 10);
  const borderColorClass = getBorderColor(avaliacao);

  const diretor = credits.crew?.find((member) => member.job === "Director");

  return (
    <div
      className="fundo"
      style={{
        position: "relative",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${backdropURL}${serie.backdrop_path})`,
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
          src={`${imagesURL}${serie.poster_path}`}
          alt={serie.name}
        />
        <div className="flex flex-col justify-evenly pl-5">
          <div>
            <div className="flex gap-2">
              <h1 className="font-bold text-3xl">{serie.name}</h1>
              <h1 className="text-3xl">
                {" "}
                (
                {serie.first_air_date
                  ? new Date(serie.first_air_date).getFullYear()
                  : "-"}
                )
              </h1>
            </div>

            <div className="flex gap-3">
              <p>{formatarData(serie.first_air_date)} (BR)</p>
              <p>-</p>
              <p className="text-white">
                {serie.genres?.map((genre) => genre.name).join(", ") || "N/A"}
              </p>
              <p>-</p>
              <p>({serie.number_of_seasons} Temp.)</p>
            </div>
            <div
              className={`h-14 w-14 mt-2 rounded-full flex justify-center items-center bg-18 border-2 ${borderColorClass}`}
            >
              <p className="font-semibold">{avaliacao}</p>
              <p className="font-light">%</p>
            </div>
          </div>

          <div>
            <p className="text-white text-opacity-75 my-2">{serie.tagline}</p>

            <div className="flex gap-1 flex-col">
              <h1 className="font-medium text-lg">Sinopse:</h1>
              <p className="">{serie.overview}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col backdrop-blur-md p-5 justify-evenly">
          <div className="pb-3">
            <h1 className="font-semibold">Título original</h1>
            <p className="pl-1">{serie.original_name || "N/A"}</p>
          </div>
          <div className="pb-3">
            <h1 className="font-semibold">Situação</h1>
            <p className="pl-1">{serie.status || "N/A"}</p>
          </div>
          <div className="pb-3">
            <h1 className="font-semibold w-28">Idioma original</h1>
            <p className="pl-1">{serie.original_language || "N/A"}</p>
          </div>
          <div className="pb-3">
            <h1 className="font-semibold">Orçamento</h1>
            <p className="pl-1">
              {serie.budget !== undefined && serie.budget !== null
                ? serie.budget.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "N/A"}
            </p>
          </div>
          <div className="pb-3">
            <h1 className="font-semibold">Receita</h1>
            <p className="pl-1">
              {serie.revenue !== undefined && serie.revenue !== null
                ? serie.revenue.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-row backdrop-blur-xl p-5 justify-evenly">
        <div className="pb-3 flex flex-col w-64">
          <h1 className="font-semibold">Produtora</h1>
          <p className="pl-1">
            {serie.production_companies?.length
              ? serie.production_companies
                  .map((company) => company.name)
                  .join(", ")
              : "N/A"}
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
    </div>
  );
}
