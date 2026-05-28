// src/__tests__/api.test.js
// Testes para as funções da API da AngelCorp
// Estes testes validam o comportamento esperado e geram métricas de cobertura

const { getUserById, filterUsersByRole, countUsersByRole } = require('../api');

describe('API de usuários', () => {
  // Dados de teste (mock data) - simulam usuários reais
  const mockUsers = [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'user' },
    { id: 3, name: 'Charlie', role: 'user' },
    { id: 4, name: 'Diana', role: 'admin' }
  ];

  describe('getUserById', () => {
    test('deve retornar usuário pelo ID', () => {
      const user = getUserById(mockUsers, 1);
      expect(user.name).toBe('Alice');
      expect(user.role).toBe('admin');
    });

    test('deve retornar undefined se usuário não existe', () => {
      const user = getUserById(mockUsers, 999);
      expect(user).toBeUndefined();
    });

    test('deve retornar o usuário correto mesmo com múltiplos usuários', () => {
      const user = getUserById(mockUsers, 3);
      expect(user.id).toBe(3);
      expect(user.name).toBe('Charlie');
    });
  });

  describe('filterUsersByRole', () => {
    test('deve filtrar usuários por role "user"', () => {
      const users = filterUsersByRole(mockUsers, 'user');
      expect(users.length).toBe(2);
      expect(users[0].name).toBe('Bob');
      expect(users[1].name).toBe('Charlie');
    });

    test('deve filtrar usuários por role "admin"', () => {
      const users = filterUsersByRole(mockUsers, 'admin');
      expect(users.length).toBe(2);
      expect(users[0].name).toBe('Alice');
      expect(users[1].name).toBe('Diana');
    });

    test('deve retornar array vazio se nenhum usuário tem a role', () => {
      const users = filterUsersByRole(mockUsers, 'superadmin');
      expect(users.length).toBe(0);
      expect(Array.isArray(users)).toBe(true);
    });
  });

  describe('countUsersByRole', () => {
    test('deve contar usuários com role "user"', () => {
      const count = countUsersByRole(mockUsers, 'user');
      expect(count).toBe(2);
    });

    test('deve contar usuários com role "admin"', () => {
      const count = countUsersByRole(mockUsers, 'admin');
      expect(count).toBe(2);
    });

    test('deve retornar 0 se nenhum usuário tem a role', () => {
      const count = countUsersByRole(mockUsers, 'superadmin');
      expect(count).toBe(0);
    });
  });
});
