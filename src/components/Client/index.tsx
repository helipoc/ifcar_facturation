import React, { useEffect, useState } from 'react';
import HOME from '../goBack';
import { getClients, insertClient, delCli } from '../../api/DB';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';

const defaultClientState = {
  client: '',
  address: '',
  tel: '',
};

export default function Client() {
  const [client, setClient] = useState(defaultClientState);
  const [clients, setClients] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    FillData();
  }, []);

  const FillData = () => {
    getClients().then((data) => {
      setClients([...data]);
      setLoaded(true);
    });
  };
  const add = async () => {
    if (client.client == '' || client.address == '' || client.tel == '') {
      toast.error('Remplir tous les champs');
      return;
    }
    client.client = client.client.replace(/^./, (c) => c.toUpperCase());
    await insertClient(client);
    FillData();
    setClient(defaultClientState);
  };

  const handlChange = (e: any) => {
    setClient((st) => ({ ...st, [e.target.name]: e.target.value }));
  };

  const delCliHandler = async (id: string) => {
    await delCli(id);
    FillData();
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
              Client
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
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Client</th>
            <th scope="col">Fix</th>
            <th scope="col">Adresse</th>
            <th scope="col">Nombre des Factures Payé</th>
            <th scope="col">Total</th>
            <th scope="col">Supprimer Client</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c._id}>
              <td>{c.client}</td>
              <td>{c.tel}</td>
              <td>{c.address}</td>
              <td>{c.Factures.filter((x: any) => x.paid).length}</td>
              <td>
                {c.Factures.map((x: any) => x._doc)
                  .reduce((x: any, a: any) => x + (a.paid ? a.total : 0), 0)
                  .toFixed(2)}{' '}
                DH
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => delCliHandler(c._id)}
                >
                  Supp
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {clients.length == 0 && !loaded && <Spinner />}
      {clients.length == 0 && loaded && (
        <div
          className="alert alert-warning d-flex justify-content-center"
          role="alert"
        >
          La base données des clients est vide !
        </div>
      )}
    </div>
  );
}
