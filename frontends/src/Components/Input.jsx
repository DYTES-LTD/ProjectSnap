import React, { useId } from 'react'

function Input({
    classname="",
    classname2="",
    name,
    type='text',
    placeholder='',
    onChange,
    label,
    value="",
}) {
    const id=useId()
  return (
    <div className=' p-1  w-[90%] flex flex-col'>
        
         <label htmlFor={id} className={`${classname2} inline font-bold text-black`}>{label}</label>
        <input type={type} id={id}  name={name} className={`${classname}   p-2 rounded border-2 w-full border-black/40  outline-none`}  placeholder={placeholder } onChange={onChange} value={value} autoComplete="off"  />
       
      
    </div>
  )
}

export default Input
