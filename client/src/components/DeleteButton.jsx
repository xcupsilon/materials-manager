import React from 'react'
import { BsFillTrashFill } from 'react-icons/bs'

const DeleteButton = ({ hasMaterial, selectedMaterial, deleteMaterial }) => {
  // only allows user to delete when materials exist and there is a currently selected material
  if (hasMaterial && selectedMaterial) {
    return (
      <button onClick={e => deleteMaterial(selectedMaterial)} className="flex items-center px-5 py-2 w-[7rem] bg-red-500 hover:bg-red-400 rounded-full text-white">
        <BsFillTrashFill/>
        <div className='ml-2'>
          Delete
        </div>
      </button>
    )
  } else {
    return (
      <button disabled className="flex items-center px-5 py-2 w-[7rem] rounded-full text-darkened-button-text bg-darkened-button">
        <BsFillTrashFill/>
        <div className='ml-2'>
          Delete
        </div>
      </button>
    )
  }
}

export default DeleteButton