import '../setup.js';
import request from 'supertest';
import app from '../../app.js';

describe('POST /api/auth/register', () => {
    test('creates a player and returns a token', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ name: 'Ali', email: 'ali@example.com', password: 'secret123' });

        expect(res.status).toBe(201);
        expect(res.body.data.token).toEqual(expect.any(String));
        expect(res.body.data.player.email).toBe('ali@example.com');
        expect(res.body.data.player.password).toBeUndefined();
    });

    test('rejects an invalid email', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ name: 'Ali', email: 'not-an-email', password: 'secret123' });

        expect(res.status).toBe(400);
    });
});

describe('POST /api/auth/login', () => {
    beforeEach(async () => {
        await request(app)
            .post('/api/auth/register')
            .send({ name: 'Ali', email: 'ali@example.com', password: 'secret123' });
    });

    test('returns a token on valid credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'ali@example.com', password: 'secret123' });

        expect(res.status).toBe(200);
        expect(res.body.data.token).toEqual(expect.any(String));
    });

    test('rejects a wrong password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'ali@example.com', password: 'wrong-password' });

        expect(res.status).toBe(401);
    });
});
