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
        const filmesOrdenados = data.cast.sort((a, b) => b.popularity - a.popularity);

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
    <div className='flex gap-5 px-28 py-10'>
      <div className='flex flex-col justify-center rounded-xl bg-DF p-1 text-26 dark:bg-18 dark:text-FF'>
        <img src={pessoa.profile_path ? `${imagesURL}${pessoa.profile_path}` : defaultImageH} alt={pessoa.name} className='mb-5 rounded-lg' style={{ height: "28rem" }} />
        <h1 className='mb-2 text-xl font-semibold'>Informações pessoais</h1>
        <div className='mb-4 ml-1'>
          <h1 className='font-medium'>Conhecido(a) por</h1>
          <p>{pessoa.known_for_department}</p>
        </div>
        <div className='mb-4 ml-1'>
          <h1 className='font-medium'>Gênero</h1>
          <p>{mapGender(pessoa.gender)}</p>
        </div>
        <div className='mb-4 ml-1'>
          <h1 className='font-medium'>Nascimento</h1>
          <p>{formatarData(pessoa.birthday)}</p>
        </div>
        <div className='mb-4 ml-1'>
          <h1 className='font-medium'>Local de nascimento (em inglês)</h1>
          <p>{pessoa.place_of_birth}</p>
        </div>
      </div>

      <div className='flex w-3/4 flex-col'>
        <div className='flex flex-col justify-evenly text-26 dark:text-FF'>
          <h1 className='mb-5 text-3xl font-bold'>{pessoa.name}</h1>
          <div className='mb-5'>
            <p className='mb-1 text-lg font-medium'>Biografia</p>
            <p className='font-light'>{pessoa.biography}</p>
          </div>
          <div className='flex flex-col'>
            <h1 className='mb-1 text-lg font-medium'>Conhecido(a) por</h1>
            <div className='custom-scrollbar overflow-x-auto pb-1'>
              <div className='flex gap-1'>
                {filmesLimitado.map((filme) => (
                  <Link key={filme.id} to={`/filmes/${filme.id}`}>
                    <div key={filme.id} className='flex w-36 flex-shrink-0 flex-col items-center rounded-lg text-26 dark:text-FF' style={{ height: "auto" }}>
                      <img src={`${imagesURL}${filme.poster_path}`} alt={filme.title} className='mb-3 w-32 rounded' />
                      <h1 className='text-center text-sm'>{filme.title}</h1>
                    </div>
                  </Link>
                ))}
                <div>
                  <Link to={`filmes`} className='mb-3 flex h-48 w-32 items-center justify-center rounded-lg p-2'>
                    <span className='flex w-32 justify-center text-lg font-bold'>Ver Outros</span>
                  </Link>
                  <h1 className='w-32 text-center text-sm'>Veja mais filmes de {pessoa.name}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
