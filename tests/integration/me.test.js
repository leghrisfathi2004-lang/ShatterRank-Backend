import '../setup.js';
import request from 'supertest';
import app from '../../app.js';

describe('GET /api/players/me', () => {
    test('rejects without a token', async () => {
        const res = await request(app).get('/api/players/me');
        expect(res.status).toBe(401);
    });

    test('returns the authenticated player', async () => {
        const reg = await request(app)
            .post('/api/auth/register')
            .send({ name: 'Ali', email: 'ali@example.com', password: 'secret123' });
        const token = reg.body.data.token;

        const res = await request(app)
            .get('/api/players/me')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.email).toBe('ali@example.com');
        expect(res.body.data.password).toBeUndefined();
    });
});
