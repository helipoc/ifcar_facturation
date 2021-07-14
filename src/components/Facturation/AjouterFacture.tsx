import React, { useState } from 'react';
import HOME from '../goBack';
import FormationForm from './FormationForm';
import RecrutementForm from './RecrutementForm';

export default function Ajouter() {
  const [type1, setType1] = useState('facture');
  const [type2, setType2] = useState('formation');
  const onChangeType1 = (e: any) => setType1(e.target.value);
  const onChangeType2 = (e: any) => setType2(e.target.value);
  return (
    <div className="container">
      <div className="row mb-5">
        <HOME />
      </div>
      <div className="row">
        <div className="col-6">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Client
            </span>
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="type"
                value="facture"
                onClick={onChangeType1}
                checked={type1 == 'facture'}
                readOnly
              />
              <label className="form-check-label">Facutre</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="type"
                value="devis"
                onClick={onChangeType1}
              />
              <label className="form-check-label">Devis</label>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="typeFacture"
                  value="formation"
                  onClick={onChangeType2}
                  checked={type2 == 'formation'}
                  readOnly
                />
                <label className="form-check-label">Formation</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="typeFacture"
                  value="recrutement"
                  onClick={onChangeType2}
                />
                <label className="form-checka-label">Recrutement</label>
              </div>
            </div>
          </div>
          {type2 == 'formation' ? (
            <FormationForm type={type1} client="hmida" clientadd="w9ida" />
          ) : (
            <RecrutementForm type={type1} />
          )}
        </div>
      </div>
    </div>
  );
}
