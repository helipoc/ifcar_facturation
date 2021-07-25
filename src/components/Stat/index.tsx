import React, { useState } from 'react';
import HOME from '../goBack';
import Prestation from './Prestation';
import ClientsBar from './ClientsBar';
export default function Stat() {
  const [barFor, setBarFor] = useState('');
  const [dateDe, setDateDe] = useState(null);
  const [dateA, setDateA] = useState(null);
  const changeHandler = (e: any) => {
    setBarFor(e.target.value);
  };
  return (
    <div className="container">
      <HOME />
      <div className="row">
        <div className="col mt-5 ml-5 mb-2">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="barFor"
              value="prestation"
              onClick={changeHandler}
            />
            <label className="form-check-label">Par Prestation</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="barFor"
              value="clients"
              onClick={changeHandler}
            />
            <label className="form-check-label">Par Client</label>
          </div>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-4">
          <label htmlFor="start">De : </label>{' '}
          <input type="date" onChange={(e: any) => setDateDe(e.target.value)} />
        </div>
        <div className="col-4">
          <label htmlFor="start">à : </label>{' '}
          <input type="date" onChange={(e: any) => setDateA(e.target.value)} />
        </div>
      </div>
      {barFor == 'prestation' && <Prestation date1={dateDe} date2={dateA} />}
      {barFor == 'clients' && <ClientsBar date1={dateDe} date2={dateA} />}
    </div>
  );
}
