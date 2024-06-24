import { Link } from "react-router-dom";
import data from "../../artigos.json";

export default function Noticias() {
  return (
    <>
      <div className="text-white">
        <h1 className="text-white pl-14 font-bold text-xl mt-5">
          Notícias Recentes
        </h1>

        <div className="flex flex-wrap p-5 justify-center">
          {data.map((filme) => (
            <div className="flex flex-col w-96 rounded m-3 p-3 bg-18">
              <Link to={``}>
                <img className="rounded w-96 mb-2" src={filme.image} />
                <h1 className="font-bold text-lg line-clamp-2 mb-2">
                  {filme.title}
                </h1>
                <p className="line-clamp-3 text-opacity-75 mb-2">
                  {filme.text}
                </p>
                {/* <p>{filme.noticia}</p> */}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
