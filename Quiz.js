const { useState } = React;

function Quiz() {
  const questions = [
    {
      question: "Mi Magyarország fővárosa?",
      answer: "Budapest"
    },
    {
      question: "Mennyi 2 + 2?",
      answer: "4"
    },
    {
      question: "Mi a legnagyobb magyar tó?",
      answer: "Balaton"
    },
    {
      question: "Melyik országban található a Colosseum?",
      answer: "Olaszország"
    },
    {
      question: "Mi a fő szín a magyar zászlón?",
      answer: "Piros"
    },
    {
      question: "Ki volt Magyarország első királya?",
      answer: "Szent István"
    },
    {
      question: "Melyik tengerrel határos Magyarország?",
      answer: "Nincs"
    },
    {
      question: "Mi Magyarország legnagyobb tava?",
      answer: "Balaton"
    },
    {
      question: "Ki írta a 'Pál utcai fiúk' című könyvet?",
      answer: "Molnár Ferenc"
    },
    {
      question: "Mi a legnagyobb magyar folyó?",
      answer: "Duna"
    }
  ];

  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [canProceed, setCanProceed] = useState(false);

  const current = questions[index];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (showAnswer && value === current.answer) {
      setFeedback("Helyes! Mehetsz tovább.");
      setCanProceed(true);
    }
  };

  const checkAnswer = () => {
    const trimmedInput = input.trim();
    if (trimmedInput === current.answer) {
      setFeedback("Helyes válasz!");
      setShowAnswer(false);
      setCanProceed(true);
    } else {
      setFeedback(`Helytelen! A helyes válasz: ${current.answer}`);
      setShowAnswer(true);
      setCanProceed(false);
    }
  };

  const nextQuestion = () => {
    if (!canProceed) return;
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setInput("");
      setFeedback("");
      setShowAnswer(false);
      setCanProceed(false);
    } else {
      setFeedback("Gratulálok, vége a kvíznek!");
    }
  };

  return React.createElement("div", { className: "quiz" }, [
    React.createElement("h2", { key: "q" }, current.question),
    React.createElement("input", {
      key: "input",
      type: "text",
      value: input,
      onChange: handleInputChange,
      placeholder: "Írd be a választ..."
    }),
    React.createElement(
      "div",
      { key: "btns" },
      React.createElement(
        "button",
        { onClick: checkAnswer, disabled: showAnswer && canProceed },
        "Ellenőrzés"
      ),
      React.createElement(
        "button",
        {
          onClick: nextQuestion,
          disabled: !canProceed
        },
        "Következő kérdés"
      )
    ),
    React.createElement("p", { key: "f", style: { color: showAnswer ? "red" : "green" } }, feedback)
  ]);
}