import React, { useEffect, useId, useRef, useState } from 'react';
import './Ui.css';
import { useSelector } from 'react-redux';
import SS from './SS';
import html2canvas from 'html2canvas-pro';
import {v4 as uuid} from 'uuid';

function Ui({MetaData, isheader, isfooter,iswifi}) {
  const selector = useSelector((state) => state.chatsInfo);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const divRef = useRef();
  

  const [dummydata, setdummydata] = useState([
    {
      person: "Jack",
      messages: [
        { contentmsg: "hii", contentimg: "", typemsg: 'text' },
        { contentmsg: "How are You", contentimg: "", typemsg: 'text' },
      ],
      id: "etf",
      color: '#FF0000',
    },
    {
      person: "Scoot",
      messages: [
        { contentmsg: "Hello", contentimg: "", typemsg: 'text' },
        { contentmsg: "I am Fine", contentimg: "", typemsg: 'text' },
      ],
      id: "etfe",
      color: '#FA2A55',
    }
  ]);

  const handledrag = () => {
    const updatedItems = [...Pdetails];

    let itm1 = dragItem.current;
    let itm2 = dragOverItem.current;

    const temp = updatedItems[itm1];
    updatedItems[itm1] = updatedItems[itm2];
    updatedItems[itm2] = temp;

    setPdetails(updatedItems);
  };

  useEffect(() => {
    console.log(MetaData);
  }, [MetaData]);

  const id = useId();

  const groupMessages = (messages) => {
    const grouped = [];
    let currentGroup = null;

    messages.forEach((msg) => {
      if (!currentGroup || currentGroup?.person !== msg?.person) {
        if (currentGroup) grouped.push(currentGroup);

        currentGroup = {
          person: msg?.person,
          color: msg?.color,
          messages: [msg],
          id: id + msg?.person, // unique ID for rendering
        };
      } else {
        currentGroup?.messages.push(msg);
      }
    });

    if (currentGroup) grouped.push(currentGroup);

    return grouped;
  };

  const handleScreenshot = async () => {
    if (!divRef.current) return;

    const canvas = await html2canvas(divRef.current, {
      useCORS: true, // If you're loading external images
      backgroundColor: null, // To keep transparency
      logging: false,
    });

    const image = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = image;
    link.download = 'screenshot.png';
    link.click();
  };

  const [Pdetails, setPdetails] = useState([{}]);

  useEffect(() => {
    if (selector.id === undefined) return;

    setPdetails((prev) => {
      const lastGroup = prev[prev.length - 1];
      const newMessage = {
        typemsg: selector.image ? 'image' : 'text',
        contentmsg: selector.message || '',
        contentimg: selector.image || '',
      };

      if (lastGroup && lastGroup.id === selector.id) {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...lastGroup,
          messages: [...lastGroup.messages, newMessage],
        };
        return updated;
      } else {
        const newEntry = {
          id: selector.id,
          person: selector?.person,
          color: selector.color,
          messages: [newMessage],
        };
        return [...prev, newEntry];
      }
    });
  }, [selector]);

  return (
   <div className='ssclass w-full h-full mt-1 p-2'>
     <div className=" w-full flex justify-center items-center flex-col">
    <div className=' flex flex-row justify-between w-[90%] '>
    <div className='  border-1 border-black/40 p-1 font-bold w-30 mb-1' >Live Preview</div>
      
      










      <a href="https://www.buymeacoffee.com/saurabh007007" className='lg:w-[12vw] w-40 '><img
src="https://img.buymeacoffee.com/button-api/?text=Buy me a
coffee&emoji=&slug=saurabh007007&button_colour=FFDD00&font_colour=0000
00&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>

    </div>
    <div
        className="bg-white w-full flex flex-col items-center sm:w-[100vw]"
        style={{
          height: `${MetaData.height>65?MetaData.height:70}vh`,
          width: `${MetaData.width}vw`,
          minHeight: '60vh',
          minWidth: '310px', // good for most mobile screens
          maxWidth: '100vw', // ensure it doesn't overflow
        }}
        ref={divRef}>

        
        <div className="w-full h-full flex flex-col">
          {/* Navbar */}
          {isheader && (
            <nav className="w-full flex-col flex border-b max-h-[12vh] border-black/30">
              <div className="w-full flex flex-row p-2 items-center">
                <span className="font-bold text-sm ml-3 w-full">{MetaData.time ?? '10:04'}</span>
                <div>
                  <div className="flex-1 flex flex-row items-center w-full">
                  {!MetaData.airplanemode?<div className="flex flex-row gap-[2px] items-end rounded-xl p-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-[3px] h-[4px] rounded-xl transition-all duration-300
                            ${MetaData.towersignal >= level ? 'bg-black' : 'bg-black/30'}
                          `}
                          style={{ minHeight: `${level * 2 + 2}px` }}
                        />
                      ))}
                    </div>:<div className='airplanemode w-[14px] ml-1 mr-1 h-[14px]'></div>}
                    {MetaData.wifi&&<div className='wifi w-[13px] h-[14px] ml-1 mr-1'></div>}
                    {!MetaData.wifi&&!MetaData.airplanemode&&<span className="text-xs">5G</span>}
                    {MetaData.device === 'Android' && (
                      <span className="battery w-[25px] lg:w-[2vw] lg:h-[2.5vh] h-[20px] md:w-[30px] flex justify-end"></span>
                    )}
                    {MetaData.device === 'Iphone' && (
                      <span className="iphonebattery w-[25px] lg:w-[1.6vw] ml-1 lg:h-[2.5vh] h-[20px] md:w-[30px] flex justify-end"></span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-1">
                <div className="flex flex-row items-center justify-between p-1 w-1/3">
                  <div className="leftarrow min-w-[20px] w-[1vw] h-[1.8vh]"></div>
                  <div className={ `userimage ${MetaData.story?'border-blue-400 border-2 rounded-[50%]':''} lg:w-[5vw] lg:h-[5vh] w-[46px] h-[43px] min-w-[40px]  lg:min-w-[35px] sm:w-[43px] sm:h-[40px] ml-2`}></div>
                  <div className="name ml-2 font-bold overflow-hidden min-w-30">{MetaData.name}</div>
                </div>
                <div className="dailer lg:w-[4vw] lg:h-[2vh] w-[60px] h-[20px] md:w-[7vw] md:h-[7vh] mr-3"></div>
              </div>
            </nav>
          )}

          <div className="w-full text-center text-sm text-black/50">{MetaData.chatday}</div>

          {/* Chat Messages */}
          <div
            className="chats w-full flex-grow lg:min-h-[30vh] lg:max-h-[30vh] min-h-[30vh] space-y-4 px-2 py-2 overflow-y-auto"
            style={{
              maxHeight: `calc(${MetaData.height}vh - ${isheader ? 12 : 0}vh - ${isfooter ? 1 : 0}vh)`,
              
            }}
          >
            {groupMessages(
              (Pdetails.length > 1 ? Pdetails : dummydata)?.flatMap((p) =>
                p.messages?.map((msg) => ({
                  ...msg,
                  person: p?.person,
                  id: p?.id,
                  color: p?.color,
                  groupId: p.groupId,
                }))
              )
            )?.map((group, i) => (
              <div
                key={i + 'dewi'}
                draggable
                onDragStart={(e) => {
                  dragItem.current = i;
                  e.stopPropagation();
                }}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => {
                  dragOverItem.current = i;
                }}
                onDragEnd={handledrag}
              >
                <div className={`mb-2 border-l-[${group.color}]`}>
                  <div
                    className="text-xs font-bold uppercase -space-y-2 tracking-widest mb-1"
                    style={{ color: group.color }}
                  >
                    {group?.person}
                  </div>
                  {group.messages?.map((msg, j) => (
                    <div key={j} className="pl-2" style={{ borderLeft: `2px solid ${group.color}` }}>
                      {msg?.contentimg && msg?.contentimg.trim() !== '' && (
                        <img
                          src={msg.contentimg}
                          alt="media"
                          className="pics w-35 rounded-md max-w-50 p-1 mt-2 mb-2 h-70 object-cover bg-gray-200"
                        />
                      )}
                      {msg?.contentmsg && msg?.contentmsg.trim() !== '' && (
                        <span className="block text-sm">{msg.contentmsg}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          {isfooter && (
            <div className="footer w-full h-[8vh] relative  bottom-0 flex justify-center items-center flex-col">
              <div className="w-full h-full flex flex-row items-center justify-evenly p-1">
                <div className="cameraicon md:w-[100px] md:h-[29px] h-[27px] w-[35px] lg:w-[3vw]"></div>
                <div className="lg:w-[10vw] w-[160px] h-[4vh] md:w-[400px] p-2 border-1 border-black/20 ml-1 mr-1 rounded-2xl flex items-center justify-between">
                  <div className="text-black/40">Chat</div>
                  <div className="micro h-[2.3vh] lg:w-[2vw] md:w-[40px] md:h-17px] w-[20px] ml-1"></div>
                </div>
                <div className="locicon md:w-[100px] md:h-[90px] h-[2.7vh] lg:w-[6vw] w-[90px]"></div>
              </div>

              <div className="w-full justify-center items-center flex h-2">
                <div className="w-1/3 bg-black h-[.5vh] mb-2 rounded-2xl"></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <button onClick={handleScreenshot} className="mb-4 p-2 bg-blue-500 text-white rounded">
        Take Screenshot
      </button>

    </div>
   </div>
  );
}

export default Ui;
