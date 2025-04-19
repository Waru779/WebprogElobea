function Counter() {
    const [count, setCount] = React.useState(0);
  
    return React.createElement("div", { className: "employee-form" }, 
      React.createElement("h2", null, "Számláló alkalmazás"),
      React.createElement("p", null, `Aktuális érték: ${count}`),
      React.createElement("button", { onClick: () => setCount(count + 1) }, "Növelés"),
      React.createElement("button", { onClick: () => setCount(count - 1), style: { marginLeft: "10px" } }, "Csökkentés"),
      React.createElement("button", { onClick: () => setCount(0), style: { marginLeft: "10px" } }, "Visszaállítás")
    );
  }