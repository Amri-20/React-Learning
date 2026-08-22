import { useState, useCallback, useEffect, useRef} from 'react'
// import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numallowed,setnumber]=useState(false)
  const [charallowed,setchar]=useState(false)
  const [password,setPassword]=useState("")

  const passwordRef=useRef(null)

  const passgen=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numallowed) str+="0123456789"
    if(charallowed) str+="!@#$%&*(){}[]~`=-.,><"

    for(let i=0;i<length;i++){
      let char=Math.floor(Math.random()*str.length)
      pass+=str.charAt(char)
    }

    setPassword(pass)

  },[length,charallowed,numallowed])


  useEffect(() => {passgen()}, [passgen])  //use when callback is used
  // useEffect(()=>{passgen()},[setPassword,length,numallowed,charallowed,passgen()])  //use when callback is not used

  const copyToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,10);
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
    <div className='text-white w-full max-w-md mx-auto shadow-md
    rounded-lg px-4 my-8 text-orange-500 bg-gray-200'>
      <h1 className='text-white text-center my-3'>PassWord Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button
        onClick={copyToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >COPY
        </button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
          type="range"
          min={6}
          max={20}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length:{length}</label>
        </div>

        <div>
          <input 
          type="checkbox"
          defaultChecked={numallowed}
          id='numberInput'
          onChange={()=>{setnumber((prev)=>!prev)}}
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>

        <div>
          <input 
          type="checkbox"
          defaultChecked={charallowed}
          id='charinput'
          onChange={()=>{setchar((prev)=>!prev)}}
          />
          <label htmlFor='charinput'>Characters</label>
        </div>

      </div>
    </div>
    </>
  )
}

export default App
