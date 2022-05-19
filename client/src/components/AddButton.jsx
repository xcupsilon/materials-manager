import React from 'react'
import { BsPlusLg } from 'react-icons/bs'

const AddButton = ({ addMaterial }) => (
  <button onClick={e => addMaterial()} className="flex items-center px-5 py-2 mr-2 w-24 bg-blue-500 hover:bg-blue-400 rounded-full text-white">
    <BsPlusLg />
    <div className='ml-2'>
      Add
    </div>
  </button>
)

export default AddButton