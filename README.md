## Project Description

This is the backend API for the Crypto-Dashboard I wrote. The purpose of the API it to get data retrieved from the cronjobs. The Dashboard repo linked below is the frontend for this project
<br/>
[crypto-dashboard](https://github.com/EstianD/crypto-dashboard)<br/>
[cryptoCron](https://github.com/EstianD/crypto-cron-no-express)<br/>
[exchangeCron](https://github.com/EstianD/exchange-cron-no-express)<br/>

## Running the App

### `npm install`

Installs dependancies for app.

### `Add .env file`

For the cron to run you need to add a .env file with the following configurations.

MONGODB_URI=mongodb://localhost:27017/crypto-db
PORT=4000

## Scripts

In the project directory:

### `npm run start`

Runs the app in the production mode.
