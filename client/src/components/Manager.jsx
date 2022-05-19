import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import { v4 as uuidv4 } from 'uuid';

// components
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'
import MaterialsDisplay from './MaterialsDisplay'
import SelectedMaterial from './SelectedMaterial'
import CostDisplay from './CostDisplay'

const Manager = () => {
  // a list of all the currently available materials
  const [materials, setMaterials] = useState([])

  // the index of the currently selected material (material index)
  const [selectedMaterial, setSelectedMaterial] = useState(-1)

  // material attributes of the currently selected component
  const [matName, setMatName] = useState('')
  const [matVolume, setMatVolume] = useState(0)
  const [matColor, setMatColor] = useState('')
  const [matCost, setMatCost] = useState(0)
  const [deliveryDate, setDeliveryDate] = useState(null)

  const retrieveMaterials = async () => {
    await axios.get('/api/materials/get_display_data')
    .then(res => {
      setMaterials(res.data)
    })
    .catch(error => {
      toast.error(`${error.response.data}`)
    })
  }

  useEffect(() => {
    retrieveMaterials()
  }, [])

  const addMaterial = async () => {
    await axios.post('/api/materials/add_material', {_id: uuidv4()})
    .then(() => {
      toast(`New Material Added`, {icon: '🪨'})
      retrieveMaterials()
    })
    .catch(error => {
      toast.error(`${error.response.data}`)
    })
  }

  const deleteMaterial = async (selectedMaterial) => {
    await axios.post('/api/materials/delete_material', { _id: materials[selectedMaterial]._id })
    .then(() => {
      toast.success(`Material Succesfully Deleted`)

      // reset the currently selected material
      setSelectedMaterial('')

      retrieveMaterials()
    })
    .catch(error => {
      toast.error(`${error.response.data}`)
    })
  }

  return (
    <>
      <div className="w-screen h-screen bg-background">
        <div className="flex flex-col pt-[4rem] px-[12rem]">
          <h1 className="mb-[2rem] font-semibold text-4xl text-text">
            Materials
          </h1>

          <div className="flex">
            <AddButton addMaterial={addMaterial} />
            <DeleteButton deleteMaterial={deleteMaterial} selectedMaterial={selectedMaterial} hasMaterial={materials.length !== 0} />
          </div>

          <div className="flex gap-6">
            <MaterialsDisplay materials={materials} selectedMaterial={selectedMaterial} setSelectedMaterial={setSelectedMaterial} />
            <SelectedMaterial />
          </div> 

          <CostDisplay matCost={matCost} matVolume={matVolume} />
        </div>
      </div>
    </>
  )
}

export default Manager