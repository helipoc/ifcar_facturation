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

export async function delFac(id) {
  await Facture.findByIdAndDelete(id);
}

export async function delCli(id) {
  const cli = await Client.findById(id);
  await Promise.all([Facture.deleteMany({ client: cli._doc.client })]);
  await Client.findByIdAndDelete(id);
}

export async function TotalFactureTTC(date1, date2) {
  let f = await Facture.find({ type: 'Formation', paid: true }).exec();
  let r = await Facture.find({ type: 'Recrutement', paid: true }).exec();
  let c = await Facture.find({ type: 'Conseil', paid: true }).exec();
  let totalf = f
    .filter(
      (b) =>
        b._doc.paidOn.getTime() >= date1 && b._doc.paidOn.getTime() <= date2
    )
    .map((c) => c._doc.total)
    .reduce((a, b) => a + b, 0);
  let totalr = r
    .filter(
      (b) =>
        b._doc.paidOn.getTime() >= date1 && b._doc.paidOn.getTime() <= date2
    )
    .map((c) => c._doc.total)
    .reduce((a, b) => a + b, 0);
  let totalc = c
    .filter(
      (b) =>
        b._doc.paidOn.getTime() >= date1 && b._doc.paidOn.getTime() <= date2
    )
    .map((c) => c._doc.total)
    .reduce((a, b) => a + b, 0);

  return [totalc + totalf + totalr, totalf, totalr, totalc];
}

export async function SemChartData() {
  let facs = await getFactures();
  let t1 = facs.filter(
    (f) => f.paid && f.paidOn.getMonth() >= 0 && f.paidOn.getMonth() <= 2
  );
  let t2 = facs.filter(
    (f) => f.paid && f.paidOn.getMonth() >= 3 && f.paidOn.getMonth() <= 5
  );
  let t3 = facs.filter(
    (f) => f.paid && f.paidOn.getMonth() >= 6 && f.paidOn.getMonth() <= 8
  );
  let t4 = facs.filter((f) => f.paid && f.paidOn.getMonth() >= 9);
  return [t1, t2, t3, t4];
}
