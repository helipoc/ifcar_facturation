import React, { useState } from 'react';
import GenerateNum from '../../api/GenerateNumFac';
import { TemplateHandler } from 'easy-template-x';
import { NumberToLetter } from 'convertir-nombre-lettre';
import fs from 'fs';
const defaultThemeState = {
  desi: '',
  lieu: '',
  nb_ben: '',
  nb_grp: '',
  nb_jr: '',
  date: '',
  pr_jr: '',
};

export default function FormationForm(props: any) {
  const [theme, setTheme] = useState(defaultThemeState);
  const [themes, setThemes] = useState<any[]>([]);
  const handlChange = (e: any) => {
    setTheme((st) => ({ ...st, [e.target.name]: e.target.value }));
  };
  const addTheme = () => {
    theme.nb_ben = theme.nb_ben.padStart(2, '0');
    theme.nb_grp = theme.nb_grp.padStart(2, '0');
    theme.nb_jr = theme.nb_jr.padStart(2, '0');
    theme.pr_jr = (+theme.pr_jr).toFixed(2);
    setThemes((thms) => [...thms, { ...theme }]);
    setTheme(defaultThemeState);
    console.log(themes);
  };

  const handlFactuer = () => {
    const seed = {
      client: props.client,
      clientadd: props.clientadd,
      num_fac: '',
      themes: [...themes],
      lettre: '',
      tva: 0.2,
      total_ht: '',
      total: '',
    };
    seed.num_fac = GenerateNum();
    seed.themes = seed.themes.map((t) => ({
      ...t,
      mt_ht: (t.nb_jr * t.pr_jr).toFixed(2),
    }));
    seed.total_ht = parseFloat(
      seed.themes.reduce((a, t) => a + t.mt_ht, 0)
    ).toFixed(2);
    seed.tva *= parseFloat(seed.total_ht);
    seed.tva = parseFloat(seed.tva.toFixed(2));
    seed.total = parseFloat(seed.total_ht + seed.tva).toFixed(2);
    let arr = seed.total.toString().split('.');
    seed.lettre = NumberToLetter(arr[0]) + ' Dirhams';
    if (arr[arr.length - 1] != '00') {
      seed.lettre += ` et ${NumberToLetter(
        parseInt(arr[arr.length - 1])
      )} Centimes`;
    }

    let model = fs.readFileSync(`./models/${props.type}_formation.docx`);
    let handler = new TemplateHandler();
    handler.process(model, seed).then((o) => {
      fs.writeFileSync(
        `./${props.type == 'facture' ? 'factures' : 'devis'}/formation/${
          seed.client
        }_${seed.num_fac.split('/').pop()}.docx`,
        o
      );
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
        <div className="col-6">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Lieu
            </span>
            <input
              type="text"
              className="form-control"
              value={theme.lieu}
              name="lieu"
              onChange={handlChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre bénéficiare
            </span>
            <input
              type="text"
              className="form-control"
              value={theme.nb_ben}
              name="nb_ben"
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
              Date de réalistion
            </span>
            <input
              type="text"
              className="form-control"
              value={theme.date}
              name="date"
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
