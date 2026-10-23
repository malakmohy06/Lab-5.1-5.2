const userModel = require('../models/userModel');
function isValidUserBody(body) {
  return (
    body !== null &&
    typeof body === 'object' &&
    !Array.isArray(body) &&
    typeof body.name === 'string' &&
    body.name.trim() !== '' &&
    typeof body.email === 'string' &&
    body.email.trim() !== '');}

function isValidId(id) {
  return Number.isSafeInteger(id) && id > 0;}

function getAllUsers(req, res) {
  return res.status(200).json(userModel.getAllUsers());}

function getUserById(req, res) {
  const id = Number(req.params.id);
  if (!isValidId(id)) {
    return res.status(400).json({ message: 'ID must be a positive integer.' });}


  const user = userModel.getUserById(id);
  if (user === null) {
    return res.status(404).json({ message: 'User not found.' });}
  return res.status(200).json(user);}

function createUser(req, res) {
  if (!isValidUserBody(req.body)) {
    return res.status(400).json({ message: 'Name and email must be nonempty strings.' });}


  const user = userModel.createUser(req.body.name.trim(), req.body.email.trim());
  return res.status(201).json(user);}

function updateUser(req, res) {
  const id = Number(req.params.id);

  if (!isValidId(id)) {
    return res.status(400).json({ message: 'ID must be a positive integer.' });}


  if (!isValidUserBody(req.body)) {
    return res.status(400).json({ message: 'Name and email must be nonempty strings.' });}

  const user = userModel.updateUser(id, req.body.name.trim(), req.body.email.trim());
  if (user === null) {
    return res.status(404).json({ message: 'User not found.' });}
  return res.status(200).json(user);}

function deleteUser(req, res) {
  const id = Number(req.params.id);
  if (!isValidId(id)) {
    return res.status(400).json({ message: 'ID must be a positive integer.' });}

  const deleted = userModel.deleteUser(id);

  if (!deleted) {
    return res.status(404).json({ message: 'User not found.' });}

  return res.status(200).json({ message: 'User deleted successfully.' });}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser};
