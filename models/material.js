const { Schema, model } = require('mongoose')

const materialSchema = new Schema({
  material: { type: String, required: [true, 'Material name is required'], default: 'New Material' },
  color: { type: String, default: '#72d5b9' },
  volume: { type: Number, min: [0, 'Volume can\'t be negative'], default: 0 },
  cost: { type: Number, min: [0, 'Cost can\'t be negative'], default: 0.00 },
  date: { type: Date, default: null },
  id: { type: String, unique: true },
})

const Material = model('Material', materialSchema)

module.exports = Material
