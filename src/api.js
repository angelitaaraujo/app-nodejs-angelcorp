// src/api.js
// Funções de exemplo para a API da AngelCorp
// Estas funções serão testadas pelo Jest e analisadas pelo quality gate

/**
 * Busca um usuário pelo ID
 * @param {Array} users - Lista de usuários
 * @param {Number} id - ID do usuário
 * @returns {Object} Usuário encontrado ou undefined
 */
function getUserById(users, id) {
  return users.find(user => user.id === id);
}

/**
 * Filtra usuários por role (papel)
 * @param {Array} users - Lista de usuários
 * @param {String} role - Role a filtrar
 * @returns {Array} Usuários com a role especificada
 */
function filterUsersByRole(users, role) {
  return users.filter(user => user.role === role);
}

/**
 * Conta quantos usuários têm uma role específica
 * @param {Array} users - Lista de usuários
 * @param {String} role - Role a contar
 * @returns {Number} Quantidade de usuários
 */
function countUsersByRole(users, role) {
  return filterUsersByRole(users, role).length;
}

module.exports = { 
  getUserById, 
  filterUsersByRole, 
  countUsersByRole 
};
