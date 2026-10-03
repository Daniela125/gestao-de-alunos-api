import { expect } from 'chai';
import request from 'supertest';
import { criarDadosTeste } from '../../factories/dados.factory.js';

describe('POST /api/auth/login', () => {
  it('autentica o administrador com as credenciais do ambiente', async () => {
    const dados = criarDadosTeste();

    const resposta = await request(process.env.API_URL)
      .post('/api/auth/login')
      .send(dados.credenciaisAdmin);

    expect(resposta.status).to.equal(200);
    expect(resposta.body).to.have.property('token');
    expect(resposta.body.usuario.role).to.equal('admin');
  });

  it('rejeita credenciais inválidas', async () => {
    const dados = criarDadosTeste();

    const resposta = await request(process.env.API_URL)
      .post('/api/auth/login')
      .send(dados.loginInvalido);

    expect(resposta.status).to.equal(401);
    expect(resposta.body.error).to.equal('E-mail ou senha inválidos.');
  });
});