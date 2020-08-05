import React from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars1.githubusercontent.com/u/33630529?s=460&u=ff5347c8aabbe40f8cfee19390ab1b1aea31f91f&v=4"
          alt="Klaus Dellano"
        />
        <div>
          <strong>Klaus Dellano</strong>
          <span>Game Design</span>
        </div>
      </header>
      <p>
        Entusiasta das melhores e piores experiências dos jogos.
        <br />
        <br />
        Vidrado nos lançamentos dos diversos jogos anunciados. Percebendo cada
        detalhe e criando uma orquestra mental de todos os componentes
        individuais do game
      </p>
      <footer>
        <p>
          Preço/hora
          <strong>R$60,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;
