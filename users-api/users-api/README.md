# Users API

This project completes the Users API assignment. Lab5.2 is separate.

## Start

Open a terminal in this folder, where package.json is located. Run:

```sh
npm install
npm start
```

If PowerShell blocks npm, use npm.cmd instead.
Keep the terminal running. Press Ctrl+C to stop the server.
All users disappear when the server restarts because they are stored in an array.

## What the files do

- server.js starts the server on port 3000.
- index.js sets up Express and connects the router.
- routes/userRouter.js chooses the controller function for each request.
- controllers/userController.js checks input and sends responses.
- models/userModel.js stores and changes the users array.
- package.json lists Express and the start command.
- package-lock.json records dependency versions.
- .gitignore excludes node_modules from Git. Do not edit node_modules.

## Test in Postman

Start with a freshly restarted server. The base URL is:

http://localhost:3000/api/v1/users

For POST and PUT, select Body > raw > JSON. Other requests need no body.
Use the full base URL wherever the table says base.

| Step | Method and URL | Body | Expected |
| --- | --- | --- | --- |
| 1 | POST base | {"name":"Sara","email":"sara@example.com"} | 201; user with ID 1 |
| 2 | GET base | None | 200; array containing Sara |
| 3 | GET base/1 | None | 200; Sara's object |
| 4 | PUT base/1 | {"name":"Sara Ahmed","email":"sara.ahmed@example.com"} | 200; updated user, still ID 1 |
| 5 | GET base/1 | None | 200; confirms the update |
| 6 | DELETE base/1 | None | 200; confirmation message |
| 7 | GET base/1 | None | 404; user no longer exists |
| 8 | POST base | {"name":"Omar","email":"omar@example.com"} | 201; ID 2, so the deleted ID was not reused |

Also check these cases:

- POST or PUT with missing, non-string, empty, or spaces-only name/email: 400.
- PUT requires both fields. A failed update must leave the user unchanged.
- GET, PUT, or DELETE with ID abc, 0, -1, or 1.5: 400.
- GET or DELETE with unknown ID 999999: 404.
- PUT to 999999 with valid name and email: 404. Invalid input still returns 400.
- Users contain only id, name, and email. The server assigns IDs.

200 means success; 201 means created; 400 means invalid input; 404 means not found.

## Submit

The PDF requires committing and pushing to your GitHub repository.
Copy this folder into your existing repository as users-api, then run these
commands from the repository root:

```sh
git add users-api
git diff --cached --stat
git commit -m "Complete Users API assignment"
git push
```

Before committing, check that only the intended files are staged. Include the
five source files, both package files, and .gitignore. Exclude node_modules.
Finally, open GitHub and confirm that the commit and files appear online.
The project has not been pushed yet; a target repository is still needed.
