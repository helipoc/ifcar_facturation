const mongoose = require("mongoose")

export default function connect(){ 
  mongoose.connect(process.env.DATABASE, {useNewUrlParser: true})
  .then(() => console.log('connected to db'))
  .catch(() => console.log('Error while connecting to db'))
}