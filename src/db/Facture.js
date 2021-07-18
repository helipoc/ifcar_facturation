const mongoose = require('mongoose')
import NumGen from "./NumGenerator"
const FactureSchema = new mongoose.Schema({
    num_fac:{
        type:String,
        unique:true
    },
    total:Number,
    url:String,
    client:String,
    type:String,
    paid:{
        type:Boolean,
        default:false
    }
    
})

FactureSchema.pre('save',async function(next) {
    let doc = await NumGen.findOne({num_fac:/A/})
    let id = doc._doc.num_fac
    let ff = id.split('-')
    let num = ff[ff.length-1]
    num=parseInt(num)+1
    num=num.toString().padStart(3,'0')
    let date  = new Date().getFullYear();
    let offset = parseInt(id.match(/A(\d+)/)[1])-(date-2007)
    let final=`${date}/A${date-2007}-${offset<0 ? "000" : num}`
    this.num_fac=final;
    await NumGen.updateOne({num_fac:/A/},{$set:{num_fac:final}})
    next()
})


const Facture = mongoose.model('Facture',FactureSchema)


export default Facture