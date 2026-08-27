import React, { useEffect, useState } from 'react'
import { useLoaderData, useRouteLoaderData } from 'react-router-dom'
// inport {useLoaderData} from 'react-router-dom'

function GIthub() {

    const data=useLoaderData()

    // const [data,setData]=useState([])

    // useEffect(()=>{
    //     fetch('https://api.github.com/users/Amri-20')
    //     .then(response=>response.json())
    //     .then(data=>{
    //         console.log(data);
    //         setData(data)
    //     })
    // },[])
  return (
    <div className='text-center m-4 bg-black text-white p-4 text-3xl'>GIthub Followers: {data.followers}
    <img  src={data.avatar_url} alt="Git picture" width={300} />
    </div>
  )
}

export default GIthub

export const githubinfoLoader=async()=>{
    const response=await fetch('https://api.github.com/users/Amri-20')
    return response.json()
}