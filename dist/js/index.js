/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};


let questions = [{
  question: "Какой язык программирования самый популярный?",
  answers: ["Java", "C++", "Python", "JavaScript"],
  correct: 4
}, {
  question: "Какой браузер самый популярный?",
  answers: ["Яндекс Браузер", "Google Chrome", "Mozila Firefox", "Safari", "Конечно это Internet Explorer!"],
  correct: 2
}, {
  question: "Что значит HTTP?",
  answers: ["HyperText Transfer Protocol", "HyperText Transfer Property", "HyperText Transport Protocol", "HyperText Markup Language"],
  correct: 1
}, {
  question: "В каком году был запущен первый DNS сервер?",
  answers: ["1996", "1984", "1985", "1982", "все ответы не верные"],
  correct: 2
}];
const quizHeader = document.querySelector('#header');
const unList = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');
const quiz = document.querySelector('#quiz');
let score = 0,
    questionIndex = 0;
clearHTML();
shuffle(questions);
showQuestion();
submitBtn.addEventListener('click', checkAnswer); // Рандомайзер вопросов

function shuffle(questions) {
  let j, temp;

  for (let i = questions.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = questions[j];
    questions[j] = questions[i];
    questions[i] = temp;
  }

  return questions;
}

;

function clearHTML() {
  quizHeader.innerHTML = '';
  unList.innerHTML = '';
}

;

function showQuestion() {
  const headerTemplate = "<h2 class=\"quiz__header_title\">%title%</h2>";
  const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
  quizHeader.innerHTML = title;

  for (let [index, answerText] of questions[questionIndex]['answers'].entries()) {
    let value = index + 1;
    const questionTemplate = "\n        <li>\n            <label>\n                <input value=\"".concat(value, "\" type=\"radio\" class=\"answer\" name=\"answer\">\n                <span>%answer%</span>\n            </label>\n        </li>\n        ");
    const answerHTML = questionTemplate.replace('%answer%', answerText);
    unList.innerHTML += answerHTML;
  }
}

;

function checkAnswer(event) {
  const checkedRadio = unList.querySelector('input[type="radio"]:checked');

  if (!checkedRadio) {
    submitBtn.blur();
    return;
  }

  const userAnswer = parseInt(checkedRadio.value);

  if (userAnswer === questions[questionIndex]['correct']) {
    score++;
  }

  ;

  if (questionIndex !== questions.length - 1) {
    questionIndex++;
    clearHTML();
    showQuestion();
    return;
  } else {
    clearHTML();
    showResults();
  }
}

;

function showResults() {
  let title, massage;

  if (score == questions.length) {
    title = 'Поздравляем!';
    massage = 'Вы ответили верно на все вопросы!';
  } else if (score * 100 / questions.length >= 50) {
    title = 'Хороший результат!';
    massage = 'Вы ответили правильно на большинство вопросов!';
  } else {
    title = 'Стоит постараться!';
    massage = 'Вы ответели неверно на большинство вопросов!';
  }

  let result = "".concat(score, " \u0438\u0437 ").concat(questions.length);
  const resultsTemplate = "\n    <h2 class=\"quiz__header_title\">".concat(title, "</h2>\n    <h3 class=\"quiz__header_summary\">").concat(massage, "</h3>\n    <p class=\"quiz__header_result\">\u0412\u0430\u0448 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 ").concat(result, "</p>\n    ");
  quizHeader.innerHTML = resultsTemplate;
  unList.remove();
  quiz.classList.add('end');
  quizHeader.classList.add('end');
  submitBtn.blur();
  submitBtn.innerText = 'Начать заново';

  submitBtn.onclick = () => history.go();
}
/******/ })()
;