export default function PageNotFound() {
  return (
    <>
      <div className='flex flex-col items-center p-40 text-26 dark:text-FF'>
        <h1 className='flex items-center justify-center text-4xl font-bold'>Página não encontrada</h1>
        <p className='flex items-center justify-center pt-5'>Parece que o link que você acessou não existe. Volte para a página anterior e tente novamente.</p>
        <p className='flex items-center justify-center pt-5'>Se você acredita que isso seja um erro, por favor, entre em contato com o nosso suporte.</p>
      </div>
    </>
  );
}
