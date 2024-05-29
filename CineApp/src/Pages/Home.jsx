import data from "../../artigos.json";

export default function Home() {
  return (
    <div className="grid grid-cols-3">
      {data.map((filme, index, cinema, discord, podcast) => (
        <div className="card" key={index}>
          <h1 key={filme.title}>{filme.title}</h1>
          {filme.image ? (
            <img className="w-[300]" src={filme.image} />
          ) : (
            <h1 className="text-4x1">Não tem imagem</h1>
          )}
          <div className="tags">
            {filme.tags.map((tag) => (
              <span className="bg-pink-800 text-white p-1 m-1" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className="texto">
            {filme.text.map((texto) => (
              <p key={texto}>{texto}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
