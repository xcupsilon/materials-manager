import React from 'react'

const MaterialBlock = ({ name, color, volume, materialIndex, selectedMaterial, setSelectedMaterial }) => {
  // remove the string quotations of the color
  const matColor = color.replaceAll('"', '')

  // active highlight if the material is selected
  if (materialIndex === selectedMaterial) {
    return (
      <button onClick={e => setSelectedMaterial(materialIndex)} className="flex items-center p-3 border-b-2 bg-active border-border">
        {/* block representing the color */}
        <div className={`rounded-full w-[2.4rem] h-[2.4rem] bg-[${matColor}] mr-4`}>
        </div>
        {/* block representing the name and the volume of the material */}
        <div className="flex-col text-text">
          <div>
            {name}
          </div>
          <div className='text-left text-sm'>
            {volume} m3
          </div>
        </div>
      </button>
    )

  } else {
    return (
      <button onClick={e => setSelectedMaterial(materialIndex)} className="flex items-center p-3 border-b-2 border-border">
        {/* block representing the color */}
        <div className={`rounded-full w-[2.4rem] h-[2.4rem] bg-[${matColor}] mr-4`}>
        </div>
        {/* block representing the name and the volume of the material */}
        <div className="flex-col text-text">
          <div>
            {name}
          </div>
          <div className='text-left text-sm'>
            {volume} m3
          </div>
        </div>
      </button>
    )
  }
}


export default MaterialBlock