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

test('GET/ bookings trae los bookings retorna statatus 200', async () => {
    const res = await request(app).get('/bookings').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/ bookings crea booking, retorna status 201', async () => {
    const body = {
        checkIn: "2020-01-04",
        checkOut: "2020-02-04"
    }
    const res = await request(app).post('/bookings').send(body).set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.comment).toBe(body.comment);
});

test('PUT/ bookings/:id actualiza booking por id, retorna status 200', async () => {
    const body = {
        checkIn: "2020-02-04"
    }
    const res = await request(app).put(`/bookings/${id}`).send(body).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
});

test('DELETE/ bookings/:id elimina booking por id, retorna status 204', async () => {
    const res = await request(app).delete(`/bookings/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});