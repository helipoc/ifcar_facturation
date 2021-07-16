import React, { useEffect, useState } from 'react';
import HOME from '../goBack';
import { getClients, insertClient } from '../../api/DB';
import { toast } from 'react-toastify';

const defaultClientState = {
  client: '',
  address: '',
  tel: '',
};

export default function Client() {
  const [client, setClient] = useState(defaultClientState);
  const [clients, setClients] = useState<any[]>([]);
  useEffect(() => {
    FillData();
    console.log(clients);
  }, []);

  const FillData = () => {
    getClients()
      .then((data) => setClients([...data]))
      .then((r) => console.log(clients));
  };
  const add = async () => {
    if (client.client == '' || client.address == '' || client.tel == '') {
      toast.error('Remplir tous les champs');
      return;
    }
    await insertClient(client);
    FillData();
    setClient(defaultClientState);
  };

  const handlChange = (e: any) => {
    setClient((st) => ({ ...st, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container">
      <div className="row mb-5">
        <HOME />
      </div>
      <div className="row">
        <div className="col-4">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nom
            </span>
            <input
              type="text"
              className="form-control"
              value={client.client}
              name="client"
              onChange={handlChange}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Fix
            </span>
            <input
              type="text"
              className="form-control"
              value={client.tel}
              name="tel"
              onChange={handlChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Adresse
            </span>
            <input
              type="text"
              className="form-control"
              value={client.address}
              name="address"
              onChange={handlChange}
            />
          </div>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-8 d-flex justify-content-end">
          <button className="btn btn-outline-primary" onClick={add}>
            Ajouter Client
          </button>
        </div>
      </div>
      <table className="table table-striped table-borderless table-hover">
        <thead>
          <tr>
            <th scope="col">Client</th>
            <th scope="col">Fix</th>
            <th scope="col">Adresse</th>
            <th scope="col">Nombre des Factures</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c._id}>
              <td>{c.client}</td>
              <td>{c.tel}</td>
              <td>{c.address}</td>
              <td>{c.Factures.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
