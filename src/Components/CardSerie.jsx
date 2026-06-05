import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const imagesURL = import.meta.env.VITE_IMG;
const seriesURL = import.meta.env.VITE_APIS;
const apiKey = import.meta.env.VITE_API_KEY;

export default function CardSerie() {
  const [topSeries, setTopSeries] = useState([]);

  const getTopRatedSeries = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setTopSeries(data.results);
  };

  useEffect(() => {
    const topRatedUrl = `${seriesURL}top_rated?${apiKey}`;

    getTopRatedSeries(topRatedUrl);
  }, []);

  return (
    <>
      <h1 className='m-4 pl-14 text-xl font-bold text-26 dark:text-FF'>Mais Bem Avaliadas</h1>
      <div className='flex flex-wrap justify-center gap-7'>
        {topSeries.map((serie) => (
          <Link
            key={serie.id}
            to={`${serie.id}`}
            className='relative flex h-96 w-64 flex-col justify-end rounded-lg bg-cover bg-center p-2 text-FF'
            style={{
              backgroundImage: `url(${imagesURL}${serie.poster_path})`,
            }}>
            <div className='pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-t from-[#000000] to-transparent'></div>
            <div className='relative z-10 w-full'>
              <h1 className='mb-2 pl-3 font-bold'>{serie.name}</h1>
              <p className='line-clamp-2 pl-3 pr-3 text-sm text-FF text-opacity-75'>{serie.overview}</p>
              <div className='flex justify-between p-3'>
                <div className='flex items-center space-x-2'>
                  <span className='flex-shrink-0 rounded bg-18 p-1 text-sm font-medium uppercase text-FF text-opacity-75'>dub</span>
                  <span className='flex-shrink-0 rounded bg-18 p-1 text-sm font-medium uppercase text-FF text-opacity-75'>{serie.original_language}</span>
                </div>
                <span className='flex-shrink-0 rounded bg-18 p-1 text-sm font-medium text-FF text-opacity-75'>00+</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
