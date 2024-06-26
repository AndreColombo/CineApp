import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ComprarIngresso() {
  const [ticketType, setTicketType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("ticketType", ticketType);
    localStorage.setItem("quantity", quantity);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    navigate("/confirmacao");
  };

  return (
    <div className="text-white pl-14">
      <h1 className="font-bold text-xl my-5">Comprar Ingressos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Tipo de ingresso:
            <select
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
              className="ml-2 rounded p-1 bg-26 border border-[#FF5733]"
            >
              <option value="">Selecione</option>
              <option value="vip">VIP - R$75,00</option>
              <option value="general">Geral - R$50,00</option>
              <option value="half">Meia-entrada - R$25,00</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Quantidade:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="ml-2 rounded p-1 bg-26 border border-[#FF5733]"
              min="1"
            />
          </label>
        </div>
        <div>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="ml-2 rounded p-1 bg-26 border border-[#FF5733]"
              required
            />
          </label>
        </div>
        <div>
          <label>
            E-mail:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ml-2 rounded p-1 bg-26 border border-[#FF5733]"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Número do cartão:
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="ml-2 rounded p-1 bg-26 border border-[#FF5733]"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Validade:
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="ml-2 rounded p-1 bg-26 border border-[#FF5733]"
              required
            />
          </label>
        </div>
        <div>
          <label>
            CVV:
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="ml-2 rounded p-1 bg-26 border border-[#FF5733]"
              required
            />
          </label>
        </div>
        <button type="submit">Confirmar Compra</button>
      </form>
    </div>
  );
}
