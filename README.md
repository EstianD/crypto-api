## Project Description

This is a cronjob written in Node.js to get data for a crypto dashboard I wrote. The purpose of this cron is to get the price value of Bitcoin and Ethereum from the 3 different exchanges. Kraken, Bitstamp and Luno. This cron was written for the following project repos:<br/>
[crypto-dashboard](https://github.com/EstianD/crypto-dashboard)<br/>
[crypto-api](https://github.com/EstianD/crypto-api)<br/> [exchangeCron](https://github.com/EstianD/nodejs-exchange-cron)<br/>
This cron uses PM2 process manager to run every 5 minutes.

## Running the App

### `npm install`

Installs dependancies for app.

### `Add .env file`

For the cron to run you need to add a .env file with the following configurations.

MONGODB_URI=mongodb://localhost:27017/crypto-db

KRAKENBTCEURLINK=https://api.cryptowat.ch/markets/kraken/btceur/price
BITSTAMPBTCUSDLINK=https://api.cryptowat.ch/markets/bitstamp/btcusd/price
LUNOBTCZARLINK=https://api.mybitx.com/api/1/ticker?pair=XBTZAR

## Scripts

In the project directory:

### `npm run start`

Runs the app in the production mode.
