import { useState } from "react";

const Header = ({feedback}) => (
  <h1>{feedback}</h1>
)

const Button = ({onClick, text}) =>(
  <button onClick={onClick}>{text}</button>
);

const StatisticLine = ({text, value}) =>(
 
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  
  
 
);



const Statistics = ({goodcount, neutralcount, badcount}) => {

  const total = goodcount + neutralcount + badcount;

  if(total == 0){
    return (
      <p>No feedback given</p>
    );
  }

  const good = goodcount;
  const neutral = neutralcount;
  const bad = badcount;
  const all = goodcount + neutralcount + badcount;
  const average = ((goodcount - badcount) / total);
  const positive = (goodcount /total *100 + "%")


  return (
    <div>
      
      <StatisticLine text  = "Good" value = {good}/>
      <StatisticLine text  = "Neutral" value = {neutral}/>
      <StatisticLine text  = "bad" value = {bad}/>
      <StatisticLine text  = "All" value = {all}/>
      <StatisticLine text  = "Average" value = {average}/>
      <StatisticLine text  = "Positive" value = {positive}/>
      
    </div>
  );
};
const App = () => {

  const [goodcount, setgoodcount] = useState(0);
  const [neutralcount, setneutralcount] = useState(0);
  const [badcount, setbadcount] = useState(0);

  return (
    <div>
      <Header feedback = "give feedback"/>
      <Button onClick= {() =>setgoodcount(goodcount + 1)} text = "good"/>
      <Button onClick= {() =>setneutralcount(neutralcount + 1)} text = "neutral"/>
      <Button onClick= {() =>setbadcount(badcount + 1)} text = "bad"/>
      <Header feedback= "statistics"/>
      
      <Statistics goodcount = {goodcount} neutralcount={neutralcount} badcount={badcount}/>
      
 
      
      
    </div>
   
  )
}

export default App