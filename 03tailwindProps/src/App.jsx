import { useState } from 'react'
import './App.css'
import Card from './components/Card'

// function Card2() {
//   return (
//     <div className="max-w-xs rounded-md shadow-md bg-black text-gray-100">
//       <img
//         src="https://picsum.photos/301"
//         alt=""
//         className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
//       />

//       <div className="flex flex-col justify-between p-6 space-y-8">
//         <div className="space-y-2">
//           <h2 className="text-3xl font-semibold tracking-wide">
//             Lorem
//           </h2>

//           <p className="text-gray-400">
//             Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//             Distinctio tempora ipsum soluta amet corporis accusantium
//             aliquid consectetur eaque!
//           </p>
//         </div>

//         <button
//           type="button"
//           className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-gray-800 text-gray-200"
//         >
//           Read more
//         </button>
//       </div>
//     </div>
//   )
// }

function App() {
  const [count, setCount] = useState(0)
  let myObj={
    username:"Amrit",
    age:20
  }
  let myarr=[1,2,3]

  return (
    <>
      <h1 className="bg-green-400 text-black p-4 rounded-xl">
        tailwind test
      </h1>

      <Card username="Chaiaurcode" btnText="Visit ME"/>
      <Card />
    </>
  )
}

export default App