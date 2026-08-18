import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {

  let [counter,setCounter]=useState(0)

  // let counter=15
  const addValue=()=>{
    // counter=counter+1;
    setCounter(counter+1);
    // console.log("clicked",counter);
  }

  const removeValue=()=>{
    // counter=counter+1;
    setCounter(counter-1);
    // console.log("clicked",counter);
  }

  return (
    <>
      <h1>Chai aur react</h1>
      <h2>Counter Value: {counter}</h2>

      <button onClick={addValue}>Add Value</button>
      <br />
      <button onClick={removeValue}>Remove value</button>
    </>
  )
}

export default App
