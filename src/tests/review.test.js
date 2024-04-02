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

test('GET/ reviews trae las reviews, retorna status 200', async () => {
    const res = await request(app).get('/reviews').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
});

test('POST/ reviews crea review, retorna status 201', async () => {
    const body = {
        rating: 5,
        comment: "excelent test"
    }
    const res = await request(app).post('/reviews').send(body).set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.comment).toBe(body.comment);
});

test('PUT/ reviews/:id actualiza review por id, retorna status 200', async () => {
    const body = {
        comment: "Excelente test actualizado"
    }
    const res = await request(app).put(`/reviews/${id}`).send(body).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.comment).toBe(body.comment);
});

test('DELETE/ reviews/:id elimina review poe id, retorna status 204', async () => {
    const res = await request(app).delete(`/reviews/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});