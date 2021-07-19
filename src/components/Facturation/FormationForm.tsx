import React, { useState } from 'react';
import { TemplateHandler } from 'easy-template-x';
import fs from 'fs';
import { toast } from 'react-toastify';
import { insertFacture } from '../../api/DB';

const { NumberToLetter } = require('convertir-nombre-lettre');
const defaultThemeState = {
  desi: '',
  nb_grp: '',
  nb_jr: '',
  pr_jr: '',
};

export default function FormationForm(props: any) {
  const [theme, setTheme] = useState(defaultThemeState);
  const [themes, setThemes] = useState<any[]>([]);
  const handlChange = (e: any) => {
    setTheme((st) => ({ ...st, [e.target.name]: e.target.value }));
  };
  const addTheme = () => {
    theme.nb_grp = theme.nb_grp.padStart(2, '0');
    theme.nb_jr = theme.nb_jr.padStart(2, '0');
    theme.pr_jr = (+theme.pr_jr).toFixed(2);
    setThemes((thms) => [...thms, { ...theme }]);
    setTheme(defaultThemeState);
    console.log(themes);
  };

  const handlFactuer = async () => {
    const seed = {
      client: props.client,
      clientadd: props.clientadd,
      themes: [...themes],
      lettre: '',
      num_fac: '',
      tva: '',
      total_ht: '',
      total: '',
    };
    seed.themes = seed.themes.map((t) => ({
      ...t,
      mt_ht: (t.nb_jr * t.pr_jr).toFixed(2),
    }));
    seed.total_ht = parseFloat(
      seed.themes.reduce((a, t) => a + t.mt_ht, 0)
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
    let nmfac: string;
    if (props.type == 'facture') {
      nmfac = await insertFacture(
        {
          total: seed.total,
          type: 'Formation',
        },
        props.client
      );
      seed.num_fac = nmfac;
    } else {
      seed.num_fac = `DV_${new Date().getFullYear()}`;
    }
    let model = fs.readFileSync(`./models/${props.type}_formation.docx`);
    let handler = new TemplateHandler();
    handler.process(model, seed).then(async (o) => {
      toast.success(`Facturation pour ${props.client}`);
      if (props.type == 'facture') {
        fs.writeFileSync(
          `./factures/formation/${seed.client}_${nmfac.split('/').pop()}.docx`,
          o
        );
      } else {
        fs.writeFileSync(
          `./devis/formation/${seed.client}_DV${new Date().getFullYear()}.docx`,
          o
        );
      }
      setThemes([]);
    });
  };
  return (
    <div className="container">
      Nombre des Themes : {themes.length}
      <div className="row">
        <div className="col-6">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Theme
            </span>
            <input
              type="text"
              className="form-control"
              value={theme.desi}
              name="desi"
              onChange={handlChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre Groupe
            </span>
            <input
              type="text"
              className="form-control"
              value={theme.nb_grp}
              name="nb_grp"
              onChange={handlChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre jours formation
            </span>
            <input
              type="text"
              className="form-control"
              value={theme.nb_jr}
              name="nb_jr"
              onChange={handlChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Prix Journalier Ht
            </span>
            <input
              type="text"
              className="form-control"
              value={theme.pr_jr}
              name="pr_jr"
              onChange={handlChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <button className="btn btn-primary" onClick={addTheme}>
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
