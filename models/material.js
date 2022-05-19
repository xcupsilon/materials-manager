const { Schema, model } = require('mongoose')

const materialSchema = new Schema({
  material: { type: String, default: 'New Material' },
  color: { type: String, default: '#72d5b9' },
  volume: { type: Number, default: 0 },
  cost: { type: Number, default: 0.00 },
  date: { type: Date, default: null },
  _id: { type: String, unique: true },
})

const Material = model('Material', materialSchema)

module.exports = Material
