import request from 'supertest';
import app from '../../../src/app.js';

export async function fazerLogin(credenciais = {
  email: 'admin@escola.com',
  senha: 'admin123',
}) {
  const resposta = await request(app)
    .post('/api/auth/login')
    .set('Content-Type', 'application/json')
    .send(credenciais);

  return resposta.body.token;
}