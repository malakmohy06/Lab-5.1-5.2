function validateTrip(req, res, next) {
  const body = req.body;
  if (
    body === null ||
    typeof body !== 'object' ||
    Array.isArray(body) ||
    typeof body.destination !== 'string' ||
    body.destination.trim() === '' ||
    typeof body.country !== 'string' ||
    body.country.trim() === '' ||
    !Number.isFinite(body.cost) ||
    body.cost <= 0
  ) {
    return res.status(400).json({
      message: 'Destination and country must be nonempty strings. Cost must be a positive number.'}); }

  next();}

module.exports = validateTrip;
