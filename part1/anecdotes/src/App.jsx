import { useState } from "react";
const Button = ({ text, handleClick, handleVote }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState(new Array(anecdotes.length).fill(0));
  const [clicks, setClicks] = useState(0);
  const [mostVoted, setMostVoted] = useState("");
  const [mostVotes, setMostVotes] = useState(0);

  const handleClick = () => {
    const index = Math.floor(Math.random() * anecdotes.length);
    setClicks(clicks + 1);
    setSelected(index);
    let maxVote = Math.max(...votes);
    let mostVotedQuote = votes.indexOf(maxVote);

    setMostVoted(anecdotes[mostVotedQuote]);
    setMostVotes(maxVote);
  };

  const handleVote = () => {
    const newArr = [...votes];
    newArr[selected] += 1;
    setVote(newArr);
    let maxVote = Math.max(...newArr);
    console.log(newArr);
    let mostVotedQuote = newArr.indexOf(maxVote);
    setMostVoted(anecdotes[mostVotedQuote]);
    setMostVotes(maxVote);
  };

  if (clicks === 0) {
    return (
      <>
        <p>Click to see a quote</p>
        <button onClick={handleClick}>Click for anecdote</button>
      </>
    );
  }
  return (
    <div>
      <h1>Anecdote Of the day</h1>
      <p>{anecdotes[selected]}</p>
      <button onClick={handleClick}>Click for anecdote</button>
      <p>has {votes[selected]} votes</p>
      <Button text={"vote"} handleClick={handleVote} />
      <Button text={"next anecdote"} handleClick={handleClick} />
      <h2>Anecdote with most votes</h2>
      <p>{mostVoted}</p>
      <p>has {mostVotes} votes</p>
    </div>
  );
};

export default App;
