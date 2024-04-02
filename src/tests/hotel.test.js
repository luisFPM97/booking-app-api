const request = require('supertest')
const app = require('../app')

let id;
let token;

beforeAll(async () => {
    const res = await request(app).post('/users/login').send({
        email: "luis.pinzon.m.m@gmail.com", 
        password: "123456789", 
    })
    token = res.body.token
})

test('GET/ hotels trae todos los hoteles retorna status 200', async () => {
    const res = await request(app).get('/hotels')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/ hotels crea hotel, retorna estatus 201', async () => {
    const body = {
    name: "Hotel test",
    description: "Descripcion test",
    price: 123,
    address: " Address test",
    lat: 5.5807571,
    lon: -73.3369612
    }
    const res = await request(app).post('/hotels').send(body).set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT/ hotels/:id actualiza hotel por id, retorna estatus 200', async () => {
    const body = {
        address: "address test actualizado"
    }
    const res = await request(app).put(`/hotels/${id}`).send(body).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.Address).toBe(body.Address);
});

test('DELETE/ hotels/:id elimina hotel por id, retorna estatus 204', async () => {
    const res = await request(app).delete(`/hotels/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});