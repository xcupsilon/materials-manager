import React from 'react'

const MaterialBlock = ({ name, color, volume, setSelectedMaterial }) => (
  <button onClick={e => setSelectedMaterial(name)} className="flex items-center p-3 border-b-2 border-border focus:bg-active">
    {/* block representing the color */}
    <div className={`rounded-full w-[2.4rem] h-[2.4rem] bg-[${color.replaceAll('"', '')}] mr-4`}>
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

export default MaterialBlock