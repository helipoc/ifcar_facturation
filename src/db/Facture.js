const mongoose = require('mongoose')

const FactureSchema = new mongoose.Schema({
    num_fac:String,
    total:Number,
    url:String,
    paid:{
        type:Boolean,
        default:false
    }
})

const Facture = mongoose.model('Facture',FactureSchema)

module.exports=Facture