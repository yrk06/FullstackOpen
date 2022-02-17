import { useState } from 'react'

const Button = ({onclick,text}) =>{
  return (
    <button onClick={onclick}>{text}</button>
  )
}

const StatisticLine = ({text,value})=>{
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    
  )
}

const Statistics = ({good,neutral,bad}) =>{
  if (good+neutral+bad > 0){
    return (<table>
      <thead>
        <tr>
          <th>Statistic</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <StatisticLine text="Good" value={good}/>
        <StatisticLine text="Neutral" value={neutral}/>
        <StatisticLine text="Bad" value={bad}/>
        <StatisticLine text="All" value={good+neutral+bad}/>
        <StatisticLine text="Average" value={(good+bad*-1)/(good+neutral+bad)}/>
        <StatisticLine text="Positive" value={good/(good+neutral+bad)}/>
      </tbody>
    </table>)
  } else {
    return (
      <div>
      <p>No Feedback given</p>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onclick={()=>setGood(good+1)} text="Good"/>
      <Button onclick={()=>setNeutral(neutral+1)} text="Neutral"/>
      <Button onclick={()=>setBad(bad+1)} text="Bad"/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
