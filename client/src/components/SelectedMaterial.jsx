import React, { useState } from 'react'
import { ChromePicker } from 'react-color'
import { createUseStyles } from 'react-jss'
import DatePicker from 'react-date-picker'

const SelectedMaterial = ({ 
    name, setMatName, color, setMatColor, volume, setMatVolume, cost, setMatCost, date, setDeliveryDate, selectedMaterial
  }) => {
  const [isPicking, setIsPicking] = useState(false)

  const useStyles = createUseStyles({
    materialColor: {
      backgroundColor: (props) => props.color
    }
  })
  
  const MaterialColor = ({children, ...props}) => {
    const classes = useStyles(props)
    return (
      <button onClick={e => setIsPicking(!isPicking)} className={`rounded-full w-[2rem] h-[2rem] ${classes.materialColor}`}>
        {children}
      </button>
    )
  }

  MaterialColor.defaultProps = {
    color: color
  }

  const onColorChange = (color) => {
    setMatColor(color.hex)
  }

  if (selectedMaterial !== -1) {
    return (
      <div className="grid grid-cols-2 gap-x-14 p-10 pt-8 w-[39rem] h-[22.13rem] mt-[1.5rem] rounded-md text-lg text-text bg-dark-background">
        <div className="col-span-1 flex flex-col">
          <label className="font-semibold mb-1">Name</label>
          <input type="text" onChange={e => setMatName(e.target.value)} className="rounded-md p-1 px-3 bg-form" value={name} />
        </div>
  
        <div className="col-span-1 flex flex-col">
          <label className="font-semibold mb-1">Color</label>
          <MaterialColor />
          <div>
            {isPicking && <ChromePicker
              className='absolute mt-4'
              color={ color }
              onChangeComplete={ onColorChange }
            />}
          </div>
        </div>
  
        <div className="col-span-1 flex flex-col">
          <label className="font-semibold mb-1">Volume (m³)</label>
          <input type="text" onChange={e => setMatVolume(e.target.value)} className="rounded-md p-1 px-3 bg-form" value={volume} />
        </div>
  
        <div className="col-span-1 flex flex-col">
          <label className="font-semibold mb-1">Cost (USD per m³)</label>
          <input type="text" onChange={e => setMatCost(e.target.value)} className="rounded-md p-1 px-3 bg-form" value={cost} />
        </div>
  
        <div className="col-span-1 flex flex-col">
          <label className="font-semibold mb-1">Delivery Date</label>
          {/* display date as object if not null */}
          <DatePicker onChange={setDeliveryDate} required value={date ? new Date(date) : null} className="rounded-md p-1 px-3 bg-form" />
        </div>
      </div>
    )
  } else {
    return (
      <div className="grid grid-cols-2 gap-x-14 p-10 pt-8 w-[39rem] h-[22.13rem] mt-[1.5rem] rounded-md text-lg text-text bg-dark-background" />
    )
  }
}

export default SelectedMaterial