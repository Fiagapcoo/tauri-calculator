import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

const App = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleInput = (value: string) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const handleCalculate = () => {
    if (input) {
      invoke<string>("calculate", { expression: input })
        .then((res) => {
          setResult(res);
        })
        .catch((err) => {
          console.error(err);
          setResult("Error");
        });
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const { key } = event;

    if (/\d/.test(key)) {
      handleInput(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
      handleInput(key);
    } else if (key === "Enter") {
      handleCalculate();
    } else if (key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else if (key === "Escape") {
      handleClear();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [input]);

  return (
    <div className="calculator">
      <h1>THE BEST CALCULATOR</h1>
      <div className="display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        <button onClick={() => handleInput("1")}>1</button>
        <button onClick={() => handleInput("2")}>2</button>
        <button onClick={() => handleInput("3")}>3</button>
        <button onClick={() => handleInput("+")}>+</button>
        <button onClick={() => handleInput("4")}>4</button>
        <button onClick={() => handleInput("5")}>5</button>
        <button onClick={() => handleInput("6")}>6</button>
        <button onClick={() => handleInput("-")}>-</button>
        <button onClick={() => handleInput("7")}>7</button>
        <button onClick={() => handleInput("8")}>8</button>
        <button onClick={() => handleInput("9")}>9</button>
        <button onClick={() => handleInput("*")}>*</button>
        <button onClick={() => handleInput("0")}>0</button>
        <button onClick={() => handleInput("/")}>/</button>
        <button onClick={handleClear}>C</button>
        <button onClick={handleCalculate}>=</button>
      </div>
    </div>
  );
};

export default App;
