# Trips API - Lab 5.2

This extends the basic Trips API in the existing trips-api folder.

## Install the update and run

Extract the ZIP contents into your existing trips-api folder and replace matching files.
The new middleware folder belongs beside controllers, models, and routes.
Stop any server using port 3000 with Ctrl+C. In the trips-api terminal, run:

```powershell
npm.cmd install
npm.cmd start
```

The base URL is http://localhost:3000/trips.
Trips are stored in memory, so restarting clears them.

## What changed

1. middleware/verifyAdmin.js checks the x-role header. Only the exact value admin allows creating, updating, or deleting trips. Otherwise it returns 403 with {"message":"Admin access required"}.
2. compareTrips in controllers/tripController.js compares two existing trips without changing them.
3. middleware/validateTrip.js checks destination, country, and cost before creating a trip. It also preserves the same validation on updates.
4. middleware/logRequest.js prints each Trips request's method and full URL, then calls next().

The router applies the admin check before validation. GET and comparison requests are public.
The x-role header is a classroom exercise, not real login security.

## Create two trips

In Postman, choose POST and enter http://localhost:3000/trips.
Under Headers add the key x-role with the value admin.
Under Body choose raw > JSON, then send:

```json
{"destination":"Cairo","country":"Egypt","cost":500}
```

Expect 201 Created. Send a second request with:

```json
{"destination":"Luxor","country":"Egypt","cost":700}
```

On a fresh server these trips have IDs 1 and 2. Use the returned IDs if yours differ.
Cost must be a number, not quoted text. Destination and country must be nonempty strings.

## Compare them

Send POST to http://localhost:3000/api/v1/trips/compare with Body > raw > JSON:

```json
{"tripId1":1,"tripId2":2}
```

No x-role header is needed. Expect 200 with:

```json
{
  "destination1": "Cairo",
  "destination2": "Luxor",
  "costDifference": 200,
  "cheaperDestination": "Cairo"
}
```

Equal costs return a difference of 0, cheaperDestination set to null, and a message saying neither trip is cheaper.
Missing IDs, non-number IDs, nonpositive or fractional IDs, and identical IDs return 400.
If either valid ID does not exist, the response is 404.

The PDF uses /api/v1/trips/compare in Exercise 2 and /trips/compare in its checklist.
Both addresses work with the same data. Both /trips and /api/v1/trips use the same router.

## Assignment checklist

Use http://localhost:3000 before each path. For POST and PUT, use Body > raw > JSON.

| Request | Header / body | Expected |
| --- | --- | --- |
| GET /trips | No x-role | 200; list of trips |
| POST /trips | x-role: user, or no x-role | 403; no new trip |
| POST /trips | x-role: admin; cost is 0, -1, "500", missing, or another invalid value | 400; no new trip |
| POST /trips | x-role: admin; valid destination, country, and cost | 201 |
| PUT /trips/1 | No x-role | 403; unchanged trip |
| PUT /trips/1 | x-role: admin; all three valid fields | 200; updated trip with the same ID |
| POST /trips/compare | Two different existing numeric IDs; no x-role | 200; comparison |
| POST /trips/compare | One unknown positive integer ID | 404; unchanged data |
| DELETE /trips/1 | x-role: admin | 200; confirmation |
| GET /trips/1 after deletion | No x-role | 404 |

Also try x-role: user and a missing header on PUT and DELETE: both return 403.
After a denied or invalid request, GET /trips confirms that no trip changed.
GET and POST requests should both appear in the server terminal.

## Submit to GitHub

From the Lab-5.1-5.2 repository root, run:

```powershell
git add trips-api
git diff --cached --stat
git commit -m "Complete Lab 5.2 Trips API"
git push
```

Check the staged list before committing. Include the source, middleware, and package files.
node_modules is excluded by .gitignore. Confirm the new commit and files on GitHub.
Be ready to demonstrate an allowed request (201), a forbidden request (403), and invalid input (400).
