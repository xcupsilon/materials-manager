import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

// components
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'
import MaterialsDisplay from './MaterialsDisplay'
import SelectedMaterial from './SelectedMaterial'

const Manager = () => {
  // a list of all the currently available materials
  const [materials, setMaterials] = useState([])

  console.log(materials)

  // the index of the currently selected material (material name)
  const [selectedMaterial, setSelectedMaterial] = useState("")

  // counter to keep track of the numbers of materials available
  const [numMaterials, setNumMaterials] = useState(0)

  // material attributes of the currently selected component
  const [matName, setMatName] = useState('')
  const [matVolume, setMatVolume] = useState(0)
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

  // everytime when materials changes
  useEffect(() => {
    setNumMaterials(materials.length)
  }, [materials])

  const addMaterial = async () => {
    console.log(numMaterials)
    await axios.post('/api/materials/add_material', {numMaterials})
    .then(() => {
      toast(`New Material Added`, {icon: '🪨'})
      retrieveMaterials()
    })
    .catch(error => {
      toast.error(`${error.response.data}`)
    })
  }

  const deleteMaterial = async (selectedMaterial) => {
    await axios.post('/api/materials/delete_material', {selectedMaterial})
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
            <AddButton addMaterial={addMaterial} numMaterials={numMaterials} />
            <DeleteButton deleteMaterial={deleteMaterial} selectedMaterial={selectedMaterial} hasMaterial={materials.length !== 0} />
          </div>

          <MaterialsDisplay materials={materials} selectedMaterial={selectedMaterial} setSelectedMaterial={setSelectedMaterial} />

          <div className="flex justify-between w-[17rem] text-text mt-[1.5rem]">
            <div>
              Total Cost:
            </div>
            <div>
              ${(matCost * matVolume).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Manager