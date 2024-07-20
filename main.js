var b1, b2, b3, b4, b5, b6, b7, b8, b9;
b1 = document.getElementsByClassName("th1");
b2 = document.getElementsByClassName("th2");
b3 = document.getElementsByClassName("th3");
b4 = document.getElementsByClassName("th4");
b5 = document.getElementsByClassName("th5");
b6 = document.getElementsByClassName("th6");
b7 = document.getElementsByClassName("th7");
b8 = document.getElementsByClassName("th8");
b9 = document.getElementsByClassName("th9");

var b1btn, b2btn, b3btn, b4btn, b5btn, b6btn, b7btn, b8btn, b9btn, resetbtn;
b1btn = document.getElementsByClassName("button1");
b2btn = document.getElementsByClassName("button2");
b3btn = document.getElementsByClassName("button3");
b4btn = document.getElementsByClassName("button4");
b5btn = document.getElementsByClassName("button5");
b6btn = document.getElementsByClassName("button6");
b7btn = document.getElementsByClassName("button7");
b8btn = document.getElementsByClassName("button8");
b9btn = document.getElementsByClassName("button9");
resetbtn = document.getElementsByClassName("reset");

let mainarr = [0];
let btnarr = []
let turnCount = 0;

function isEven(mainarr) {
  if (mainarr.length % 2 === 0) {
    return true;
  } else {
    return false;
  }
}

function showX(element) {
  const buttonText = element.children[0];
  if (buttonText) {
    buttonText.textContent = "X";
  }
}

function showO(element) {
  const buttonText = element.children[0];
  if (buttonText) {
    buttonText.textContent = "O";
  }
}

function checkIfPlayed(element) {
  if (element.dataset && element.dataset.clicked === "true") {
    return true;
  } else {
    return false;
  }
}

function removeMove() {
  if (btnarr.length > 0) {
    const classNameToRemove = btnarr[0];
    const button = document.querySelector(`.${classNameToRemove}`);
    if (button) {
      button.children[0].textContent = '';
      button.dataset.clicked = "false"; 
    }
    btnarr.shift(); 
  }
}

function special() {
  if (mainarr.length === 7) {
    removeMove();
    removeMove();
  }
}

function resetButtonColors() {
  const buttons = [b1btn, b2btn, b3btn, b4btn, b5btn, b6btn, b7btn, b8btn, b9btn];
  buttons.forEach(buttonCollection => {
    for (let i = 0; i < buttonCollection.length; i++) {
      const buttonText = buttonCollection[i].children[0];
      if (buttonText) {
        buttonText.style.color = "";
      }
    }
  });
}

function firstMove() {
  if (turnCount === 6) {
    resetButtonColors(); 
    highlightFirstButton(0);
  }
  if (turnCount > 6) {
    resetButtonColors();
    highlightFirstButton(0);
  }
}

function highlightFirstButton(btnIndex) {
  if (btnIndex >= 0 && btnIndex < btnarr.length) {
    let firstBtnClass = btnarr[btnIndex];
    let firstBtnElements = document.getElementsByClassName(firstBtnClass);
    
    if (firstBtnElements.length > 0) {
      let firstBtn = firstBtnElements[0];
      let buttonText = firstBtn.children[0];
      if (buttonText) {
        buttonText.style.color ="red";
        console.log("Button text color changed to red:", buttonText);
      } else {
        console.error("Button text not found:", firstBtn);
      }
    } else {
      console.error("No elements found with class:", firstBtnClass);
    }
  } else {
    console.error("Invalid button index:", btnIndex);
  }
}

function reset() {
  const buttons = [b1btn, b2btn, b3btn, b4btn, b5btn, b6btn, b7btn, b8btn, b9btn];
  buttons.forEach(buttonCollection => {
    for (let i = 0; i < buttonCollection.length; i++) {
      const buttonText = buttonCollection[i].children[0];
      if (buttonText) {
        buttonText.textContent = '';
        buttonText.style.color = ''; 
      }
      buttonCollection[i].removeAttribute('disabled');
      buttonCollection[i].style.display = "block";
      buttonCollection[i].dataset.clicked = "false";
      turnCount = 0;
    }
  });

  btnarr = [];
  mainarr.splice(1);
}

function turns(element) {
  if (checkIfPlayed(element)) {
    return;
  }

  if (isEven(mainarr)) {
    showO(element);
  } else {
    showX(element);
  }
  
  element.dataset.clicked = "true";
  mainarr.push(mainarr.length);
  btnarr.push(element.className);
  turnCount++;
  console.log(turnCount);
  console.log(btnarr);

  if (turnCount > 6) {
    removeMove();
  }
}

function checkForWins() {
  const winningCombinations = [
    [b1btn, b2btn, b3btn],
    [b4btn, b5btn, b6btn],
    [b7btn, b8btn, b9btn],
    [b1btn, b4btn, b7btn],
    [b2btn, b5btn, b8btn],
    [b3btn, b6btn, b9btn],
    [b1btn, b5btn, b9btn],
    [b3btn, b5btn, b7btn],
  ];
  
  const playerX = 'X';
  const playerO = 'O';

  for (const combination of winningCombinations) {
    const allX = combination.every(cellElement => cellElement[0].textContent === playerX);
    const allO = combination.every(cellElement => cellElement[0].textContent === playerO);

    if (allX) {
      document.querySelector('.print').innerHTML = "Player X won";
      disableButtons();
      return; 
    } else if (allO) {
      document.querySelector('.print').innerHTML = "Player O won";
      disableButtons();
      return;
    }
  }

const allCellsFilled =  Array.from(b1btn).every(button => button.dataset.clicked === "true") &&
                        Array.from(b2btn).every(button => button.dataset.clicked === "true") &&
                        Array.from(b3btn).every(button => button.dataset.clicked === "true") &&
                        Array.from(b4btn).every(button => button.dataset.clicked === "true") &&
                        Array.from(b5btn).every(button => button.dataset.clicked === "true") &&
                        Array.from(b6btn).every(button => button.dataset.clicked === "true") &&
                        Array.from(b7btn).every(button => button.dataset.clicked === "true") &&
                        Array.from(b8btn).every(button => button.dataset.clicked === "true") &&
                        Array.from(b9btn).every(button => button.dataset.clicked === "true");

if (allCellsFilled) {
    document.querySelector('.print').innerHTML = "Match Tie";
    disableButtons();
} else {
    document.querySelector('.print').innerHTML = isEven(mainarr) ? "Player O Turn" : "Player X Turn";
}

}
  
function disableButtons() {
  const buttons = [b1btn, b2btn, b3btn, b4btn, b5btn, b6btn, b7btn, b8btn, b9btn];
  buttons.forEach(buttonCollection => {
      for (let i = 0; i < buttonCollection.length; i++) {
          buttonCollection[i].setAttribute('disabled', true);
      }
  });
}
  
function highlightWinningCells(cells, player) {
    const winningColor = player === 'X' ? 'red' : 'blue';
    for (const cell of cells) {
      cell.style.backgroundColor = winningColor;
    }
  }

  function playingTurns(mainarr) {
    const buttons = [b1btn, b2btn, b3btn, b4btn, b5btn, b6btn, b7btn, b8btn, b9btn];
    buttons.forEach(buttonCollection => {
      for (let i = 0; i < buttonCollection.length; i++) {
        const button = buttonCollection[i];
        button.addEventListener("click", function () {
          turns(this);
          checkForWins();
          firstMove();
        });
      }
    });
    resetbtn[0].addEventListener("click", reset);
  }

playingTurns(mainarr);