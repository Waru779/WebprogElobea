const root = ReactDOM.createRoot(document.getElementById("root"));

const loadCounter = () => {
  root.render(React.createElement(Counter));
};

const loadQuiz = () => {
  root.render(React.createElement(Quiz));
};

document.getElementById("counterLink").addEventListener("click", (e) => {
  e.preventDefault();
  loadCounter();
});

document.getElementById("quizLink").addEventListener("click", (e) => {
  e.preventDefault();
  loadQuiz();
});

// Alapértelmezett betöltés
loadCounter();