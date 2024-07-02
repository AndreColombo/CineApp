import { Link } from "react-router-dom";

const defaultImage = import.meta.env.VITE_DEFAULTIMGP;
const imagesURL = import.meta.env.VITE_IMG;

export default function CardElenco({ elenco }) {
  const elencoLimitado = elenco.slice(0, 9);

  return (
    <div className="flex px-10">
      <div className="flex gap-7 overflow-x-auto custom-scrollbar pb-1">
        {elencoLimitado.map((ator) => (
          <Link to={`/pessoa/${ator.id}`} key={ator.id}>
            <div
              className="bg-FF  dark:bg-26 text-26 dark:text-FF rounded-lg flex-shrink-0"
              style={{ width: "10rem", height: "100%" }}
            >
              <img
                src={
                  ator.profile_path
                    ? `${imagesURL}${ator.profile_path}`
                    : defaultImage
                }
                alt={ator.name}
                className="rounded-t-lg w-full h-48 object-cover"
              />
              <div className="p-2">
                <h1 className="font-semibold text-lg">{ator.name}</h1>
                <p className="">{ator.character}</p>
              </div>
            </div>
          </Link>
        ))}
        <Link
          to={`elenco`}
          className="backdrop-blur-xl p-2 flex rounded-lg items-center justify-center"
          style={{ width: "10rem", height: "auto" }}
        >
          <span className="flex justify-center font-bold text-lg w-32">
            Mostrar Mais
          </span>
        </Link>
      </div>
    </div>
  );
}
