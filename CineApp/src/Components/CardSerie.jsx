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
      <h1 className="text-white pl-14 font-bold text-xl m-4">
        Mais Bem Avaliadas
      </h1>
      <div className="flex gap-7 flex-wrap justify-center">
        {topSeries.map((serie) => (
          <Link
            key={serie.id}
            to={`${serie.id}`}
            className="relative text-white p-2 w-64 h-96 flex flex-col justify-end bg-cover bg-center rounded-lg"
            style={{
              backgroundImage: `url(${imagesURL}${serie.poster_path})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none rounded-lg"></div>
            <div className="relative z-10 w-full">
              <h1 className="text-white font-bold pl-3 mb-2">{serie.name}</h1>
              <p className="text-sm text-opacity-75 line-clamp-2 pl-3 pr-3">
                {serie.overview}
              </p>
              <div className="infos flex justify-between p-3">
                <div className="linguas flex items-center space-x-2">
                  <span className="bg-18 text-white text-opacity-75 font-medium p-1 rounded uppercase text-sm flex-shrink-0">
                    dub
                  </span>
                  <span className="bg-18 text-white text-opacity-75 font-medium p-1 rounded uppercase text-sm flex-shrink-0">
                    {serie.original_language}
                  </span>
                </div>
                <span className="bg-18 text-white text-opacity-75 font-medium p-1 rounded text-sm flex-shrink-0">
                  00+
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
