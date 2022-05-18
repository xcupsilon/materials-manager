const { Schema, model } = require('mongoose')

const materialSchema = new Schema({
  material: {
    type: String, required: true, unique: true, default: 'New Material',
  },
  volume: { type: Number, default: 10000 },
  cost: { type: Number, default: 0.10 },
  date: { type: Date },
})

const Material = model('Material', materialSchema)

module.exports = Material
