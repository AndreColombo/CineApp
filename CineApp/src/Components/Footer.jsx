import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-white p-6">
      <div className="p-4">
        <div className="flex flex-wrap justify-between">
          <div className="md:w-1/4">
            <h2 className="text-lg font-semibold mb-2">AndreFlix</h2>
            <p className="text-sm">Seu guia para filmes e séries.</p>
            <p className="text-sm mt-2">
              Encontre informações detalhadas sobre filmes, séries de TV,
              elenco, trailers e muito mais.
            </p>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Links</h3>
            <ul className="text-sm">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="filmes">Filmes</Link>
              </li>
              <li>
                <Link to="noticias">Notícias</Link>
              </li>
              <li>
                <Link to="sobre">Sobre</Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Sobre</h3>
            <p className="text-sm">
              AndreFlix é um site dedicado a fornecer informações atualizadas
              sobre filmes e séries de TV.
            </p>
            <p className="text-sm mt-2">
              Explore nosso catálogo e descubra novidades do mundo do
              entretenimento.
            </p>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">Contato</h3>
            <p className="text-sm">Email: contato@andreflix.com</p>
            <p className="text-sm">Telefone: +55 11 91234-5678</p>
          </div>
        </div>
        <hr className="border-gray-700 my-4" />
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} AndreFlix. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
