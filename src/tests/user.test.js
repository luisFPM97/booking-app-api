const request = require('supertest')
const app = require('../app')

let id;
let token;

test('POST/ users debe retornar status 201', async () => {
    const body = {
        firstName: "Maria", 
        lastName: "Palacios", 
        email: "maria@gmail.com", 
        password: "maria123", 
        gender: "female"
    }
    const res = await request(app).post('/users').send(body)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
});

test('POST / users/login debe hacer un inicio de sesión retorna status 200', async () => {
    const body = {
        email: "maria@gmail.com", 
        password: "maria123"
    }
    const res = await request(app).post('/users/login').send(body)
    token = res.body.token
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(body.email);
});

test('GET/ users devuelve usuarios retorna status 200', async () => {
    const res = await request(app).get('/users').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT/ users/:id actualiza usuario por su id retorna status 200', async () => {
    const body = {
        firstName: "Maria actualizado", 
    }
    const res = await request(app).put(`/users/${id}`).send(body).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test('POST / users/logininiciar sesión con credenciales incorrectas, retorna status 401', async () => {
    const body = {
        email: "maria@gmail.com", 
        password: "maria1234"
    }
    const res = await request(app).post('/users/login').send(body)
    expect(res.status).toBe(401);
});

test('DELETE/ users/:id elimina usuario por id retorna status 204', async () => {
    const res = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});