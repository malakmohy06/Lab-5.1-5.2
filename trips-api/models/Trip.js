// Trips are kept in memory. Restarting the server clears this array.
const trips = [];
let nextId = 1;
function getAllTrips() {
  return trips;}

function getTripById(id) {
  for (let i = 0; i < trips.length; i++) {
    if (trips[i].id === id) {
      return trips[i];}}
  return null;}

function createTrip(destination, country, cost) {
  const trip = {
    id: nextId,
    destination: destination,
    country: country,
    cost: cost};
  nextId++;
  trips.push(trip);
  return trip;}

function updateTrip(id, destination, country, cost) {
  const trip = getTripById(id);
  if (trip === null) {
    return null;}
  trip.destination = destination;
  trip.country = country;
  trip.cost = cost;
  return trip;}

function deleteTrip(id) {
  for (let i = 0; i < trips.length; i++) {
    if (trips[i].id === id) {
      trips.splice(i, 1);
      return true;}}
  return false;}

module.exports = {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip
};
