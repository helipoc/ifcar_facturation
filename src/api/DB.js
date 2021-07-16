import Client from "../db/Client";
import Facture from "../db/Facture"
export async function getClients(){
    let clients = await Client.find({}).exec()
    return clients.map(c => c._doc)
}

export async function insertClient(obj){
    await Client.create({client:obj.client,address:obj.address,tel:obj.tel})
}

export async function getFactures(){
    return await Facture.find({}).exec().map(f=>f._doc)
}

export async function insertFacture(obj){
    await Facture.create({num_fac:obj.num_fac,total:obj.total,url:obj.url})
}