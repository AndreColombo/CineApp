import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
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

export default function ComprarIngresso() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tipoIngresso, setTipoIngresso] = useState("");
  const [idioma, setIdioma] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [numeroCartao, setNumeroCartao] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [preco, setPreco] = useState("");

  const calcularPreco = (tipoIngresso, quantidade) => {
    let precoUnitario = 0;
    if (tipoIngresso === "VIP") precoUnitario = 75;
    else if (tipoIngresso === "Comum") precoUnitario = 50;
    else if (tipoIngresso === "Meia") precoUnitario = 25;

    return precoUnitario * quantidade;
  };

  useEffect(() => {
    const precoCalculado = calcularPreco(tipoIngresso, quantidade);
    setPreco(precoCalculado);
  }, [tipoIngresso, quantidade]);

  function sendEmail(e) {
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      tipoIngresso === "" ||
      quantidade === "" ||
      numeroCartao === "" ||
      validade === "" ||
      cvv === ""
    ) {
      alert("Nem todos os campos foram preenchidos");
      return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("tipoIngresso", tipoIngresso);
    localStorage.setItem("quantidade", quantidade);
    localStorage.setItem("preco", preco);

    const templateParams = {
      from_name: name,
      email: email,
      ticket: tipoIngresso,
      qntd: quantidade,
      preco: preco,
    };

    emailjs
      .send(
        "service_hdmgwwi",
        "template_ao8zg9a",
        templateParams,
        "PmD3D2WM3cQCWNZNA"
      )
      .then(
        (response) => {
          console.log("EMAIL ENVIADO", response.status, response.text);
          setName("");
          setEmail("");
          setTipoIngresso("");
          setQuantidade("");
          setPreco("");
          navigate("/confirmacao");
        },
        (err) => {
          console.log("ERRO: ", err);
        }
      );
  }

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
              <p className="text-FF">
                {filme.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p>-</p>
              <p>{formatarRuntime(filme.runtime)}</p>
            </div>
            <div
              className={`h-14 w-14 mt-2 rounded-full flex justify-center items-center bg-18 border-2 ${borderColorClass}`}
            >
              <p className="font-semibold">{String(avaliacao)}</p>
              <p className="font-light">%</p>
            </div>
          </div>

          <div>
            <p className="text-FF text-opacity-75 my-2">{filme.tagline}</p>

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
          <h1 className="font-semibold">Produtora(s)</h1>
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
          <h1 className="font-semibold">Roteirista(s)</h1>
          <p className="pl-1">
            {credits.crew
              ?.filter((member) => member.job === "Screenplay")
              .map((screenplay) => screenplay.name)
              .join(", ") || "N/A"}
          </p>
        </div>
        <div className="pb-3 flex flex-col w-64">
          <h1 className="font-semibold">Escritor</h1>
          <p className="pl-1">
            {credits.crew
              ?.filter((member) => member.job === "Writer")
              .map((writer) => writer.name)
              .join(", ") || "N/A"}
          </p>
        </div>
      </div>
      {credits.cast.length > 0 && <CardElenco elenco={credits.cast} />}

      <div className="flex flex-col pl-14 m-5">
        <h1 className="font-bold text-xl my-5">Comprar Ingressos</h1>
        <form onSubmit={sendEmail} className="flex flex-row justify-between">
          <div className="flex flex-col items-end">
            <div className="mb-2">
              <label>
                Nome:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="ml-2 rounded p-1 bg-FF dark:bg-26 text-26 dark:text-FF border border-[#FF5733] w-52"
                  required
                />
              </label>
            </div>
            <div className="mb-2">
              <label>
                E-mail:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ml-2 rounded p-1 bg-FF dark:bg-26 text-26 dark:text-FF border border-[#FF5733] w-52"
                  placeholder="exemplo@gmail.com"
                  required
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="mb-2">
              <label>
                Tipo de ingresso:
                <select
                  value={tipoIngresso}
                  onChange={(e) => setTipoIngresso(e.target.value)}
                  className="ml-2 rounded p-1 bg-FF dark:bg-26 text-26 dark:text-FF border border-[#FF5733] w-52"
                >
                  <option value="">Selecione</option>
                  <option value="VIP">VIP - R$75,00</option>
                  <option value="Comum">Comum - R$50,00</option>
                  <option value="Meia">Meia-entrada - R$25,00</option>
                </select>
              </label>
            </div>
            <div className="mb-2">
              <label>
                Quantidade:
                <input
                  type="number"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                  className="ml-2 rounded p-1 bg-FF dark:bg-26 text-26 dark:text-FF border border-[#FF5733] w-52"
                  min="1"
                />
              </label>
            </div>
            <div>
              <label>
                Idioma:
                <select
                  value={idioma}
                  onChange={(e) => setIdioma(e.target.value)}
                  className="ml-2 rounded p-1 bg-FF dark:bg-26 text-26 dark:text-FF border border-[#FF5733] w-52"
                >
                  <option value="dub">Dublado</option>
                  <option value="leg">Legendado</option>
                </select>
              </label>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="mb-2">
              <label>
                Número do cartão:
                <input
                  type="text"
                  value={numeroCartao}
                  onChange={(e) => setNumeroCartao(e.target.value)}
                  className="ml-2 rounded p-1 bg-FF dark:bg-26 text-26 dark:text-FF border border-[#FF5733] w-52"
                  placeholder="xxxx xxxx xxxx xxxx"
                  required
                />
              </label>
            </div>
            <div className="mb-2">
              <label>
                Validade:
                <input
                  type="text"
                  value={validade}
                  onChange={(e) => setValidade(e.target.value)}
                  className="ml-2 rounded p-1 bg-FF dark:bg-26 text-26 dark:text-FF border border-[#FF5733] w-52"
                  placeholder="xx/xx"
                  required
                />
              </label>
            </div>
            <div className="mb-1">
              <label>
                CVV:
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="ml-2 rounded p-1 bg-FF dark:bg-26 text-26 dark:text-FF border border-[#FF5733] w-52"
                  placeholder="xxx"
                  required
                />
              </label>
            </div>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="bg-B0 text-FF font-medium h-10 p-1 rounded uppercase text-sm"
            >
              Confirmar Compra
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
