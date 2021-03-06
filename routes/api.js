const express = require('express')
const { body: validatorBody, validationResult } = require('express-validator')

const router = express.Router()
const Material = require('../models/material')

router.get('/materials/get_display_data', async (req, res) => {
  try {
    const data = await Material.find()
    res.status(200).json(data)
  } catch (error) {
    res.status(400).send('Error occurred when fetching display data for materials')
  }
})

router.post('/materials/get_material_data', async (req, res) => {
  try {
    const { body } = req
    const { id } = body
    const data = await Material.findOne({ id })
    res.status(200).json(data)
  } catch (error) {
    res.status(400).send(`Error occurred when fetching material data`)
  }
})

router.post('/materials/add_material', async (req, res) => {
  try {
    const { body } = req
    const { id } = body
    await Material.create({ id })
    res.status(200).json(id)
  } catch (error) {
    res.status(400).send('Error occurred when creating new material')
  }
})

router.post(
  '/materials/update_material',
  validatorBody('material', 'Invalid material name').notEmpty(),
  validatorBody('color', 'Invalid Color').isHexColor(),
  validatorBody('volume', 'Invalid volume').isFloat({ min: 0 }),
  validatorBody('cost', 'Invalid cost').isFloat({ min: 0 }),
  validatorBody('date', 'Invalid date').notEmpty(),
  async (req, res) => {
    const { errors } = validationResult(req)
    if (errors.length !== 0) {
      res.status(400).send(`${errors[0].msg}`)
      return
    }
    try {
      const { body } = req
      const {
        id, material, color, volume, cost, date,
      } = body

      await Material.updateOne({ id },
        {
          $set:
          {
            material,
            color,
            volume,
            cost,
            date,
          },
        })
      res.status(200).json(`Material succesfully updated.`)
    } catch (error) {
      res.status(400).send(`Error occurred when updating material ${error.message}`)
    }
  },
)

router.post('/materials/delete_material', async (req, res) => {
  try {
    const { body } = req
    const { id } = body
    const { material } = await Material.findOne({ id })
    if (!material) {
      res.status(400).send(`Material not found`)
    }
    await Material.deleteOne({ id })
    res.status(200).send(`Material succesfully deleted.`)
  } catch (error) {
    res.status(400).send(`Error occurred when deleting material`)
  }
})

module.exports = router
