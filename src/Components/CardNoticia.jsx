import { Link } from "react-router-dom";
import artigos from "../../artigos.json";

export default function CardNoticia() {
  return (
    <>
      <div className="grid grid-cols-4 p-5">
        {artigos.map((noticia) => (
          <div
            key={noticia.id}
            className="flex flex-col w-80 rounded m-5 p-3 bg-DF dark:bg-18 flex-grow"
          >
            <Link to={`${noticia.id}`} className="flex flex-col h-full">
              <img className="rounded w-80" src={noticia.image} />
              <h1 className="text-26 dark:text-FF font-bold text-lg line-clamp-2 my-2">
                {noticia.title}
              </h1>
              <p className="line-clamp-3 text-26 text-opacity-90 dark:text-FF dark:text-opacity-90">
                {noticia.text}
              </p>
              <div className="flex-grow"></div>
              <div className="flex flex-row justify-between text-26 text-opacity-70 dark:text-FF dark:text-opacity-70 text-sm mt-5">
                <p>{noticia.data}</p>
                <p>{noticia.autor}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
