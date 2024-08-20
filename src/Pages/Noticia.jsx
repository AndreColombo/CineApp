import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import noticias from "../../artigos.json";
import propagandas from "../../propagandas.json";

export default function Noticia() {
  const { id } = useParams();
  const noticia = noticias.find((noticia) => noticia.id === id);
  const propaganda = propagandas.find((propaganda) => propaganda.id === id);
  const noticiasLimitadas = noticias.slice(27).reverse();

  if (!noticia) {
    return (
      <div className="text-FF p-40 flex flex-col items-center">
        <h1 className="font-bold text-4xl flex justify-center items-center">
          Notícia não encontrada
        </h1>
        <p className="flex justify-center items-center pt-5">
          Parece que o link que você acessou não existe. Volte para a página
          anterior e tente novamente.
        </p>
      </div>
    );
  }

  const textoParagrafos =
    typeof noticia.noticia === "string" ? noticia.noticia.split("\n\n") : [];

  return (
    <div className="">
      <div className="flex p-5">
        {/* ------------------------------ Propagandas ------------------------------ */}
        <div className="flex flex-col rounded m-3 p-5 bg-DF dark:bg-18 w-3/12">
          {propagandas.map((propaganda) => (
            <div key={propaganda.id} className="flex flex-col rounded mx-1 m-4">
              <Link to={`${propaganda.link}`}>
                <img className="rounded w-full" src={propaganda.img} />
              </Link>
            </div>
          ))}
        </div>

        {/* ------------------------------ Notícia Principal ------------------------------ */}
        <div className="flex flex-col rounded-lg m-3 p-5 bg-DF dark:bg-18 w-7/12">
          <h1 className="text-26 dark:text-FF font-bold text-xl line-clamp-2 mb-2">
            {noticia.title}
          </h1>
          <p className="text-26 text-opacity-75 dark:text-FF dark:text-opacity-75 font-medium">
            {noticia.text}
          </p>
          <img className="rounded-lg w-full my-5" src={noticia.image} />
          {textoParagrafos.map((paragraph, index) => (
            <p key={index} className="mb-3 text-26 dark:text-FF">
              {paragraph}
            </p>
          ))}
          <div className="flex flex-row justify-between mt-3 text-26 text-opacity-75 dark:text-FF dark:text-opacity-75">
            <p>
              {noticia.data} {noticia.hora}
            </p>
            <p>{noticia.autor}</p>
          </div>
          <div className="flex-grow"></div>
          <div className="flex flex-row gap-1 text-26 text-opacity-75 dark:text-FF dark:text-opacity-75">
            <p>Veja completo em:</p>
            <a
              className="text-blue-800 dark:text-blue-400"
              href={`${noticia.link}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {noticia.link}
            </a>
          </div>
        </div>

        {/* ------------------------------ Outras Notícias ------------------------------ */}
        <div className="flex flex-col rounded m-3 p-5 bg-DF dark:bg-18 w-3/12">
          <h1 className="text-26 dark:text-FF font-bold text-lg">
            Leia Também:
          </h1>
          {noticiasLimitadas.map((noticia) => (
            <div
              key={noticia.id}
              className="flex flex-col rounded mx-3 m-4 p-3 bg-FF dark:bg-26"
            >
              <Link to={`/noticias/${noticia.id}`}>
                <img className="rounded w-full" src={noticia.image} />
                <p className="line-clamp-3 text-26 dark:text-FF my-2">
                  {noticia.text}
                </p>
                <p className="flex justify-end mt-4 text-26 text-opacity-75 dark:text-FF dark:text-opacity-75">
                  {noticia.data}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
