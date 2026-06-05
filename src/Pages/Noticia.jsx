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
      <div className='flex flex-col items-center p-40 text-FF'>
        <h1 className='flex items-center justify-center text-4xl font-bold'>Notícia não encontrada</h1>
        <p className='flex items-center justify-center pt-5'>Parece que o link que você acessou não existe. Volte para a página anterior e tente novamente.</p>
      </div>
    );
  }

  const textoParagrafos = typeof noticia.noticia === "string" ? noticia.noticia.split("\n\n") : [];

  return (
    <div>
      <div className='flex p-5'>
        {/* ------------------------------ Propagandas ------------------------------ */}
        <div className='m-3 flex w-3/12 flex-col rounded bg-DF p-5 dark:bg-18'>
          {propagandas.map((propaganda) => (
            <div key={propaganda.id} className='m-4 mx-1 flex flex-col rounded'>
              <Link to={`${propaganda.link}`}>
                <img className='w-full rounded' src={propaganda.img} />
              </Link>
            </div>
          ))}
        </div>

        {/* ------------------------------ Notícia Principal ------------------------------ */}
        <div className='m-3 flex w-7/12 flex-col rounded-lg bg-DF p-5 dark:bg-18'>
          <h1 className='mb-2 line-clamp-2 text-xl font-bold text-26 dark:text-FF'>{noticia.title}</h1>
          <p className='font-medium text-26 text-opacity-75 dark:text-FF dark:text-opacity-75'>{noticia.text}</p>
          <img className='my-5 w-full rounded-lg' src={noticia.image} />
          {textoParagrafos.map((paragraph, index) => (
            <p key={index} className='mb-3 text-26 dark:text-FF'>
              {paragraph}
            </p>
          ))}
          <div className='mt-3 flex flex-row justify-between text-26 text-opacity-75 dark:text-FF dark:text-opacity-75'>
            <p>
              {noticia.data} {noticia.hora}
            </p>
            <p>{noticia.autor}</p>
          </div>
          <div className='flex-grow'></div>
          <div className='flex flex-row gap-1 text-26 text-opacity-75 dark:text-FF dark:text-opacity-75'>
            <p>Veja completo em:</p>
            <a className='text-blue-800 dark:text-blue-400' href={`${noticia.link}`} target='_blank' rel='noopener noreferrer'>
              {noticia.link}
            </a>
          </div>
        </div>

        {/* ------------------------------ Outras Notícias ------------------------------ */}
        <div className='m-3 flex w-3/12 flex-col rounded bg-DF p-5 dark:bg-18'>
          <h1 className='text-lg font-bold text-26 dark:text-FF'>Leia Também:</h1>
          {noticiasLimitadas.map((noticia) => (
            <div key={noticia.id} className='m-4 mx-3 flex flex-col rounded bg-FF p-3 dark:bg-26'>
              <Link to={`/noticias/${noticia.id}`}>
                <img className='w-full rounded' src={noticia.image} />
                <p className='my-2 line-clamp-3 text-26 dark:text-FF'>{noticia.text}</p>
                <p className='mt-4 flex justify-end text-26 text-opacity-75 dark:text-FF dark:text-opacity-75'>{noticia.data}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
