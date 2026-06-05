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

// Função para determinar o link de destino
const getLinkTo = (producao) => {
  return producao.title ? `/filmes/${producao.id}` : `/series/${producao.id}`;
};

export default function ListaFilmes() {
  const { id } = useParams();
  const [pessoa, setPessoa] = useState(null);
  const [producoes, setProducoes] = useState([]);

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

    const fetchPessoaProducoes = async () => {
      try {
        const [filmesRes, seriesRes] = await Promise.all([fetch(`${pessoaURL}${id}/movie_credits?${apiKey}`), fetch(`${pessoaURL}${id}/tv_credits?${apiKey}`)]);

        const filmesData = await filmesRes.json();
        const seriesData = await seriesRes.json();

        const todasProducoes = [...filmesData.cast, ...seriesData.cast];
        const producoesOrdenadas = todasProducoes.sort((a, b) => b.popularity - a.popularity);

        setProducoes(producoesOrdenadas);
      } catch (error) {
        console.error("Erro ao buscar produções da pessoa:", error);
      }
    };

    fetchPessoaDetails();
    fetchPessoaProducoes();
  }, [id]);

  if (!pessoa) return <div>Carregando...</div>;

  return (
    <div className='px-14'>
      <div className='my-3 flex items-center gap-5 rounded-lg bg-B0 px-20 py-4 text-FF'>
        <img src={pessoa.profile_path ? `${imagesURL}${pessoa.profile_path}` : defaultImageH} alt={pessoa.name} className='h-24 rounded' />
        <div className='flex flex-col justify-center'>
          <h1 className='text-3xl font-bold'>{pessoa.name}</h1>
          <Link to={`/pessoa/${pessoa.id}`} key={pessoa.id}>
            <p className='text-lg text-FF text-opacity-75'>← Voltar ao ator</p>
          </Link>
        </div>
      </div>

      <div className='flex flex-col'>
        <div className='flex flex-col justify-evenly text-26 dark:text-FF'>
          <div className='flex justify-center'>
            <div className='grid grid-cols-8 gap-4'>
              {producoes.map((producao) => (
                <Link key={producao.id} to={getLinkTo(producao)}>
                  <div key={producao.id} className='flex w-36 flex-shrink-0 flex-col items-center rounded-lg text-26 dark:text-FF' style={{ height: "auto" }}>
                    <img
                      className='mb-1 w-36 rounded'
                      src={producao.poster_path ? `${imagesURL}${producao.poster_path}` : defaultImageF}
                      alt={producao.title || producao.name}
                    />
                    <h1 className='mb-1 text-center text-sm'>{producao.title || producao.name}</h1>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
