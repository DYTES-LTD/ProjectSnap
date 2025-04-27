import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './CssFiles/Header.css'

import ColourfulText from '@/components/ui/colourful-text';

gsap.registerPlugin(useGSAP); // register once, outside the component

export default function Header() {
  const container = useRef();
  const container2 = useRef();
  const { contextSafe } = useGSAP({ scope: container });

  useEffect(() => {
    // Option A: delay entire timeline by 0.2s
    const tl = gsap.timeline({ delay: 0.2 });
    tl.from(container2.current, {
      color: 'black',
      x: 0,
      scale: 1,
      opacity: 0,
      duration: 1,
    }).to(container2.current, {
      color: '#E5W604',
      x: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      duration: 1,
    });

    // // Option B: no timeline delay, but delay the first tween:
    // const tl = gsap.timeline();
    // tl.from(container2.current, {
    //   color: 'black',
    //   x: 0,
    //   scale: 1,
    //   opacity: 0,
    //   duration: 1,
    //   delay: 0.2,        // <-- here
    // }).to(/* … */);

    return () => tl.kill();
  }, []); // ← empty deps so it only runs once

  const [val, setVal] = useState(180);
  const onClickGood = contextSafe(() => {
    gsap.from(container.current, {
      x: 500,
      y: 500,
      duration: 2,
      scale: 10,
      rotation: val,
    });
    setVal((v) => (v === 180 ? 360 : 180));
  });

  return (
    <div className="w-full sm:h-10 lg:h-15 mb-2 flex gap-3 p-4 items-center relative bg-gradient-to-r from-purple-100 via-pink-200 to-yellow-200 border-b-1 border-b-slate-100 shadow-blue-100 shadow-xs">
      <div className="header w-14 h-20 absolute top-0 left-6" ref={container} />
      
      <div className="relative z-20" onClick={onClickGood}>
        <img
          src="https://media.tenor.com/Hy1g-wmN76EAAAAi/click-here-down-there.gif"
          alt=""
          className="w-12"
        />
      </div>


      <div
        className="fake ml-1 flex items-center  font-bold lg:text-[2vw] text-xl p-1 text-[#9d9d9d]"
        ref={container2}
      >
        <ColourfulText text="FAKE SNAP GENERATOR" />
      </div>
    </div>

  );
}
