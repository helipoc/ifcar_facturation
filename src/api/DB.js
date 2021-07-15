import Client from "../db/Client";

export async function getClients(){
    let clients = await Client.find({}).exec()
    return clients.map(c => c._doc)
}

export async function insertClient(obj){
    await Client.create({client:obj.name,address:obj.address,tel:obj.tel})
}