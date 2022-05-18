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
    const { material } = body
    const data = await Material.findOne({ material })
    res.json(data)
  } catch (error) {
    res.status(400).send(`Error occurred when fetching material data`)
  }
})

router.post('/materials/add_material', async (req, res) => {
  try {
    const { body } = req
    const { material } = body
    await Material.create({})
    res.send(`New Material Created`)
  } catch (error) {
    res.status(400).send('Error occurred when creating new material')
  }
})

router.post('/materials/update_material_name', async (req, res) => {
  try {
    const { body } = req
    const { material, new_name } = body
    await Material.updateOne({ material },
      {
        $set:
        {
          material: new_name,
        },
      })
    res.send(`${material} name updated to ${new_name}`)
  } catch (error) {
    res.status(400).send('Error occurred when updating material name')
  }
})

module.exports = router
