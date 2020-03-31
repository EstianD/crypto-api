const mongoose = require('mongoose')

const cryptoSchema = new mongoose.Schema({
   timestamp: {
      type: String,
      required: true,
   },
   exchangeRate: {
      usd: String,
      eur: String
   },
   luno: {
      price: String,
      symbol: String
   },
   kraken: {
      price: String,
      symbol: String
   },
   bitstamp: {
      price: String,
      symbol: String
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
})

module.exports = mongoose.model('Crypto', cryptoSchema)