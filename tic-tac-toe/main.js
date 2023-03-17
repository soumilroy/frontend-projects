import "./style.css";

const renderBoard = () => {
  let btnMarkup = "";

  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      btnMarkup += `<button data-row="${i}" data-column="${j}">${i} ${j}</button>`;
    }
  }
  return `
  <div class="board">
    ${btnMarkup}
  </div>
    
  `;
};

const setupGame = `
  <div>
    <h1>Tic Tac Toe Game (Vanillajs)</h1>
    <p>by Soumil Roy</p>
    ${renderBoard()}
  </div>
`;

document.querySelector("#app").innerHTML = setupGame;
