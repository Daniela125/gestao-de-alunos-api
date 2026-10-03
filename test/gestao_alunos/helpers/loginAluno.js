import { fazerLogin } from './login.js';

export async function fazerLoginAluno(aluno) {
  return fazerLogin({
    email: aluno.email,
    senha: aluno.senha
  });
}