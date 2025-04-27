import Input from './Input';
import React, { useId, useState } from 'react';
import { SketchPicker } from 'react-color';
import { useDispatch } from 'react-redux';
import { chatsInfo } from '../store/Slice/chats';
import SnapInterFace from './SnapInterFace.jsx';
import './CssFiles/userhome.css'


function Userhome() {
  const dispatch = useDispatch();
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [personCounter, setPersonCounter] = useState(3);
  const [showFooter, setShowFooter] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [showFeatures, setShowFeatures] = useState(false);
  const uniqueId = useId();

  const [chatInputData, setChatInputData] = useState({
    message: '',
    id: '',
    person: null,
    image: null,
    color: ''
  });

  const [uiMetaData, setUiMetaData] = useState({
    name: 'Morey',
    chatday: 'Today',
    time: '10:04',
    height: 60,
    width: 20,
    wifi: false,
    story: false,
    airplanemode: false,
    device: 'Android',
    towersignal: 1
  });

  const [allPersons, setAllPersons] = useState([
    {
      Person_Name: 'ME',
      id: uniqueId,
      color: '#ab0b88',
      nameField: 'me'
    },
    {
      Person_Name: 'Person 2',
      id: uniqueId,
      color: '#f90bcf',
      nameField: ''
    }
  ]);

  const [selectedPerson, setSelectedPerson] = useState(allPersons[0]);
  const [selectedColor, setSelectedColor] = useState(selectedPerson.color);
  const [selectedPersonIndex, setSelectedPersonIndex] = useState(0);

  const submitChatHandler = (e) => {
    e.preventDefault();

    const newChatMessage = {
      ...chatInputData,
      person: selectedPerson.Person_Name,
      color: selectedColor,
      id: uniqueId + selectedPerson.Person_Name
    };

    dispatch(chatsInfo(newChatMessage));

    setChatInputData({
      message: '',
      id: '',
      person: null,
      image: null,
      color: ''
    });
  };

  const handleChatInputChange = (event) => {
    const { name, value } = event.target;
    setChatInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setChatInputData((prevData) => ({ ...prevData, image: URL.createObjectURL(file) }));
    
  };

  const addNewPersonHandler = () => {
    const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

    setAllPersons((prev) => [
      ...prev,
      {
        Person_Name: `Person ${personCounter}`,
        id: uniqueId,
        color: getRandomColor(),
        nameField: ''
      }
    ]);

    setPersonCounter((prev) => prev + 1);
  };

  const handlePersonSelection = (person) => {
    setSelectedPerson(person);
    setSelectedColor(person.color);
  };

  return (
    <div className='w-9/12 flex items-center justify-center'>
      <div className='p-1 h-fit flex justify-center items-center flex-col '>
        <div className='lg:w-[90vw] min-h-[90vh] w-full flex  justify-between items-center lg:gap-8 lg:flex-row flex-col'>
          <div className="left lg:w-[33%] w-full flex items-center justify-center max-h-[98vh] p-6 flex-col bg-slate-100 border-3 rounded-3xl shadow-2xl shadow-slate-300">
            <div className="uifeatures w-full flex justify-center items-center flex-col mb-2">
              <button onClick={() => setShowFeatures(!showFeatures)} data-label="Register" className="rainbow-hover">
                <span className='sp'>{showFeatures ? 'Less Options' : 'More Option'}</span>
              </button>

              <div className=' overflow-y-auto text-slate-600'>
                {showFeatures && (
                  <div className='w-full flex mt-4 flex-col gap-4'>
                    <div className='flex flex-row justify-between mt-2'>
                      <div className="parts flex flex-col">
                        <span>Parts:</span>
                        <div className='w-full bg-slate-300 rounded-md h-fit px-3 py-2 flex justify-around items-center mt-2 mb-1'>
                          <label htmlFor="header" >Hide Header:</label>
                          <input type='checkbox' id='header' className='ml-2' onClick={() => setShowHeader(!showHeader)} />
                          
                        </div>
                        <div className='w-full bg-slate-300 rounded-md h-fit px-3 py-2 flex justify-around items-center mt-2 mb-1'>
                          <label htmlFor="footer">Hide Footer:</label>
                          <input type='checkbox' id='footer' className='ml-2' onClick={() => setShowFooter(!showFooter)} />
                        </div>
                      </div>

                      <div className="interface flex flex-col items-center justify-between ml-5">
                        <span>Interface:</span>
                        <div className='flex-row w-full bg-slate-300 rounded-md h-fit px-3 py-2 flex justify-around items-center mt-2 mb-1'>
                          <label htmlFor="android">Android:</label>
                          <input type='radio' id='android' className='ml-2' onChange={(e) => setUiMetaData((prev) => ({ ...prev, [e.target.name]: 'Android' }))} name='device' defaultChecked={true} />
                        </div>
                        <div className='flex flex-row justify-center items-center w-full px-3 py-2 bg-slate-300 rounded-md h-fit mt-2 mb-1'>
                          <label htmlFor="iphone">iPhone:</label>
                          <input type='radio' id='iphone' className='ml-2' onChange={(e) => setUiMetaData((prev) => ({ ...prev, [e.target.name]: 'iPhone' }))} name='device' />
                        </div>
                      </div>
                    </div>

                    <div className="clock-settings flex flex-col">
                      <label htmlFor="clock-time">Clock:</label>
                      <input type="text" value={uiMetaData.time} onChange={(e) => setUiMetaData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} name="time" 
                      className='w-full h-[3vh] bg-slate-300 border-1 border-black/40 rounded-md p-4' placeholder='Enter time' id='clock-time' />
                    </div>

                    <div className="tower-settings flex flex-col items-center mb-1">
                      <label className='w-full bg-slate-300 rounded-md h-fit p-2 flex justify-around items-center mt-1 mb-1'>Select Tower Level (1 to 5)</label>
                      <input
                        type="range"
                        min="1"
                        name='towersignal'
                        max="5"
                        value={uiMetaData.towersignal}
                        onChange={(e) => setUiMetaData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                        className="w-74 accent-slate-300"
                      />
                    </div>

                    <div className="dimensions-settings flex flex-col gap-2">
                      <div>
                        <label htmlFor="height-range" className='w-full bg-slate-300 p-1 rounded-md h-fit flex justify-around items-center'>Height: {uiMetaData.height}</label>
                        <input
                          type="range"
                          min={75}
                          max={90}
                          value={uiMetaData.height}
                          name="height"
                          id="height-range"
                          onChange={(e) => setUiMetaData((prev) => ({ ...prev, [e.target.name]: Number(e.target.value) }))}
                          className="w-full h-[3vh] bg-black/10 border border-black/20 rounded p-1"
                        />
                      </div>

                      <div>
                        <label htmlFor="width-range" className='w-full bg-slate-300 p-1 rounded-md h-fit flex justify-around items-center'>Width: {uiMetaData.width}</label>
                        <input
                          type="range"
                          min={17}
                          max={40}
                          value={uiMetaData.width}
                          name="width"
                          id="width-range"
                          onChange={(e) => setUiMetaData((prev) => ({ ...prev, [e.target.name]: Number(e.target.value) }))}
                          className="w-full h-[5vh] bg-black/10 border border-black/20 rounded p-1"
                        />
                      </div>

                      <div className='w-full bg-slate-300 p-2 rounded-md h-fit flex justify-around items-center'>
                        <label htmlFor="wifi">WIFI-ON:</label>
                        <input type="checkbox" name="wifi" id="wifi" checked={uiMetaData.wifi} onChange={(e) => setUiMetaData((prev) => ({ ...prev, [e.target.name]: e.target.checked }))} />

                        <label htmlFor="airplanemode">Airplane-Mode:</label>
                        <input type="checkbox" name="airplanemode" id="airplanemode" checked={uiMetaData.airplanemode} onChange={(e) => setUiMetaData((prev) => ({ ...prev, [e.target.name]: e.target.checked }))} />
                      </div>

                      <div className='w-full bg-slate-300 p-1 rounded-md h-fit flex justify-around items-center'>
                        <label htmlFor="story">Story-Activate:</label>
                        <input type="checkbox" name="story" id="story" checked={uiMetaData.story} onChange={(e) => setUiMetaData((prev) => ({ ...prev, [e.target.name]: e.target.checked }))} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='w-full overflow-y-auto'>
              <form onSubmit={submitChatHandler} className='w-full p-3 flex justify-center flex-1 text-slate-600 items-center flex-col overflow-x-hidden'>
                <Input classname='h-[6vh] rounded-xl bg-slate-300' classname2='text-slate-600' name={"name"} label={"Direct message with"} value={typeof uiMetaData.name === "string" ? uiMetaData.name : ""} onChange={(e) => setUiMetaData((prev) => ({ ...prev, name: e.target.value }))} />
                <Input classname='h-[6vh] rounded-xl bg-slate-300' classname2='text-slate-600' label={"Chat day"} name={"chatday"} value={uiMetaData.chatday} onChange={(e) => setUiMetaData((prev) => ({ ...prev, chatday: e.target.value }))} />

                <div className='w-full mt-1 ml-4 grid grid-cols-5 text-sm max-h-[14vh] overflow-y-auto p-4'>
                  {allPersons.map((person, index) => (
                    <div key={person.Person_Name} className={`w-[80%] text-center rounded-md ml-1 justify-center p-8  ${selectedPersonIndex === index ? 'bg-slate-700 hover:bg-slate-700 text-white' : "hover:bg-slate-400"} focus:bg-amber-800 items-center p-1 h-[6vh] flex-row flex hover:text-white`} onClick={() => { handlePersonSelection(person); setSelectedPersonIndex(index); }}>
                      {person.Person_Name === 'ME' ? 'Person 1' : person.Person_Name}
                    </div>
                  ))}
                  <span className=' p-2 h-[6vh] text-center bg-slate-100 hover:bg-slate-400 rounded-md flex justify-center items-center hover:text-white text-lg ml-4' onClick={addNewPersonHandler}>+</span>
                </div>

                <div className='w-[90%] h-full flex-1 flex flex-col justify-between items-center border-1 rounded-xl p-6 border-black/40'>
                  <span className='font-bold'>Choose Color</span>

                  <div className='bg-slate-300 flex w-[98%] justify-center items-center border-2 p-2 border-black/40 mt-2 font-bold rounded-lg mb-3'>
                    <div style={{ backgroundColor: selectedColor }} className="w-[86%] h-[1.7vh] mt-1 border-1" onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}></div>

                    {isColorPickerOpen && (
                      <div className='absolute top-70'>
                        <SketchPicker color={selectedColor} onChange={(updatedColor) => setSelectedColor(updatedColor.hex)} />
                        <button onClick={() => setIsColorPickerOpen(false)} className='z-40 sticky bg-white hover:bg-black text-black hover:text-white border-1 p-2'>OK</button>
                      </div>
                    )}
                  </div>

                  <label htmlFor="Person Name" className='font-bold'>Person Name</label>
                  <input label={"Person Name"} id='Person Name' className='border-2 w-full h-8 border-black/40 rounded-lg p-4 bg-slate-300 mb-3' name={"Person Name"} value={selectedPerson?.Person_Name ?? chatInputData.person} onChange={(e) => setSelectedPerson((prev) => ({ ...prev, Person_Name: e.target.value }))} />

                  <label htmlFor="" className='font-bold'>Message</label>
                  <input type="text" className='w-full h-15 border-2 p-1 flex items-start border-black/40 rounded-xl bg-slate-300 mb-4' placeholder='Write Your Message' name='message' value={chatInputData.message} onChange={handleChatInputChange} />

                  <label htmlFor="" className='font-bold mb-1'>Import an image or video</label>
                  <div className='w-full h-[5vh] p-1 border-2 bg-sky-100 rounded-lg border-black/50 mb-5'>
                    <input label={"Import an image or video"} type='file' name='image' onChange={handleFileUpload} />
                  </div>

                  <button className='w-full h-[5vh] bg-slate-700 rounded-3xl text-blue-100'>Add Message</button>
                </div>
              </form>
            </div>
          </div>

          <div className="right flex flex-col lg:max-w-[50vw] w-full h-screen ml-1 justify-center items-center ">
            <SnapInterFace MetaData={uiMetaData} isheader={showHeader} isfooter={showFooter} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userhome;
