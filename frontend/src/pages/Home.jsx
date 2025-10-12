import React from 'react'
import Navbar from '../components/Navbar'
import LoadingScreen from '../components/LoadingScreen'
import ImageCaraousel from '../components/ImageCaraousel'
import { useState } from 'react'

const Home = () => {
const [show,setShow]=useState(true);

      React.useEffect(() => {
    const t = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(t);
  }, [4000]);

  return (
    <>
    {show ?
    <LoadingScreen/> :

    <div
    className='bg-black text-white'>
    <Navbar/> 
    
    <div>
        <ImageCaraousel/>
    </div>
    
    </div>}
    </>
  )
}

export default Home
