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
});

test('GET/ cities obtiene ciudades debe retornar status 200', async () => {
    const res = await request(app).get('/cities')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/ cities crea ciudad debe retornar status 201', async () => {
    const body = {
        name: 'Villa de leyva',
        country: 'Colombia',
        countryId: 'CO',
    }
    const res = await request(app).post('/cities').send(body).set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT/ cities/:id actualiza ciudad por su id debe retornar status 200', async () => {
    const body = {
        name: "Villa de leyva Actualizado", 
    }
    const res = await request(app).put(`/cities/${id}`).send(body).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('DELETE/ cities/:id elimina ciudad por su id debe retornar status 204', async () => {
    const res = await request(app).delete(`/cities/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});