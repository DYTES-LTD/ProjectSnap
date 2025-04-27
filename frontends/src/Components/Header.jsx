  import React, { useEffect, useState } from 'react'

  import './CssFiles/Header.css'
  import { useRef } from "react";
  import gsap from "gsap";
  import { useGSAP } from "@gsap/react";


function Header() {
    const container = useRef();
  const container2=useRef();
  const { contextSafe } = useGSAP({scope: container});

  useEffect(()=>{
 let g=gsap.timeline()
      g.from(container2.current, {
        color:'black',
        x:-2300,
        duration:1,
      
        scale:1,
      });

      g.to(container2.current, {
        color:'#E5W604',
        x:0,
        rotate:0,
      
        scale:1,
      });
     

      return ()=>g.kill()
  })

   

    gsap.registerPlugin(useGSAP); 
    const [val,setval]=useState(180)
    const onClickGood = contextSafe(() => {
      gsap.from(container.current, {
        x:500,
        y:500,
        duration:2,
        scale:10,
        
        rotation: val});
      if(val==180){
        setval(360)
      }else setval(180)
     
  });
  return (
    <div className=' w-full sm:h-10 lg:h-15  mt-2 p-2 mb-2 flex flex-row   items-center '>
    <div className='header w-14 h-16 absolute  ' ref={container}></div>
   <div className='relative  left-[-60px] '  onClick={onClickGood}> <img src='https://media.tenor.com/Hy1g-wmN76EAAAAi/click-here-down-there.gif' alt="" className='w-25' /></div>
    <div className='fake ml-1 relative left-[-60px] font-bold  lg:text-[2vw] text-xl  p-1  text-[#9d9d9d] ' ref={container2}>FAKE SNAP GENERATOR</div>
  </div>
  )
}

export default Header
