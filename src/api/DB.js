import Client from '../db/Client';
import Facture from '../db/Facture';
export async function getClients() {
  let clients = await Client.find({}).populate('Factures').exec();
  return clients.map((c) => c._doc);
}

export async function insertClient(obj) {
  await Client.create({
    client: obj.client,
    address: obj.address,
    tel: obj.tel,
  });
}

export async function getFactures() {
  let facs = await Facture.find({}).exec();
  return facs.map((f) => f._doc);
}

export async function insertFacture(obj, clientname) {
  let d = await Facture.create({
    total: obj.total,
    type: obj.type,
    client: clientname,
  });
  let client = await Client.findOne({ client: clientname });
  client.Factures.push(d._doc._id);
  await client.save();
  return d._doc.num_fac;
}

export async function MarkAsPaid(factureid) {
    await Facture.updateOne(
    { _id: factureid },
    { paid: true, paidOn: new Date() }
  );
}

export async function TotalFactureTTC(date1,date2){
  let f = await Facture.find({type:"Formation",paid:true}).exec()
  let r = await Facture.find({type:"Recrutement",paid:true}).exec()
  let c = await Facture.find({type:"Conseil",paid:true}).exec()
  let totalf = f.map(c=>c._doc.total).reduce((a,b)=>a+b,0)
  let totalr = r.map(c=>c._doc.total).reduce((a,b)=>a+b,0)
  let totalc = c.map(c=>c._doc.total).reduce((a,b)=>a+b,0)

  return [totalf,totalr,totalc]

}