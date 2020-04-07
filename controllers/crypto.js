const cryptoRouter = require('express').Router()
const Crypto = require('../models/crypto')
const moment = require('moment')
var roundToNearestMinutes = require('date-fns/roundToNearestMinutes')

const json2csv = require('json2csv')
const csv = require('csv-express')
const stringify = require('csv-stringify')


// GET ALL DATA
cryptoRouter.get('/get-all', async (req, res) => {
   
   try {
      const query = await Crypto.find({}).sort({'createdAt': 1})

      const newCryptos = []

      const cryptos = query.map((val) => {

         let date = val.createdAt

         let fullDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 1) + " " + date.getHours() + ":" + date.getMinutes()

         let newDate = new Date(val.createdAt)
         newDate.setHours(newDate.getHours() + 2)

         var result = roundToNearestMinutes(newDate)

         let cryptoObject = {
            luno: parseInt(val.luno.price),
            kraken: parseInt(val.kraken.price * val.exchangeRate.eur),
            bitstamp: parseInt(val.bitstamp.price * val.exchangeRate.usd),
            createdAt: Date.parse(result)
         }

         newCryptos.push(cryptoObject)
      
      })
      
      return res.json(newCryptos)

   }
   catch(err) {

   }
})


// GET LATEST PRICE VALUE
cryptoRouter.get('/get-latest', async (req, res) => {
   try {
      const query = await Crypto.find({}).sort({'createdAt': -1}).limit(1)

      const newCryptos = []

      const cryptos = query.map((val) => {
         
         let newDate = new Date(val.createdAt)
         newDate.setHours(newDate.getHours() + 2)

         var result = roundToNearestMinutes(newDate)

         let cryptoObject = {
            luno: parseInt(val.luno.price),
            kraken: parseInt(val.kraken.price * val.exchangeRate.eur),
            bitstamp: parseInt(val.bitstamp.price * val.exchangeRate.usd),
            createdAt: Date.parse(result)
         }

         newCryptos.push(cryptoObject)
      
      })
      
      return res.json(newCryptos)

   }
   catch(err) {

   }
})

// GET LAST 24 HOURS OF DATA
cryptoRouter.get('/last-24-hours', async (req, res) => {
   const query = await Crypto.find({}).sort({'createdAt': -1}).limit(288)

   const newCryptos = []

   const cryptos = query.map((val) => {

      let krakenPercDiff = 0
      let bitstampPercDiff = 0

      let newDate = new Date(val.createdAt)
      newDate.setHours(newDate.getHours() + 2)

      var result = roundToNearestMinutes(newDate)

      let dateT = result.toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, 16)

      // CONVERT CURRENCY
      let krakenCalc = val.kraken.price * val.exchangeRate.eur
      let bitstampCalc = val.bitstamp.price * val.exchangeRate.usd

      // CALCULATE PERC DIFF
      krakenPercDiff = ((val.luno.price - krakenCalc) / val.luno.price) * 100

      bitstampPercDiff = ((val.luno.price - bitstampCalc) / val.luno.price) * 100

      let cryptoObject = {
         luno: parseInt(val.luno.price),
         kraken: parseInt(val.kraken.price * val.exchangeRate.eur),
         krakenDiff: parseFloat(krakenPercDiff.toFixed(1)),
         bitstampDiff: parseFloat(bitstampPercDiff.toFixed(1)),
         bitstamp: parseInt(val.bitstamp.price * val.exchangeRate.usd),
         createdAt: dateT
      }

      newCryptos.push(cryptoObject)
   })

   return res.json(newCryptos)
})

cryptoRouter.get('/export-all', async (req, res) => {

   const query = await Crypto.find({}).sort({'createdAt': -1})

   const newCryptos = []

   const cryptos = query.map((val) => {

      let krakenPercDiff = 0
      let bitstampPercDiff = 0

      let newDate = new Date(val.createdAt)
      newDate.setHours(newDate.getHours() + 2)

      var result = roundToNearestMinutes(newDate)

      let dateT = result.toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, 16)

      // CONVERT CURRENCY
      let krakenCalc = val.kraken.price * val.exchangeRate.eur
      let bitstampCalc = val.bitstamp.price * val.exchangeRate.usd

      // CALCULATE PERC DIFF
      krakenPercDiff = ((val.luno.price - krakenCalc) / val.luno.price) * 100

      bitstampPercDiff = ((val.luno.price - bitstampCalc) / val.luno.price) * 100

      let cryptoObject = {
         createdAt: dateT,
         luno: parseInt(val.luno.price),
         krakenDiff: parseFloat(krakenPercDiff.toFixed(1)),
         kraken: parseInt(val.kraken.price * val.exchangeRate.eur),
         bitstampDiff: parseFloat(bitstampPercDiff.toFixed(1)),
         bitstamp: parseInt(val.bitstamp.price * val.exchangeRate.usd)
         
      }

      newCryptos.push(cryptoObject)

   })

   res.setHeader('Content-Type', 'text/csv');
   res.setHeader('Content-Disposition', 'attachment; filename=\"' + Date.now() + '.csv\"');
   res.setHeader('Cache-Control', 'no-cache');
   res.setHeader('Pragma', 'no-cache');

   stringify(newCryptos, { header: true }).pipe(res);
})

module.exports = cryptoRouter