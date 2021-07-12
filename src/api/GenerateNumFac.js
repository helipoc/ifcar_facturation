export default function GenerateNum(){
const fs = require('fs')
let file = fs.readFileSync('.fc',{encoding:"utf-8"})
let ff = file.split('-')
let num = ff[ff.length-1]
num=parseInt(num)+1
num=num.toString().padStart(3,'0')
let date  = new Date().getFullYear();
let offset = parseInt(file.match(/A(\d+)/)[1])-(date-2007)
let final=`${date}/A${date-2007}-${offset<0 ? "000" : num}`
fs.writeFileSync('.fc',final)

return final

}