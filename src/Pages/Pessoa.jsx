import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const defaultImageF = import.meta.env.VITE_DEFAULTIMGF;
const defaultImageH = import.meta.env.VITE_DEFAULTIMGH;
const defaultImageM = import.meta.env.VITE_DEFAULTIMGM;
const imagesURL = import.meta.env.VITE_IMG;
const pessoaURL = import.meta.env.VITE_API_PERSON;
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

// Função para formatar o gênero de 1/2 para Feminino/Masculino
const mapGender = (gender) => {
  switch (gender) {
    case 1:
      return "Feminino";
    case 2:
      return "Masculino";
    default:
      return "Outro";
  }
};

export default function Pessoa() {
  const { id } = useParams();
  const [pessoa, setPessoa] = useState(null);
  const [filmes, setFilmes] = useState([]);
  const filmesLimitado = filmes.slice(0, 8);

  useEffect(() => {
    const fetchPessoaDetails = async () => {
      try {
        const res = await fetch(`${pessoaURL}${id}?${apiKey}`);
        const data = await res.json();
        setPessoa(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da pessoa:", error);
      }
    };

    const fetchPessoaFilmes = async () => {
      try {
        const res = await fetch(`${pessoaURL}${id}/movie_credits?${apiKey}`);
        const data = await res.json();
        const filmesOrdenados = data.cast.sort(
          (a, b) => b.popularity - a.popularity
        );

        setFilmes(filmesOrdenados);
      } catch (error) {
        console.error("Erro ao buscar filmes da pessoa:", error);
      }
    };

    fetchPessoaDetails();
    fetchPessoaFilmes();
  }, [id]);

  if (!pessoa) return <div>Carregando...</div>;

  return (
    <div className="px-28 py-10 flex gap-5">
      <div className="text-26 dark:text-FF bg-D0 dark:bg-18 p-1 rounded-xl flex flex-col justify-center">
        <img
          src={
            pessoa.profile_path
              ? `${imagesURL}${pessoa.profile_path}`
              : defaultImageH
          }
          alt={pessoa.name}
          className="rounded-lg mb-5"
          style={{ height: "28rem" }}
        />
        <h1 className="font-semibold text-xl mb-2">Informações pessoais</h1>
        <div className="mb-4 ml-1">
          <h1 className="font-medium">Conhecido(a) por</h1>
          <p>{pessoa.known_for_department}</p>
        </div>
        <div className="mb-4 ml-1">
          <h1 className="font-medium">Gênero</h1>
          <p>{mapGender(pessoa.gender)}</p>
        </div>
        <div className="mb-4 ml-1">
          <h1 className="font-medium">Nascimento</h1>
          <p>{formatarData(pessoa.birthday)}</p>
        </div>
        <div className="mb-4 ml-1">
          <h1 className="font-medium">Local de nascimento (em inglês)</h1>
          <p>{pessoa.place_of_birth}</p>
        </div>
      </div>

      <div className="flex flex-col w-3/4">
        <div className="text-26 dark:text-FF flex flex-col justify-evenly">
          <h1 className="font-bold text-3xl mb-5">{pessoa.name}</h1>
          <div className="mb-5">
            <p className="font-medium text-lg mb-1">Biografia</p>
            <p className="font-light">{pessoa.biography}</p>
          </div>
          <div className="flex flex-col">
            <h1 className="font-medium text-lg mb-1">Conhecido(a) por</h1>
            <div className="overflow-x-auto custom-scrollbar pb-1">
              <div className="flex gap-1">
                {filmesLimitado.map((filme) => (
                  <Link key={filme.id} to={`/filmes/${filme.id}`}>
                    <div
                      key={filme.id}
                      className="text-26 dark:text-FF rounded-lg flex flex-col items-center w-36 flex-shrink-0"
                      style={{ height: "auto" }}
                    >
                      <img
                        src={`${imagesURL}${filme.poster_path}`}
                        alt={filme.title}
                        className="rounded w-32 mb-3"
                      />
                      <h1 className="text-center text-sm">{filme.title}</h1>
                    </div>
                  </Link>
                ))}
                <div>
                  <Link
                    to={`filmes`}
                    className="p-2 flex rounded-lg items-center justify-center h-48 w-32 mb-3"
                  >
                    <span className="flex justify-center font-bold text-lg w-32">
                      Ver Outros
                    </span>
                  </Link>
                  <h1 className="text-center text-sm w-32">
                    Veja mais filmes de {pessoa.name}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
