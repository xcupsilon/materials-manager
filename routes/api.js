const express = require('express')

const router = express.Router()
const Material = require('../models/material')

router.get('/materials/get_display_data', async (req, res) => {
  try {
    const data = await Material.find()
    res.json(data)
  } catch (error) {
    res.status(400).send('Error occurred when fetching display data for materials')
  }
})

router.post('/materials/get_material_data', async (req, res) => {
  try {
    const { body } = req
    const { _id } = body
    const data = await Material.findOne({ _id })
    res.json(data)
  } catch (error) {
    res.status(400).send(`Error occurred when fetching material data`)
  }
})

router.post('/materials/add_material', async (req, res) => {
  try {
    const { body } = req
    const { _id } = body
    await Material.create({ _id })
    res.send(`New Material Created`)
  } catch (error) {
    console.log(error)
    res.status(400).send('Error occurred when creating new material')
  }
})

router.post('/materials/update_material', async (req, res) => {
  try {
    const { body } = req
    const {
      _id, material, name, volume, cost, date,
    } = body
    await Material.updateOne({ _id },
      {
        $set:
        {
          material: name,
          volume,
          cost,
          date,
        },
      })
    res.send(`Material ${material} succesfully updated.`)
  } catch (error) {
    res.status(400).send('Error occurred when updating material name')
  }
})

router.post('/materials/delete_material', async (req, res) => {
  try {
    const { body } = req
    const { _id } = body
    await Material.deleteOne({ _id })
    res.send(`Material succesfully deleted.`)
  } catch (error) {
    res.status(400).send(`Error occurred when deleting material`)
  }
})

module.exports = router
