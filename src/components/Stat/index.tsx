import React, { useState } from 'react';
import HOME from '../goBack';
import Prestation from './Prestation';
import ClientsBar from './ClientsBar';
export default function Stat() {
  const [barFor, setBarFor] = useState('');
  const changeHandler = (e: any) => {
    setBarFor(e.target.value);
  };
  return (
    <div className="container">
      <HOME />
      <div className="row">
        <div className="col mt-5 ml-5">
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
      {barFor == 'prestation' && <Prestation />}
      {barFor == 'clients' && <ClientsBar />}
    </div>
  );
}
