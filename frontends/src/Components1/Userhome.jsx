    import Input from './Input';
    import React, { useEffect, useId, useRef, useState } from 'react';
    import { SketchPicker } from 'react-color';
    import { useDispatch, useSelector } from 'react-redux';
    import { chatsInfo } from '../store/chats';
    import Ui from './Ui';


    function Userhome() {
    const dispatch = useDispatch();
    const [iscoloractivated, setiscoloractivated] = useState(false);
    const [i, set_i] = useState(3);
    const [isfooter, setisfooter] = useState(true);
    const [isheader, setisheader] = useState(true);
    const [isFeature, setisFeature] = useState(false);
   


    const [ChatData, setChatData] = useState({
        message: '',
        id: '',
        person: null,
        image: null,
        color: ''
    });

    const [MetaData, setMetaData] = useState({
        name: 'Morey',
        chatday: 'Today',
        time: '10:04',
        height: 60,
        width: 20,
        wifi: false,
              story:false,
        airplanemode:false,
        device: 'Android',
        towersignal: 1
    });
    const id=useId()

    const [Person_counter, setPerson_counter] = useState([
        {
        Person_Name: 'ME',
        id: id,
        color: '#ab0b88',
        nameField: 'me'
        },
        {
        Person_Name: 'Person 2',
        id:id,
        color: '#f90bcf',
        nameField: ''
        }
    ]);

    const [userClicked, setUserClicked] = useState(Person_counter[0]);
    const [color, setColor] = useState(userClicked.color);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const submithandler = (e) => {
        e.preventDefault();

        const newMessage = {
        ...ChatData,
        person: userClicked.Person_Name,
        color: color,
        id:id+userClicked.Person_Name
        };

        dispatch(chatsInfo(newMessage));

        setChatData({
        message: '',
        id: '',
        person: null,
        image: null,
        color: ''
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setChatData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setChatData((prevData) => ({ ...prevData, image: URL.createObjectURL(file) }));
    };

    const person_handler = () => {
        const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

        setPerson_counter((prev) => [
        ...prev,
        {
            Person_Name: `Person ${i}`,
            id: id,
            color: getRandomColor(),
            nameField: ''
        }
        ]);

        set_i((prev) => prev + 1);
    };

    const userClicked_handler = (p) => {
        setUserClicked(p);
        setColor(p.color);
    };



    return (
        <div className='w-[100vw] h- flex justify-center items-center flex-col'>
    
                    <div className='lg:w-[90vw] min-h-[90vh] w-full  flex justify-center items-center lg:flex-row  flex-col '>


                        <div className="left lg:w-[33%] w-full flex items-center justify-center max-h-[98vh] p-4 flex-col bg-white border-1 ">
                                                
        <div className="uifeatures w-full flex justify-center items-center flex-col mb-2">
        <button onClick={(e)=>setisFeature(!isFeature)} className='min-w-fit rounded-xl p-2 hover:bg-black/60 cursor-pointer bg-black text-white'>{isFeature?'Less Options':'More Option'}</button>

        <div>
        {isFeature?(<div className='w-full flex mt-4 flex-col '> 
        <div className='flex flex-row'>
        <div className="parts flex flex-col ">

        <span>Parts:</span>
        <div className='w-full bg-black/20 rounded h-fit flex justify-around items-center mt-2 mb-1'>
        <label htmlFor="hed">Hide Header:</label>
        <input type='checkbox' id='hed' className='ml-2' onClick={()=>setisheader(!isheader)} />
      
                        

        </div>
        <div className='w-full bg-black/20 rounded h-fit flex justify-around items-center mt-2 mb-1'>
        <label htmlFor="fot">Hide Footer:</label>
        <input type='checkbox' id='fot' className='ml-2' onClick={()=>setisfooter(!isfooter)}/>

   


        </div>
        </div>

        <div className="interface flex flex-col justify-between ml-5 ">

        <span>Interface:</span>
        <div className=' flex-row w-full bg-black/20 rounded h-fit flex justify-around items-center mt-2 mb-1'>
        <label htmlFor="hed ml-1">Android:</label>   
        <input type='radio' id='hed' className='ml-2' onChange={(e)=>setMetaData((prev)=>({...prev,[e.target.name]:'Android'}))}  name='device' defaultChecked={true}/>

        </div>
        <div className='flex flex-row justify-center items-center w-full bg-black/20 rounded h-fit mt-2 mb-1'>
        <label htmlFor="fot">Iphone:</label>
        <input type='radio' id='fot'  className='ml-2' onChange={(e)=>setMetaData((prev)=>({...prev,[e.target.name]:'Iphone'}))}  name='device'/>

        
        </div>

        </div>

        </div>
            <div className="clc flex flex-col">

            <div className="clock flex flex-col">
                <label htmlFor="clck">Clock:</label>
                <input type="text" value={MetaData.time} onChange={(e)=>setMetaData((prev)=>({...prev,[e.target.name]:e.target.value}))}  name="time" className='w-full h-[5vh] bg-black/10 border-1 border-black/40 rounded p-1' placeholder='enter time' id='clck' />
            </div>

            <div>
            <div className="flex flex-col items-center mb-1">
                <label className='w-full bg-black/20 rounded h-fit flex justify-around items-center mt-2 mb-1'>Select Tower Level (1 to 5)</label>
                <input
                type="range"
                min="1"
                name='towersignal'
                max="5"
                value={MetaData.towersignal}
                onChange={(e)=>setMetaData((prev)=>({...prev,[e.target.name]:e.target.value}))}
                className="w-74 accent-black"
                />
            </div>
            </div>
            </div>
            <div className="HW">
            <div className="flex flex-col gap-4">
  {/* Height Range */}
  <label htmlFor="height-range" className='w-full bg-black/20 rounded h-fit flex justify-around items-center'>Height: {MetaData.height}</label>
  <input
    type="range"
    min={70}
    max={90} // adjust as per your desired range
    value={MetaData.height}
    name="height"
    id="height-range"
    onChange={(e) =>
      setMetaData((prev) => ({
        ...prev,
        [e.target.name]: Number(e.target.value),
      }))
    }
    className="w-full h-[5vh] bg-black/10 border border-black/20 rounded p-1"
  />

  {/* Width Range */}
  <label htmlFor="width-range" className='w-full bg-black/20 rounded h-fit flex justify-around items-center'>Width: {MetaData.width}</label>
  <input
    type="range"
    min={17}
    max={40}
    value={MetaData.width}
    name="width"
    id="width-range"
    onChange={(e) =>
      setMetaData((prev) => ({
        ...prev,
        [e.target.name]: Number(e.target.value),
      }))
    }
    className="w-full h-[5vh] bg-black/10 border border-black/20 rounded p-1"/>

  {/* Battery Charging Checkbox */}
  <div className='w-full bg-black/20 rounded h-fit flex justify-around items-center'>
  <label htmlFor="wifi">WIFI-ON:</label>
  <input
    type="checkbox"
    name="wifi"
    id="wifi"
    checked={MetaData.wifi}
    onChange={(e) =>
      setMetaData((prev) => ({
        ...prev,
        [e.target.name]: e.target.checked,
      }))
    }
  />

<label htmlFor="airplanemode">AeroPlane-Mode:</label>
  <input
    type="checkbox"
    name="airplanemode"
    id="airplanemode"
    checked={MetaData.airplanemode}
    onChange={(e) =>
      setMetaData((prev) => ({
        ...prev,
        [e.target.name]: e.target.checked,
      }))
    }
  />
  </div>





  <div className='w-full bg-black/20 rounded h-fit flex justify-around items-center'>

<label htmlFor="story">Story-Activate:</label>
  <input
    type="checkbox"
    name="story"
    id="story"
    checked={MetaData.story}
    onChange={(e) =>
      setMetaData((prev) => ({
        ...prev,
        [e.target.name]: e.target.checked,
      }))
    }
  />
  </div>



</div>

                <div>
                    
                </div>
            </div>

        </div>):''}
        </div>
        </div>
                        <div className='w-full overflow-y-auto'>
                        <form action="" onSubmit={submithandler} className='w-full p-3 flex justify-center flex-1 items-center flex-col   overflow-x-hidden '>
                                <Input classname=' h-[6vh] ' name={"name"} label={"Direct message with"} value={typeof MetaData.name === "string" ? MetaData.name : ""}
                            onChange={(e)=>setMetaData((prev)=>({...prev,name:e.target.value}))}  />
                                <Input classname=' h-[6vh]' label={"Chat day"} name={"chatday"} value={MetaData.chatday}  onChange={(e)=>setMetaData((prev)=>({...prev,chatday:e.target.value}))} />

                                <div className='w-full mt-1 ml-4 grid grid-cols-5  text-sm  max-h-[14vh] overflow-y-auto p-4 '>
                                    {Person_counter.map((p,i) => (<div key={p.Person_Name} className={`w-[80%] text-center rounded justify-center ${selectedIndex === i ? 'bg-black hover:bg-black text-white' : " hover:bg-black/50"} focus:bg-amber-800 items-center p-1 h-[6vh] flex-row flex  hover:text-white`}
                                        onClick={() => {userClicked_handler(p)
                                            setSelectedIndex(i)
                                        }}>
                                        {p.Person_Name == 'ME' ? 'Person 1' : p.Person_Name}
                                    </div>))}
                                    <span className='block p-2  h-[6vh]  text-center bg-white hover:bg-black/60 hover:text-white text-l' onClick={person_handler}>+</span>
                                </div>


                                <div className='w-[90%] h-full flex-1 flex flex-col justify-between items-center border-1 rounded border-black/40 p-2'>
                                    <span className='font-bold' >Choose Color</span>
                                    
                                    <div className='bg-white flex  w-[98%] justify-center items-center border-2 p-2 border-black/40 mt-2 font-bold rounded '>

                                        <div style={{ backgroundColor: color }} className="w-[86%] h-[1.7vh] mt-1 border-1   " onClick={() => setiscoloractivated(!iscoloractivated)}></div>

                                        {iscoloractivated && <div className='absolute top-70'>
                                            <SketchPicker color={color} onChange={(updatedColor) => setColor(updatedColor.hex)} className='' />
                                            <button onClick={() => setiscoloractivated(false)} className='z-40 sticky bg-white hover:bg-black text-black hover:text-white border-1 p-2'>OK</button>
                                        </div>}
                                    </div>
                                    <label htmlFor="Person Name">Person Name</label>
                                    <input label={"Person Name"} id='Person Name' className='border-2 w-full h-8 border-black/40 rounded' name={"Person Name"} value={userClicked?.Person_Name ?? ChatData.person} onChange={(e) => setUserClicked((prev) => ({ ...prev, Person_Name: e.target.value }))} />
                                    <label htmlFor="" className='font-bold'>Message</label>
                                    <input type="text" className='w-full h-15 border-2 p-1 flex  items-start border-black/40 rounded-xl' name='message' value={ChatData.message} onChange={handleInputChange} />
                                    <label htmlFor="" className='font-bold'>Import an image or video</label>
                                    <div className='w-full h-[5vh] p-1 border-2 bg-sky-100 rounded border-black/50'>
                                    
                                        <input label={"Import an image or video"} type='file' name='image' onChange={handleFileChange} />
                                    </div>
                                    <button className='w-full h-[5vh] bg-black text-white'>Add Message</button>
                                </div>

                            </form>
                        </div>

                        </div>
                        <div className=" right flex flex-col lg:max-w-[50vw] w-full h-screen ml-1 justify-center items-center">
                            <Ui MetaData={MetaData} isheader={isheader} isfooter={isfooter}/>
                        
                        </div>
                        

                    </div>

                </div>
    );
    }

    export default Userhome;
