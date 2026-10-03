import { expect } from 'chai';
import request from 'supertest';
import { criarDadosTeste } from '../../factories/dados.factory.js';
import { fazerLoginAdmin } from '../helpers/loginAdmin.js';
import { fazerLoginAluno } from '../helpers/loginAluno.js';

describe('Fluxo de cadastro e entrega do aluno', () => {
  it('cadastra o aluno, faz login e registra os trabalhos', async () => {
    const dados = criarDadosTeste();

    const loginAdmin = await fazerLoginAdmin(dados.credenciaisAdmin);
    const tokenAdmin = loginAdmin.token;

    const cadastro = await request(process.env.API_URL)
      .post('/api/admin/alunos')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(dados.aluno);

    expect(cadastro.status, JSON.stringify(cadastro.body)).to.equal(201);
    expect(cadastro.body).to.have.property('id');
    expect(cadastro.body.nome).to.equal(dados.aluno.nome);
    expect(cadastro.body.email).to.equal(dados.aluno.email);
    expect(cadastro.body.matricula).to.equal(dados.aluno.matricula);
    expect(cadastro.body).to.not.have.property('senha');

    const loginAluno = await fazerLoginAluno(dados.aluno);
    expect(loginAluno.usuario.role).to.equal('aluno');

    for (const trabalho of dados.trabalhos) {
      const matricula = await request(process.env.API_URL)
        .post(`/api/admin/disciplinas/${trabalho.disciplinaId}/matriculas`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({ alunoId: cadastro.body.id });

      expect(matricula.status, JSON.stringify(matricula.body)).to.equal(201);

      const entrega = await request(process.env.API_URL)
        .post(`/api/alunos/${cadastro.body.id}/trabalhos`)
        .set('Authorization', `Bearer ${loginAluno.token}`)
        .send(trabalho);

      expect(entrega.status, JSON.stringify(entrega.body)).to.equal(201);
      expect(entrega.body.alunoId).to.equal(cadastro.body.id);
      expect(entrega.body.disciplinaId).to.equal(trabalho.disciplinaId);
      expect(entrega.body.titulo).to.equal(trabalho.titulo);
    }
  });
});