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
  const [deliveryDate, setDeliveryDate] = useState(new Date())

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

  useEffect(() => {
    const updateMaterial = async () => {
      await axios.post('/api/materials/update_material', {
        id: materials[selectedMaterial].id, material: matName, color: matColor, volume: matVolume, cost: matCost, date: deliveryDate
      })
      .then(() => {
        retrieveMaterials()
        toast.dismiss('update_error');
      })
      .catch(error => {
        toast.error(`${error.response.data}` ,{
          id: 'update_error',
        })
      })
    }

    updateMaterial()
  }, [matName, matColor, matCost, matVolume, deliveryDate])

  const addMaterial = async () => {
    await axios.post('/api/materials/add_material', {id: uuidv4()})
    .then(() => {
      toast(`New Material Added`, {icon: '🪨'})
      retrieveMaterials()
    })
    .catch(error => {
      toast.error(`${error.response.data}`)
    })
  }

  const deleteMaterial = async (selectedMaterial) => {
    await axios.post('/api/materials/delete_material', { id: materials[selectedMaterial].id })
    .then(() => {
      toast.success(`Material Succesfully Deleted`)

      // reset the currently selected material
      setSelectedMaterial(-1)

      retrieveMaterials()
    })
    .catch(error => {
      toast.error(`${error.response.data}`)
    })
  }

  const updateSelectedField = async (index) => {
    setSelectedMaterial(index)
    await axios.post('/api/materials/get_material_data', { id: materials[index].id })
    .then((res) => {
      const { data } = res
      const { material, color, volume, cost, date } = data
      setMatName(material)
      setMatColor(color)
      setMatVolume(volume)
      setMatCost(cost)
      setDeliveryDate(date)
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
            <MaterialsDisplay materials={materials} selectedMaterial={selectedMaterial} updateSelectedField={updateSelectedField} />
            <SelectedMaterial
              name={matName} setMatName={setMatName} color={matColor} setMatColor={setMatColor} volume={matVolume} setMatVolume={setMatVolume}
              cost={matCost} setMatCost={setMatCost} date={deliveryDate} setDeliveryDate={setDeliveryDate} selectedMaterial={selectedMaterial}
            />
          </div> 

          <CostDisplay matCost={matCost} matVolume={matVolume} />
        </div>
      </div>
    </>
  )
}

export default Manager