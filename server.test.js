const request = require('supertest')
const MMS = require('mongodb-memory-server')

const { MongoMemoryServer } = MMS
const mongoose = require('mongoose')

const createServer = require('./appserver')
const api = require('./routes/api')

const app = createServer()

app.use('/', api)

const matId = '1'

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri())

  request(app)
    .post('/materials/add_material')
    .send({ id: matId })
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoose.connection.close()
})

describe('post /materials/add_material', () => {
  describe('adding material with unique id', () => {
    it('should respond with 200 status code', async () => {
      await request(app)
        .post('/materials/add_material')
        .send({ id: '2' })
        .expect(200)
    })
  })
})

describe('post /materials/delete_material', () => {
  describe('deleting material with found id', () => {
    it('should respond with 200 status code', async () => {
      await request(app)
        .post('/materials/delete_material')
        .send({ id: '2' })
        .expect(200)
    })
  })

  describe('deleting material with id not found', () => {
    it('should respond with 200 status code', async () => {
      await request(app)
        .post('/materials/delete_material')
        .send({ id: '3' })
        .expect(400)
    })
  })
})

describe('post /materials/update_material', () => {
  describe('valid form input', () => {
    it('should respond with 200 status code', async () => {
      await request(app)
        .post('/materials/update_material')
        .send({
          id: 1, material: 'Gravel', color: '#17171b', volume: 1000, cost: 100, date: new Date('December 17, 2022'),
        })
        .expect(200)
    })
  })

  describe('empty material name', () => {
    it('should respond with 400 status code', async () => {
      await request(app)
        .post('/materials/update_material')
        .send({
          id: 1, material: '', color: '#17171b', volume: 1000, cost: 100, date: new Date('December 17, 2022'),
        })
        .expect(400)
    })
  })

  describe('non-float volume', () => {
    it('should respond with 400 status code', async () => {
      await request(app)
        .post('/materials/update_material')
        .send({
          id: 1, material: '', color: '#17171b', volume: 'one thousand', cost: 100, date: new Date('December 17, 2022'),
        })
        .expect(400)
    })
  })

  describe('negative volume', () => {
    it('should respond with 400 status code', async () => {
      await request(app)
        .post('/materials/update_material')
        .send({
          id: 1, material: '', color: '#17171b', volume: -5000, cost: 100, date: new Date('December 17, 2022'),
        })
        .expect(400)
    })
  })

  describe('non-float cost', () => {
    it('should respond with 400 status code', async () => {
      await request(app)
        .post('/materials/update_material')
        .send({
          id: 1, material: '', color: '#17171b', volume: 1000, cost: 'two hundred dollars', date: new Date('December 17, 2022'),
        })
        .expect(400)
    })
  })

  describe('negative cost', () => {
    it('should respond with 400 status code', async () => {
      await request(app)
        .post('/materials/update_material')
        .send({
          id: 1, material: '', color: '#17171b', volume: 1000, cost: -500, date: new Date('December 17, 2022'),
        })
        .expect(400)
    })
  })
})
