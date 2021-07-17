const mongoose = require('mongoose')

const Scheema = new mongoose.Schema({
    num_fac:String,
})

const NumGen = mongoose.model('NumGenerator',Scheema)

export default NumGen;