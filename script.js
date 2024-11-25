"use strict";

///////////////////////////////////////

/* 
ЗАДАЧА: 
Создайте игру в угадай число.


Удачи)
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1; // math.rndm() генерирует случайное число от 0 до 1 (не включая 1) например 0.321 или 0.777 и т д Math.random()* 20 умнажает рандомное число на 20 например 0.33 * 20 = 6.6 итд далее Math.trunc убирает дробную часть Math.trunc(6.765) = 6 и в оконцовке + 1 = 6+1 = 7
let score = 20; // переменная = колво жизней в игре нач знач 20 кажый ход - 1 жизнь
let highscore = 0; // переменная с лучшим результатом

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    document.querySelector(".message").textContent = "⛔Введите число!";
  } else if (guess === secretNumber) {
    document.querySelector(".message").textContent = "🎉 Правильно";
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector(".wrapper").style.backgroundColor = "#60b347";

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
    triggerConfetti();
  } else if (guess !== secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent =
        guess > secretNumber ? "☝️ Слишком много" : "👇 Слишклм мало";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "💥 Вы проиграли!";
      document.querySelector(".score").textContent = 0;
      document.querySelector(".wrapper").style.backgroundColor = "red";

      triggerFire(); // Вызов анимации огня
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  document.querySelector(".message").textContent = "Начните угадывать...";
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector(".wrapper").style.background =
    "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.1))";
});

function triggerConfetti() {
  const confettiContainer = document.querySelector(".confetti");
  confettiContainer.style.display = "block";

  for (let i = 0; i < 100; i++) {
    const confettiPiece = document.createElement("div");
    confettiPiece.classList.add("confetti-piece");
    confettiPiece.style.left = Math.random() * 100 + "vw";
    confettiPiece.style.backgroundColor = `hsl(${
      Math.random() * 360
    }, 100%, 50%)`; // Рандомный цвет
    confettiPiece.style.animationDuration = Math.random() * 3 + 2 + "s"; // Рандомная длительность
    confettiPiece.style.animationDelay = Math.random() * 2 + "s"; // Задержка
    confettiContainer.appendChild(confettiPiece);

    // Удаляем конфетти после окончания анимации
    setTimeout(() => confettiPiece.remove(), 5000);
  }

  // Прячем контейнер через 5 секунд
  setTimeout(() => (confettiContainer.style.display = "none"), 5000);
}

function triggerFire() {
  const fireCount = 120; // Количество огоньков

  for (let i = 0; i < fireCount; i++) {
    const fireElement = document.createElement("div");
    fireElement.classList.add("fire");
    document.body.appendChild(fireElement); // Добавляем элемент в DOM

    // Позиционируем огоньки случайным образом
    fireElement.style.position = "fixed";
    fireElement.style.top = Math.random() * 100 + "vh"; // Случайная позиция по вертикали
    fireElement.style.left = Math.random() * 100 + "vw"; // Случайная позиция по горизонтали
    fireElement.style.width = "30px"; // Размер огонька
    fireElement.style.height = "30px"; // Размер огонька
    fireElement.style.background =
      'url("https://svgsilh.com/svg/306890-ff5722.svg") no-repeat center center';
    fireElement.style.backgroundSize = "contain";
    fireElement.style.zIndex = "9999";

    // Запускаем анимацию для огоньков (движение вверх)
    fireElement.style.animation = "fireAnimation 3s ease-in-out forwards"; // Анимация для огоньков

    // Убираем огоньки через 3 секунды
    setTimeout(() => {
      fireElement.remove(); // Удаляем огонь из DOM
    }, 3000); // Таймер совпадает с длительностью анимации
  }
}

// Стили для анимации огня
const style = document.createElement("style");
style.innerHTML = `
    @keyframes fireAnimation {
      0% {
        transform: translateY(0); /* Начальное положение */
        opacity: 1;
      }
      50% {
        transform: translateY(-50px); /* Поднимаем огоньки на 50px */
        opacity: 0.7;
      }
      100% {
        transform: translateY(-100vh); /* Поднимаем огоньки выше, на всю высоту экрана */
        opacity: 0;
      }
    }
  `;
document.head.appendChild(style); // Добавляем стиль в head документа

// добовляю знак вопроса через JS , поехали :
const questionMark = document.createElement("div"); // создаем див куда впихуем элеимент
questionMark.classList.add("question-mark"); //  добовляем класс для нового дива
questionMark.textContent = "?"; // задаем тект в новый див
questionMark.setAttribute("role", "button"); // задаем роль для ? > копка
questionMark.style.cursor = "pointer";
questionMark.setAttribute("tabindex", "0"); // делаем его фокусироевым
document.querySelector(".wrapper").appendChild(questionMark); // добовляем конст квестМарк в в врапер или по просту в DOM

// создае м поп ап
const popup = document.createElement("div"); //create new div
popup.classList.add("popup"); // add class 2 div
popup.innerHTML = `
<div class="popup-content">
    <h2>Инструкция</h2>
    <p>Угадайте число между 1 и 20. Используйте подсказки "Слишком много" и "Слишком мало", чтобы приблизиться к ответу. Удачи!</p>
    <button class="btn close-popup">Закрыть</button>
  </div>
