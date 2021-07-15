const mongoose = require("mongoose")

export default function connect(){ 
  mongoose.connect('mongodb+srv://dbuser:v0tr3123@cluster0.krlpt.mongodb.net/ifcar?retryWrites=true&w=majority', {useNewUrlParser: true})
  .then(() => console.log('connected to db'))
  .catch(() => console.log('Error while connecting to db'))
}