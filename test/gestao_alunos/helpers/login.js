import request from 'supertest';

export async function fazerLogin(credenciais) {
  const resposta = await request(process.env.API_URL)
    .post('/api/auth/login')
    .send({
      email: credenciais.email,
      senha: credenciais.senha
    });

  if (resposta.status !== 200 || !resposta.body.token) {
    throw new Error(
      `Falha no login. Status: ${resposta.status}. ` +
      `Resposta: ${JSON.stringify(resposta.body)}`
    );
  }

  return resposta.body;
}