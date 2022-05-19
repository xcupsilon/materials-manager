import React from 'react'
import { createUseStyles } from 'react-jss'

const MaterialBlock = ({ name, color, volume, materialIndex, selectedMaterial, setSelectedMaterial }) => {
  const useStyles = createUseStyles({
    materialColor: {
      backgroundColor: (props) => props.color
    }
  })
  
  const MaterialColor = ({children, ...props}) => {
    const classes = useStyles(props)
    return (
      <div className={`rounded-full w-[2.4rem] h-[2.4rem] ${classes.materialColor} mr-4`}>
        {children}
      </div>
    )
  }

  MaterialColor.defaultProps = {
    color: color
  }

  // active highlight if the material is selected
  if (materialIndex === selectedMaterial) {
    return (
      <button onClick={e => setSelectedMaterial(materialIndex)} className="flex items-center p-3 border-b-2 bg-active border-border">
        {/* block representing the color */}
        <MaterialColor />
        {/* block representing the name and the volume of the material */}
        <div className="flex-col text-text">
          <div>
            {name}
          </div>
          <div className='text-left text-sm'>
            {volume} m³
          </div>
        </div>
      </button>
    )

  } else {
    return (
      <button onClick={e => setSelectedMaterial(materialIndex)} className="flex items-center p-3 border-b-2 border-border">
        {/* block representing the color */}
        <MaterialColor />
        {/* block representing the name and the volume of the material */}
        <div className="flex-col text-text">
          <div>
            {name}
          </div>
          <div className='text-left text-sm'>
            {volume} m³
          </div>
        </div>
      </button>
    )
  }
}


export default MaterialBlock