const users = [];
let nextId = 1;

function getAllUsers() {
  return users;}

function getUserById(id) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      return users[i];}}
  return null;}

function createUser(name, email) {
  const user = {
    id: nextId,
    name: name,
    email: email};
  nextId++;
  users.push(user);
  return user;}

function updateUser(id, name, email) {
  const user = getUserById(id);

  if (user === null) {
    return null;}

  user.name = name;
  user.email = email;
  return user;}

function deleteUser(id) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users.splice(i, 1);
      return true;}}
return false;}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser};
