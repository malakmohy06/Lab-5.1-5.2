const tripModel = require('../models/Trip');

function isValidId(id) {
  return Number.isSafeInteger(id) && id > 0;
}

function getAllTrips(req, res) {
  return res.status(200).json(tripModel.getAllTrips());
}

function getTripById(req, res) {
  const id = Number(req.params.id);

  if (!isValidId(id)) {
    return res.status(400).json({ message: 'ID must be a positive integer.' });
  }

  const trip = tripModel.getTripById(id);

  if (trip === null) {
    return res.status(404).json({ message: 'Trip not found.' });
  }

  return res.status(200).json(trip);
}

function createTrip(req, res) {
  const trip = tripModel.createTrip(
    req.body.destination.trim(),
    req.body.country.trim(),
    req.body.cost
  );

  return res.status(201).json(trip);
}

function updateTrip(req, res) {
  const id = Number(req.params.id);

  if (!isValidId(id)) {
    return res.status(400).json({ message: 'ID must be a positive integer.' });
  }

  const trip = tripModel.updateTrip(
    id,
    req.body.destination.trim(),
    req.body.country.trim(),
    req.body.cost
  );

  if (trip === null) {
    return res.status(404).json({ message: 'Trip not found.' });
  }

  return res.status(200).json(trip);
}

function deleteTrip(req, res) {
  const id = Number(req.params.id);

  if (!isValidId(id)) {
    return res.status(400).json({ message: 'ID must be a positive integer.' });
  }

  const deleted = tripModel.deleteTrip(id);

  if (!deleted) {
    return res.status(404).json({ message: 'Trip not found.' });
  }

  return res.status(200).json({ message: 'Trip deleted successfully.' });
}

function compareTrips(req, res) {
  const body = req.body;

  if (
    !body ||
    !isValidId(body.tripId1) ||
    !isValidId(body.tripId2) ||
    body.tripId1 === body.tripId2
  ) {
    return res.status(400).json({ message: 'Provide two different positive integer trip IDs.' });
  }

  // getTripById searches the existing array with a for loop.
  const trip1 = tripModel.getTripById(body.tripId1);
  const trip2 = tripModel.getTripById(body.tripId2);

  if (trip1 === null || trip2 === null) {
    return res.status(404).json({ message: 'Trip not found.' });
  }

  const result = {
    destination1: trip1.destination,
    destination2: trip2.destination,
    costDifference: Math.abs(trip1.cost - trip2.cost),
    cheaperDestination: null
  };

  if (trip1.cost < trip2.cost) {
    result.cheaperDestination = trip1.destination;
  } else if (trip2.cost < trip1.cost) {
    result.cheaperDestination = trip2.destination;
  } else {
    result.message = 'Both trips cost the same. Neither trip is cheaper.';
  }

  return res.status(200).json(result);
}

module.exports = {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  compareTrips
};
