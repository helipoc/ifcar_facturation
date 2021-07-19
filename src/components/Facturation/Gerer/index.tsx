import React, { useState, useEffect } from 'react';
import HOME from '../../goBack';
import { getFactures, MarkAsPaid } from '../../../api/DB';
import Spinner from '../../Spinner';

export default function Gerer() {
  const [factures, setFactures] = useState<any[]>([]);

  useEffect(() => {
    getFactures().then((r: any) => setFactures([...r]));
  }, []);

  const handlPay = async (id: string) => {
    await MarkAsPaid(id);
    setFactures((facs) =>
      [...facs].map((f) => (f._id == id ? { ...f, paid: true } : { ...f }))
    );
  };
  return (
    <div className="container">
      <div className="row mb-5">
        <HOME />
      </div>
      <div className="row">
        <table className="table table-striped table-borderless table-hover">
          <thead>
            <tr>
              <th scope="col">Num Fac</th>
              <th scope="col">Client</th>
              <th scope="col">Type</th>
              <th scope="col">Total TTC</th>
              <th scope="col">État</th>
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
                      Marquer comme payé
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {factures.length == 0 && <Spinner />}
      </div>
    </div>
  );
}
