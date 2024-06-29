import React from "react";
import { Link } from "react-router-dom";

const imagesURL = import.meta.env.VITE_IMG;

export default function CardElenco({ elenco }) {
  const elencoLimitado = elenco.slice(0, 9);

  return (
    <div className="overflow-x-auto custom-scrollbar pb-1">
      <div className="flex px-10 space-x-8">
        {elencoLimitado.map((ator) => (
          <Link to={`/pessoa/${ator.id}`} key={ator.id}>
            <div
              className="bg-26 text-white rounded-lg flex-shrink-0"
              style={{ width: "10rem", height: "19rem" }}
            >
              <img
                src={`${imagesURL}${ator.profile_path}`}
                alt={ator.name}
                className="rounded-t-lg w-full h-48 object-cover"
              />
              <div className="p-2">
                <h1 className="font-bold text-lg">{ator.name}</h1>
                <p className="text-sm text-opacity-75">{ator.character}</p>
              </div>
            </div>
          </Link>
        ))}
        <Link
          to="elenco"
          className="backdrop-blur-xl p-2 flex rounded-lg items-center"
        >
          <span className="font-bold text-lg w-20">Ver Mais</span>
        </Link>
      </div>
    </div>
  );
}
