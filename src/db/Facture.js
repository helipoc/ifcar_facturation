const mongoose = require('mongoose')

const FactureSchema = new mongoose.Schema({
    num_fac:'string'
})

const Facture = mongoose.model('Facture',FactureSchema)

module.exports=Facture