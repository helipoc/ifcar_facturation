import React, { useState } from 'react';
import { TemplateHandler } from 'easy-template-x';
import fs from 'fs';
import GenerateNum from '../../api/GenerateNumFac';
import { toast } from 'react-toastify';

const { NumberToLetter } = require('convertir-nombre-lettre');
const DefaultItemState = {
  desi: '',
  qte: '',
  pu: '',
  mt: '',
};

export default function RecrutementForm(props: any) {
  const [item, setItem] = useState(DefaultItemState);
  const [items, setItems] = useState<any[]>([]);
  const handlChange = (e: any) => {
    setItem((st) => ({ ...st, [e.target.name]: e.target.value }));
  };
  const addItem = () => {
    item.qte = item.qte.padStart(2, '0');
    item.pu = (+item.pu).toFixed(2);
    setItems((items) => [...items, { ...item }]);
    setItem(DefaultItemState);
  };

  const handlFactuer = () => {
    const seed = {
      client: props.client,
      clientadd: props.clientadd,
      num_fac: '',
      items: [...items],
      lettre: '',
      tva: '',
      total_ht: '',
      total: '',
    };

    seed.num_fac = GenerateNum();
    seed.items = seed.items.map((t) => ({
      ...t,
      mt: (t.pu * t.qte).toFixed(2),
    }));
    seed.total_ht = parseFloat(
      seed.items.reduce((a, t) => a + t.mt, 0)
    ).toFixed(2);
    seed.tva = (parseFloat(seed.total_ht) * 0.2).toFixed(2);
    seed.total = (parseFloat(seed.total_ht) + parseFloat(seed.tva)).toFixed(2);
    let arr = seed.total.toString().split('.');
    seed.lettre = NumberToLetter(arr[0]) + ' Dirhams';
    if (arr[arr.length - 1] != '00') {
      seed.lettre += ` et ${NumberToLetter(
        parseInt(arr[arr.length - 1])
      )} Centimes`;
    }

    let model = fs.readFileSync(`./models/${props.type}_recrutement.docx`);
    let handler = new TemplateHandler();
    handler.process(model, seed).then((o) => {
      fs.writeFileSync(
        `./${props.type == 'facture' ? 'factures' : 'devis'}/recrutement/${
          seed.client
        }_${seed.num_fac.split('/').pop()}.docx`,
        o
      );
      toast.success(`Facturation pour ${props.client}`);
    });
  };
  return (
    <div className="container">
      Nombre des Désignations : {items.length}
      <div className="row">
        <div className="col-6">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Désignation
            </span>
            <input
              type="text"
              className="form-control"
              value={item.desi}
              name="desi"
              onChange={handlChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre
            </span>
            <input
              type="text"
              className="form-control"
              value={item.qte}
              name="qte"
              onChange={handlChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Prix Unitaire (en DH)
            </span>
            <input
              type="text"
              className="form-control"
              value={item.pu}
              name="pu"
              onChange={handlChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <button className="btn btn-primary" onClick={addItem}>
            Ajouter
          </button>
        </div>
        <div className="col">
          <button className="btn btn-success" onClick={handlFactuer}>
            Facturer
          </button>
        </div>
      </div>
    </div>
  );
}
