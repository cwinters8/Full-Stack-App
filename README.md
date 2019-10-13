# Full Stack App
Tenth and final project in the [Team Treehouse](http://referrals.trhou.se/clarkwinters) Full Stack JavaScript Techdegree.

## Prerequisite
A `.env` file must be present in the client app root directory with a random string value set to a variable named `REACT_APP_SECRET_KEY`. An example has been committed to the repository by the name of `.env.example`, but the actual file name when you start the app should be `.env`. This value is used in the app to encrypt and decrypt passwords. You can either come up with your own super secret string, or generate a secure one by using an [online hash generator](https://onlinehashtools.com/generate-random-sha256-hash) (recommended).

## Getting Started
To run the app locally, you'll need a MongoDB database setup.
First, install dependencies for the API.
```bash
cd api
npm install
```
Ensure you have MongoDB setup on your local system.
* Open a `Command Prompt` (on Windows) or `Terminal` (on Mac OS X) instance and run the command `mongod` (or `sudo mongod`) to start the MongoDB daemon.
* If that command failed then you’ll need to install MongoDB.
* [How to Install MongoDB on Windows](http://treehouse.github.io/installation-guides/windows/mongo-windows.html)
* [How to Install MongoDB on a Mac](http://treehouse.github.io/installation-guides/mac/mongo-mac.html)

Next, seed your MongoDB database with the provided seed data.
```bash
npm run seed
```

Then you can start the API app.
```bash
npm start
```

Finally, install dependencies and run the client app.
```bash
cd client
yarn install
npm start
```

Now you can browse to `http://localhost:3000` in your preferred web browser.