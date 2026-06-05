import { Link } from "react-router-dom";

const defaultImageH = import.meta.env.VITE_DEFAULTIMGH;
const imagesURL = import.meta.env.VITE_IMG;

// Função para determinar o link de destino
const getLinkTo = (producao) => {
  if (!producao) return "./elenco";
  return producao.title ? `/filmes/${producao.id}/elenco` : `/series/${producao.id}/elenco`;
};

export default function CardElenco({ elenco, producao }) {
  const elencoLimitado = elenco.slice(0, 9);

  return (
    <div className='flex px-10'>
      <div className='custom-scrollbar flex gap-7 overflow-x-auto pb-1'>
        {elencoLimitado.map((ator) => (
          <Link to={`/pessoa/${ator.id}`} key={ator.id}>
            <div cclassName='bg-FF dark:bg-26 rounded-lg flex-shrink-0' style={{ width: "10rem", height: "100%" }}>
              <img src={ator.profile_path ? `${imagesURL}${ator.profile_path}` : defaultImageH} alt={ator.name} className='h-48 w-full rounded-t-lg object-cover' />
              <div className='p-2'>
                <h1 className='text-lg font-semibold text-26 dark:text-FF'>{ator.name}</h1>
                <p className='text-26 text-opacity-75 dark:text-FF dark:text-opacity-75'>{ator.character}</p>
              </div>
            </div>
          </Link>
        ))}
        <Link to={getLinkTo(producao)} className='flex items-center justify-center rounded-lg p-2 backdrop-blur-xl' style={{ width: "10rem", height: "auto" }}>
          <span className='flex w-32 justify-center text-lg font-bold'>Mostrar Mais</span>
        </Link>
      </div>
    </div>
  );
}
