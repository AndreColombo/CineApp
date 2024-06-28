import { Link } from "react-router-dom";
import data from "../../artigos.json";

export default function Noticias() {
  return (
    <>
      <div className="text-white">
        <h1 className="pl-14 font-bold text-xl mt-5">Notícias Recentes</h1>

        <div className="grid grid-cols-4 p-5">
          {data.map((noticia) => (
            <div
              key={noticia.id}
              className="flex flex-col w-80 rounded m-5 p-3 bg-18 flex-grow"
            >
              <Link to={`${noticia.id}`} className="flex flex-col h-full">
                <img className="rounded w-80" src={noticia.image} />
                <h1 className="font-bold text-lg line-clamp-2 my-2">
                  {noticia.title}
                </h1>
                <p className="line-clamp-3 text-white text-opacity-80">
                  {noticia.text}
                </p>
                <div className="flex-grow"></div>
                <div className="flex flex-row justify-between text-white text-opacity-75 text-sm mt-5">
                  <p>{noticia.data}</p>
                  <p>{noticia.autor}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
