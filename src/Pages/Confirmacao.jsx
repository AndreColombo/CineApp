import React, { useState, useEffect } from "react";

const imagesURL = import.meta.env.VITE_IMG;
const backdropURL = import.meta.env.VITE_BKD;
const moviesURL = import.meta.env.VITE_APIM;
const apiKey = import.meta.env.VITE_API_KEY;

export default function Confirmacao() {
  const [filme, setFilme] = useState({});
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const tipoIngresso = localStorage.getItem("tipoIngresso");
  const quantidade = localStorage.getItem("quantidade");
  const preco = localStorage.getItem("preco");
  const id = localStorage.getItem("movieId");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieUrl = `${moviesURL}${id}?api_key=${apiKey}`;

        const response = await fetch(movieUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const movieData = await response.json();
        setFilme(movieData);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      }
    };

    fetchMovieDetails();
  }, [id, moviesURL, apiKey]); // Adicionando dependências no useEffect

  return (
    <div className="text-26 dark:text-FF p-20 py-20">
      <h1 className="font-bold text-2xl my-5">Confirmação da Compra</h1>
      <p className="text-lg mb-2">Obrigado pela sua compra, {name}!</p>
      <hr className="border-[#FF5733]" />
      <p className="text-lg my-1">Detalhes da compra:</p>
      <ul>
        <li>
          {" "}
          <em>Tipo de ingresso: </em>
          {tipoIngresso}
        </li>
        <li>
          <em>Quantidade: </em>
          {quantidade}
        </li>
        <li>
          <em>E-mail: </em>
          {email}
        </li>
        <li className="mt-1">Preço Total: R${preco}</li>
      </ul>
      {filme && filme.backdrop_path && (
        <img src={`${backdropURL}${filme.backdrop_path}`} alt={filme.title} />
      )}
    </div>
  );
}
