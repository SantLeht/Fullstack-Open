import { useState } from 'react'


const Button = ({ onVote, onClick}) => {
  return(
  <div>
    <button onClick={onVote}>vote</button>
    <button onClick = {onClick}>next anecdote</button>
  </div>
  )
  
}



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  // Äänien hallinta
  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy);
  }

  const mathMax = Math.max(...votes)
  const indexMax = votes.indexOf(mathMax)
  
  // Näytetään anekdootti jolla eniten ääniä
  console.log(anecdotes[indexMax])
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes </p>
      <Button onClick = {() => setSelected(Math.floor(Math.random()*anecdotes.length))}
        onVote={handleVote}/>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[indexMax]}</p> 
      <p>has {mathMax} votes</p>
      
    </div>
  )
}


export default App