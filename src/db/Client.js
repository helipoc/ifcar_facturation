const mongoose = require('mongoose')
const Facture = require('./Facture')

const ClientSchema = new mongoose.Schema({
    client:String,
    address:String,
    tel:String,
    Factures : [{type:mongoose.Types.ObjectId,ref:"Facture"}]
})

const Client = mongoose.model('Client',ClientSchema)

export default Client;