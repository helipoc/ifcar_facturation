import React, { useState, useEffect } from 'react';
import HOME from '../../goBack';
import { getFactures, MarkAsPaid, delFac } from '../../../api/DB';
import Spinner from '../../Spinner';

export default function Gerer() {
  const [factures, setFactures] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const loadFacs = () => {
    getFactures().then((r: any) => {
      setFactures([...r]);
    });
  };
  useEffect(() => {
    loadFacs();
    setLoaded(true);
  }, []);

  const handlPay = async (id: string) => {
    await MarkAsPaid(id);
    loadFacs();
  };
  const delFacHandler = async (id: string) => {
    await delFac(id);
    loadFacs();
  };
  return (
    <div className="container">
      <div className="row mb-5">
        <HOME />
      </div>
      <div className="row">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Num Fac</th>
              <th scope="col">Client</th>
              <th scope="col">Type</th>
              <th scope="col">Total TTC</th>
              <th scope="col">État</th>
              <th scope="col">Date de paiemet</th>
              <th scope="col">Supprimer Facture</th>
            </tr>
          </thead>
          <tbody>
            {factures.map((c) => (
              <tr key={c._id}>
                <td>{c.num_fac}</td>
                <td>{c.client}</td>
                <td>{c.type}</td>
                <td>{c.total} DH</td>
                <td>
                  {c.paid ? (
                    <p className="text-success">Payé</p>
                  ) : (
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handlPay(c._id)}
                    >
                      Non Payé
                    </button>
                  )}
                </td>
                <td>
                  {c.paid
                    ? `Le  ${
                        c.paidOn
                          .toLocaleString()
                          .split(new RegExp(',| ', 'g'))[0]
                      }`
                    : '-'}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => delFacHandler(c._id)}
                  >
                    Supp
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {factures.length == 0 && !loaded && <Spinner />}
        {factures.length == 0 && loaded && (
          <div
            className="alert alert-warning d-flex justify-content-center"
            role="alert"
          >
            La base données des facutres est vide !
          </div>
        )}
      </div>
    </div>
  );
}
