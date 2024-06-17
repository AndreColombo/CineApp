import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Filmes() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e"
    )
      .then((response) => response.json())
      .then((response) => setFilmes(response.results))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>Filmes</h1>
      <div className="listaFilmes flex flex-row gap-3 flex-wrap">
        {filmes.map((filme) => (
          <div className="card-filme" key={filme.id}>
            {/* <img
              src={`https://image.tmdb.org/t/p/w342/${filme.backdrop_path}`}
            /> */}
            <img src={`https://image.tmdb.org/t/p/w92/${filme.poster_path}`} />
            <h1>{filme.title}</h1>
            <Link to={`${filme.id}`} className="bg-purple-800">
              Saiba Mais
            </Link>
            {/* <p>{filme.overview}</p> */}
          </div>
        ))}
      </div>
    </>
  );
}
