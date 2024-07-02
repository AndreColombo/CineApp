export default function PageNotFound() {
  return (
    <>
      <div className="text-26 dark:text-FF p-40 flex flex-col items-center">
        <h1 className="font-bold text-4xl flex justify-center items-center">
          Página não encontrada
        </h1>
        <p className="flex justify-center items-center pt-5">
          Parece que o link que você acessou não existe. Volte para a página
          anterior e tente novamente.
        </p>
        <p className="flex justify-center items-center pt-5">
          Se você acredita que isso seja um erro, por favor, entre em contato
          com o nosso suporte.
        </p>
      </div>
    </>
  );
}
