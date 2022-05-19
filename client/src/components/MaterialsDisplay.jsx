import React from 'react';
import MaterialBlock from './MaterialBlock';

const MaterialsDisplay = ({ materials, setSelectedMaterial }) => {
  if (!materials) {
    return (
      <div className="flex gap-4 mt-[1.5rem]">
        <div className="flex flex-col w-[17rem] h-[22rem] justify-center items-center bg-darker-background border-border border-2">
          <div className="italic text-border">
            No Material
          </div>
        </div>
      </div>

    )
  } else {
    return (
      <div className="flex gap-4 mt-[1.5rem]">
        <div className="flex flex-col w-[17rem] h-[22.13rem] bg-darker-background border-border border-2 overflow-auto">
          {materials.map(material => {
            const { material: name, color, volume } = material
            return <MaterialBlock name={name} color={color} volume={volume} setSelectedMaterial={setSelectedMaterial} />
          })}
        </div>
      </div>
    )
  }
}

export default MaterialsDisplay