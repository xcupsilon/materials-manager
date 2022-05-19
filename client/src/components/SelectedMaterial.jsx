import React, { useState } from 'react'
import { ChromePicker } from 'react-color'
import { createUseStyles } from 'react-jss'

const SelectedMaterial = () => {
  const [color, setColor] = useState('#40765B')
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
    setColor(color.hex)
  }

  return (
    <div className="grid grid-cols-2 gap-20 p-10 pt-8 w-[39rem] h-[22.13rem] mt-[1.5rem] rounded-md text-lg text-text bg-dark-background">
      <div className="col-span-1 flex flex-col">
        <label className="font-semibold mb-1">Name</label>
        <input type="text" className="rounded-md bg-form" />
      </div>
      <div className="col-span-1 flex flex-col">
        <label className="font-semibold">Color</label>
        <MaterialColor />
        <div className="mt-4">
          {isPicking && <ChromePicker 
            color={ color }
            onChangeComplete={ onColorChange }
          />}
        </div>

      </div>
    </div>
  )
}

export default SelectedMaterial