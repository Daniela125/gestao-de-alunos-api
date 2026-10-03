import { expect } from 'chai';
import request from 'supertest';
import { randomUUID } from 'node:crypto';
import app from '../../../src/app.js';
import { fazerLogin } from '../helpers/loginAdmin.js';

describe('Cadastrar Alunos', () => {
  it('deve retornar 201 quando cadastrar um aluno com dados válidos', async () => {
    const token = await fazerLogin();
    const identificador = randomUUID();

    const cadastroResposta = await request(app)
      .post('/api/admin/alunos')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Souza',
        email: `daniela.souza.${identificador}@example.com`,
        matricula: identificador,
        senha: '123458'
      });

    expect(
      cadastroResposta.status,
      `Resposta da API: ${JSON.stringify(cadastroResposta.body)}`
    ).to.equal(201);

    expect(cadastroResposta.body).to.have.property('id');
    expect(cadastroResposta.body.nome).to.equal('Souza');
    expect(cadastroResposta.body.email).to.equal(
      `daniela.souza.${identificador}@example.com`
    );
    expect(cadastroResposta.body.matricula).to.equal(identificador);
    expect(cadastroResposta.body).to.not.have.property('senha');
  });
});