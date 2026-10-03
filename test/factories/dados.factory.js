import { faker } from '@faker-js/faker';

export function criarDadosTeste() {
  const timestamp = Date.now();
  const primeiroNome = faker.person.firstName();
  const sobrenome = faker.person.lastName();

  const emailFaker = faker.internet.email({
    firstName: primeiroNome,
    lastName: sobrenome
  });

  const dominio = process.env.ALUNO_EMAIL_DOMINIO || emailFaker.split('@')[1];
  const emailComTimestamp = `${emailFaker.split('@')[0]}.${timestamp}@${dominio}`;

  return {
    credenciaisAdmin: {
      email: process.env.ADMIN_EMAIL,
      senha: process.env.ADMIN_PASSWORD
    },

    aluno: {
      nome: `${primeiroNome} ${sobrenome}`,
      email: emailComTimestamp,
      matricula: `MAT-${timestamp}`,
      senha: process.env.ALUNO_PASSWORD
    },

    loginInvalido: {
      email: process.env.ADMIN_EMAIL,
      senha: 'senha-incorreta'
    },

    trabalhos: [
      {
        disciplinaId: 'disciplina-matematica',
        titulo: 'Trabalho de Matemática',
        descricao: 'Entrega automatizada de Matemática.'
      },
      {
        disciplinaId: 'disciplina-programacao-web',
        titulo: 'Trabalho de Programação Web',
        descricao: 'Entrega automatizada de Programação Web.'
      }
    ]
  };
}