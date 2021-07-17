import React, { useState, useEffect } from 'react';
import HOME from '../goBack';
import FormationForm from './FormationForm';
import RecrutementForm from './RecrutementForm';

export default function Ajouter() {
  const { getClients } = require('../../api/DB');
  const [type1, setType1] = useState('');
  const [type2, setType2] = useState('');
  const onChangeType1 = (e: any) => setType1(e.target.value);
  const onChangeType2 = (e: any) => setType2(e.target.value);
  const [client, setClient] = useState({ address: '', client: '' });
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    getClients()
      .then((dd: any) => setClients([...dd]))
      .catch((err: any) => console.log(err));
  }, []);

  const handSelectChange = (e: any) => {
    let ds = e.target?.value.split(',');
    setClient({ client: ds[0], address: ds[1] });
  };

  return (
    <div className="container">
      <div className="row mb-5">
        <HOME />
      </div>
      <div className="row">
        <div className="col-8 mb-3">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handSelectChange}
            defaultValue={'DEFAULT'}
          >
            <option value="DEFAULT" disabled>
              Sélectionner un client
            </option>
            {clients.map((c) => (
              <option value={c.client + ',' + c.address} key={c._id}>
                {c.client}
              </option>
            ))}
          </select>
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
          {type2 == 'formation' && client.client != '' && (
            <FormationForm
              type={type1}
              client={client.client}
              clientadd={client.address}
            />
          )}
          {type2 == 'recrutement' && client.client != '' && (
            <RecrutementForm
              type={type1}
              client={client.client}
              clientadd={client.address}
            />
          )}
        </div>
      </div>
    </div>
  );
}
