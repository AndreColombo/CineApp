import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const imagesURL = import.meta.env.VITE_IMG;
const backdropURL = import.meta.env.VITE_BKD;
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const formatarData = (data) => {
  if (!data) return "";

  const partes = data.split("-");
  if (partes.length !== 3) return "";

  const dia = partes[2];
  const mes = partes[1];
  const ano = partes[0];

  return `${dia}/${mes}/${ano}`;
};

const formatarRuntime = (runtime) => {
  const horas = Math.floor(runtime / 60);
  const minutos = runtime % 60;
  return `${horas}h ${minutos}m`;
};

export default function DetalhesFilme() {
  console.log(useParams());
  const { id } = useParams();
  const [filme, setFilme] = useState({
    budget: 0,
    revenue: 0,
    genres: [],
  });

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setFilme(data);
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?${apiKey}`;
    getMovie(movieUrl);
  }, []);

  return (
    <>
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
        <div className="flex flex-row p-10 pt-4">
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
              <div className="bg-18 border-2 border-green-500 h-14 w-14 rounded-full flex justify-center items-center mt-2">
                <p className="font-semibold">
                  {Math.round(filme.vote_average * 10)}
                </p>
                <p className="font-light">%</p>
              </div>
            </div>

            <div>
              <p className="text-white text-opacity-75 my-2">{filme.tagline}</p>

              <div className="flex gap-1 flex-col">
                <h1 className="font-medium text-lg">Sinopse:</h1>
                <p className="">{filme.overview}</p>
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

        <div className="flex flex-row backdrop-blur-xl p-5 justify-evenly">
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
    </>
  );
}
