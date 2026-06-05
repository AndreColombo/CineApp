import { Link } from "react-router-dom";
import artigos from "../../artigos.json";

export default function CardNoticia() {
  return (
    <>
      <div className='grid grid-cols-4 p-5'>
        {artigos
          .slice()
          .reverse()
          .map((noticia) => (
            <div key={noticia.id} className='m-5 mt-2 flex w-80 flex-grow flex-col rounded-lg bg-DF p-3 dark:bg-18'>
              <Link to={`${noticia.id}`} className='flex h-full flex-col'>
                <img className='rounded' src={noticia.image} />
                <h1 className='my-2 line-clamp-1 text-lg font-bold text-26 dark:text-FF'>{noticia.title}</h1>
                <p className='line-clamp-3 text-26 text-opacity-90 dark:text-FF dark:text-opacity-90'>{noticia.text}</p>
                <div className='flex-grow'></div>
                <div className='mt-5 flex flex-row justify-between text-sm text-26 text-opacity-70 dark:text-FF dark:text-opacity-70'>
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
