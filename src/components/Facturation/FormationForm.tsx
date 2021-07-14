import React, { useState } from 'react';

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
    setThemes((thms) => [...thms, { ...theme }]);
    setTheme(defaultThemeState);
    console.log(themes);
  };

  const handlFactuer = () => {};
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
          <button className="btn btn-success">Facturer</button>
        </div>
      </div>
    </div>
  );
}
