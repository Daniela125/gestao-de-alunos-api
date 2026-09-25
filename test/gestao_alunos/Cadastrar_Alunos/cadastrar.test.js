import { expect } from 'chai';
import request from 'supertest';
import app from '../../../src/app.js';
import { fazerLogin } from '../helpers/loginAdmin.js';

/*
describe('Login', () => {
  it('deve retornar 200 quando o usuário e a senha forem corretos', async () => {
    const loginResposta = await request(app)
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'admin@escola.com',
        senha: 'admin123',
      });

    expect(loginResposta.status).to.equal(200);
  });

  it('deve retornar 401 quando o usuário e a senha forem incorretos', async () => {
    const loginResposta = await request(app)
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'admin@escola.com',
        senha: 'admin12354',
      });

    expect(loginResposta.status).to.equal(401);
  });
});
*/

describe('Cadastrar Alunos', () => {
  it('deve retornar 200 quando cadastrar alunos corretos', async () => {
    const token = await fazerLogin();

    const cadastroResposta = await request(app)
      .post('/api/admin/alunos')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
       "nome": "Souza",
       "email": "maria.souza@example.com",
       "matricula": "2024003",
       "senha": "123458"
      });

    expect(cadastroResposta.status).to.equal(200);
  });
});
