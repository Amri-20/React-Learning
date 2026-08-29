import { useEffect, useState } from 'react'
import './App.css'
import ThemeBtn from './Components/ThemeBtn'
import { ThemeProvider } from './Context/Theme'
import Card from './Components/Card'
// import ThemeBtn from './Components/ThemeBtn'

function App() {
  const [count, setCount] = useState(0)

  const [themeMode,setThemeMode]=useState("Light")

  const lightTheme=()=>{
    setThemeMode("light")
  }
  const darkTheme=()=>{
    setThemeMode("dark")
  }

  useEffect(()=>{
    document.querySelector('html').classList.remove("light","dark")
    document.querySelector('html').classList.add(themeMode)

  },[themeMode])



  return (

    
    <>
      <ThemeProvider value={{themeMode,darkTheme,lightTheme}}>
        <div className="flex flex-wrap min-h-screen items-center">
          <div className="w-full">
            <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
              <ThemeBtn/>
            </div>

            <div className="w-full max-w-sm mx-auto">
              <Card/>
            </div>
          </div>
        </div>
      </ThemeProvider>

    </>
  )
}

export default App
