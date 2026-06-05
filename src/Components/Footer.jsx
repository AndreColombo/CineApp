import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className='p-6 text-26 dark:text-FF'>
      <div className='p-4'>
        <div className='flex flex-wrap justify-between'>
          <div className='md:w-1/4'>
            <h2 className='mb-2 text-lg font-semibold'>AndreFlix</h2>
            <p className='text-sm'>Seu guia para filmes e séries.</p>
            <p className='mt-2 text-sm'>Encontre informações detalhadas sobre filmes, séries de TV, elenco, trailers e muito mais.</p>
          </div>
          <div className='mb-4 w-full md:mb-0 md:w-1/4'>
            <h3 className='mb-2 text-lg font-semibold'>Sobre</h3>
            <p className='text-sm'>AndreFlix é um site dedicado a fornecer informações atualizadas sobre filmes e séries de TV.</p>
            <p className='mt-2 text-sm'>Explore nosso catálogo e descubra novidades do mundo do entretenimento.</p>
          </div>
          <div className='mb-4 w-full md:mb-0 md:w-1/4'>
            <h3 className='mb-2 text-lg font-bold'>Contato</h3>
            <p className='text-sm'>Email: contato@andreflix.com</p>
            <p className='text-sm'>Telefone: +55 11 91234-5678</p>
          </div>
        </div>
        <hr className='my-4 border-gray-700' />
        <p className='text-center text-sm'>&copy; {new Date().getFullYear()} AndreFlix. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
