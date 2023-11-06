import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  return (
    <>
      <p>
        {props.text} {props.value}
      </p>
    </>
  );
};

const Statistics = ({ good, neutral, bad, total, averageScore, positive }) => {
  if (total > 0) {
    return (
      <div>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="total" value={total} />
        <StatisticLine text="average score" value={averageScore} />
        <StatisticLine text="positive" value={positive + "%"} />
      </div>
    );
  }
  return <p>No feedback giveback</p>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [positive, setPositive] = useState(0);
  const [clicks, setClick] = useState(0);

  /* for (let i = 0; i < Array.length; i++) {
  let counter = 0;
  if (arr[i] === good) {
    counter++;
  } else if (arr[i] == neutral) {
  } else {
    counter--;
  }
}*/

  const handleGoodFeedBack = () => {
    setGood(good + 1);
    const updatedGood = good + 1;
    const updatedTotal = total + 1;
    setTotal(total + 1);
    const updatedAverage = updatedGood * 1 + bad * -1;
    const newAverage = updatedAverage / updatedTotal;
    setAverageScore(newAverage.toFixed(1));
    setPositive((updatedGood / updatedTotal).toFixed(2) * 100);
  };

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1);
    const updatedNeutral = neutral + 1;
    const updatedTotal = total + 1;
    setTotal(total + 1);
    setPositive((good / updatedTotal).toFixed(2) * 100);
  };

  const handleBadFeedback = () => {
    setBad(bad + 1);
    const updatedBad = bad + 1;
    const updatedTotal = total + 1;
    setTotal(total + 1);
    const updatedAverage = good * 1 + updatedBad * -1;
    const newAverage = updatedAverage / updatedTotal;
    setAverageScore(newAverage.toFixed(2));
    setPositive((good / updatedTotal).toFixed(2) * 100);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodFeedBack} text={"good"} />

      <Button handleClick={handleNeutralFeedback} text={"neutral"} />
      <Button handleClick={handleBadFeedback} text={"bad"} />
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        averageScore={averageScore}
        positive={positive}
        total={total}
      />
    </div>
  );
};

export default App;
