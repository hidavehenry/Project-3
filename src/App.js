import "./App.css";
import firebase from "./firebase";
import { useState, useEffect } from "react";

function App() {
  const [prompts, setPrompts] = useState([]);
  const [displayPrompts, setDisplayPrompts] = useState("");
  const [userInput, setUserInput] = useState("");

  //captures the text input values
  const handleChange = (event) => {
    setUserInput(event.target.value);
  };
  //submits the input to the database
  const handleClick = (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref().child("musings");
    dbRef.push(userInput);
    setUserInput("");

    // console.log("IAM PROMPTS", prompts);
    // setPrompts(prompts[randomNumber(prompts)]);
  };
  //button to generate random prompt
  const handleRandom = (e) => {
    e.preventDefault();
    const promptLength = prompts.length;
    setDisplayPrompts(prompts[randomNumber(promptLength)]);
  };

  //grabs from database on mount
  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (response) => {
      const responsePrompts = response.val().prompts;

      const newPromptsState = [];

      for (const key in responsePrompts) {
        newPromptsState.push(responsePrompts[key]);
      }
      //set the first prompt with a random selection
      const promptLength = newPromptsState.length;
      setDisplayPrompts(newPromptsState[randomNumber(promptLength)]);
      //hold array with all prompts for future manipulations
      setPrompts(newPromptsState);
    });
  }, []);

  //generate a random number
  const randomNumber = (length) => {
    const number = Math.floor(Math.random() * length);
    return number;
  };
  function toggleDisplay(e) {
    // e.preventDefault();
    console.log(e.target.className);
    if (e.target.className === "show") {
      e.target.className = "hidden";
    } else {
      e.target.className = "show";
    }
  }

  return (
    <div className="App">
      <h1>Humble Ponderings</h1>
      <h3>Get your thoughts out, Get your feels out</h3>
        <h2 className="show" onClick={toggleDisplay}>
          {displayPrompts}
        </h2>

        <form action="submit">
          <label htmlFor="newMusings">Put a thought there</label>
          <input
            type="text"
            id="newMusings"
            onChange={handleChange}
            value={userInput}
          />
        <button onClick={handleClick}>im a button</button>
        <button onClick={handleRandom}>generate a new prompt</button>
      </form>
    </div>
  );
}

export default App;
