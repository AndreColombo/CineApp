import React from 'react';

export default function Pagamento() {
  const ticketType = localStorage.getItem('ticketType');
  const quantity = localStorage.getItem('quantity');
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');

  return (
    <div className="text-white p-14">
      <h1 className="font-bold text-xl my-5">Confirmação da Compra</h1>
      <p>Obrigado pela sua compra, {name}!</p>
      <p>Detalhes da compra:</p>
      <ul>
        <li>Tipo de ingresso: {ticketType}</li>
        <li>Quantidade: {quantity}</li>
        <li>E-mail: {email}</li>
      </ul>
    </div>
  );
}
