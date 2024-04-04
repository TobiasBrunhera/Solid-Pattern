# App

GymPass style app.

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter os perfil de um usuário logado;
- [ ] Deve ser possível obter u número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obeter o seu histórico de check-ins
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias poelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um  usauário; 
- [ ] Deve ser possível cadastrar uma academia; 

## RNs (Regras de negócios)

- [ ] O usuário não deve poder se cadastrar com um e-mail diplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só poide ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradoers;
- [ ] A academia só pode ser cadastrada por administradores;
## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser indentificado por um JWT (JSON Web Token);