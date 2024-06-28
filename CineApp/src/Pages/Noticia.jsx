import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import data from "../../artigos.json";

export default function Noticia() {
  const { id } = useParams();
  const noticia = data.find((noticia) => noticia.id === id);

  if (!noticia) {
    return (
      <div className="text-white p-40 flex flex-col items-center">
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
    <div className="text-white">
      <div className="flex p-5">
        <div className="flex flex-col rounded-lg m-3 p-5 bg-18 w-7/12">
          <h1 className="font-bold text-xl line-clamp-2 mb-2">
            {noticia.title}
          </h1>
          <p className="text-white text-opacity-80 text-sm">{noticia.text}</p>
          <img className="rounded-lg w-full my-5" src={noticia.image} />
          {textoParagrafos.map((paragraph, index) => (
            <p key={index} className="mb-3">
              {paragraph}
            </p>
          ))}
          <div className="flex flex-row justify-between mt-3 text-white text-opacity-80">
            <p>{noticia.data}</p>
            <p>{noticia.autor}</p>
          </div>
        </div>
        <div className="flex flex-col rounded m-3 p-5 bg-18 w-3/12">
          <h1 className="font-bold text-lg">Leia Também:</h1>
          {data.map((noticia) => (
            <div
              key={noticia.id}
              className="flex flex-col rounded mx-3 m-4 p-3 bg-26"
            >
              <Link to={`/noticias/${noticia.id}`}>
                <img className="rounded w-full" src={noticia.image} />
                <h1 className="font-bold text-lg line-clamp-1 my-1">
                  {noticia.title}
                </h1>
                <p className="line-clamp-3 text-white text-opacity-80">
                  {noticia.text}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