`;
document.body.appendChild(popup);

function openPopup() {
  popup.style.display = "flex"; // показываем попап
}

function closePopup() {
  popup.style.display = "none"; // скрываем попап
}

questionMark.addEventListener("click", openPopup); // open popup by click
document.querySelector(".close-popup").addEventListener("click", closePopup); // closepopap

//закрытие попапап вне коньенаьа
popup.addEventListener("click", (e) => {
  if (e.target === popup) closePopup();
});

// Стили css через js
const style1 = document.createElement("style"); // создоем конст style
style1.innerHTML = `
  .question-mark {
    position: absolute;
    top: 15%;
    left: 10%;
    transform: translate(-50%, -50%);
    font-size: 10rem;
    font-weight: bold;
    color: rgba(116, 82, 82, 0.7);
    z-index: 9999;
    animation: pulseAnimation 2s infinite;
  }

   @keyframes pulseAnimation {
    0% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.3);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }
  
  @media (max-width: 768px) {
    .question-mark {
      font-size: 6rem;
      top: 10%;
    }
  }  
  `;
document.head.appendChild(style1);

// звук
const buttonSound = new Audio("sound/btn.mp3");

function playButtonSound() {
  buttonSound.currentTime = 0;
  buttonSound.play();
}

document
  .querySelectorAll(".btn, .question-mark, .btn.close-popup")
  .forEach((button) => {
    button.addEventListener("click", playButtonSound);
  });

// фоновая музыка

const backgroundMusic = new Audio("sound/Title.mp3");

backgroundMusic.volume = 0.1;
backgroundMusic.loop = true;

let isPlaying = false; // Флаг, указывающий, играет ли музыка

// Получаем кнопку для управления музыкой
const playMusicButton = document.getElementById("play-music");

// Обработчик клика на кнопке для управления музыкой
playMusicButton.addEventListener("click", () => {
  if (isPlaying) {
    backgroundMusic.pause(); // Останавливаем музыку
    isPlaying = false; // Обновляем флаг
  } else {
    backgroundMusic.play(); // Запускаем музыку
    isPlaying = true; // Обновляем флаг
  }
}); /* window.addEventListener('load', () => {
  backgroundMusic.play();
}) */

// Создаем элемент img для картинки
const imageElement = document.createElement("img");
imageElement.src = "img/poring.png"; // Путь к картинке
imageElement.alt = "Poring Image"; // Альтернативный текст для картинки
imageElement.classList.add("image-in-corner"); // Добавляем класс для стилизации

// Добавляем картинку в body
document.body.appendChild(imageElement);
