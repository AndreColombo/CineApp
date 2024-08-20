import { Link } from "react-router-dom";

const defaultImageH = import.meta.env.VITE_DEFAULTIMGH;
const imagesURL = import.meta.env.VITE_IMG;

// Função para determinar o link de destino
const getLinkTo = (producao) => {
  if (!producao) return "./PageNotFound";
  return producao.title
    ? `/filmes/${producao.id}/elenco`
    : `/series/${producao.id}/elenco`;
};

export default function CardElenco({ elenco, producao }) {
  const elencoLimitado = elenco.slice(0, 9);

  return (
    <div className="flex px-10">
      <div className="flex gap-7 overflow-x-auto custom-scrollbar pb-1">
        {elencoLimitado.map((ator) => (
          <Link to={`/pessoa/${ator.id}`} key={ator.id}>
            <div
              className="bg-FF  dark:bg-26 rounded-lg flex-shrink-0"
              style={{ width: "10rem", height: "100%" }}
            >
              <img
                src={
                  ator.profile_path
                    ? `${imagesURL}${ator.profile_path}`
                    : defaultImageH
                }
                alt={ator.name}
                className="rounded-t-lg w-full h-48 object-cover"
              />
              <div className="p-2">
                <h1 className="font-semibold text-lg text-26 dark:text-FF">
                  {ator.name}
                </h1>
                <p className="text-26 text-opacity-75 dark:text-FF dark:text-opacity-75">
                  {ator.character}
                </p>
              </div>
            </div>
          </Link>
        ))}
        <Link
          to={getLinkTo(producao)}
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
