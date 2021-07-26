import React, { useState } from 'react';
import HOME from '../goBack';
import Prestation from './Prestation';
import ClientsBar from './ClientsBar';
import Semester from './Semester';
export default function Stat() {
  const [barFor, setBarFor] = useState('');
  const [dateDe, setDateDe] = useState(new Date('0'));
  const [dateA, setDateA] = useState(new Date());
  const changeHandler = (e: any) => {
    setBarFor(e.target.value);
  };
  return (
    <div className="container">
      <HOME />
      <div className="row">
        <div className="col mt-5 ml-5 mb-3">
          <div className="form-check form-check-inline offset-1">
            <input
              className="form-check-input"
              type="radio"
              name="barFor"
              value="prestation"
              onClick={changeHandler}
            />
            <label className="form-check-label">Par Prestation</label>
          </div>
          <div className="form-check form-check-inline offset-1">
            <input
              className="form-check-input"
              type="radio"
              name="barFor"
              value="clients"
              onClick={changeHandler}
            />
            <label className="form-check-label">Par Client</label>
          </div>
          <div className="form-check form-check-inline offset-1">
            <input
              className="form-check-input"
              type="radio"
              name="barFor"
              value="semester"
              onClick={changeHandler}
            />
            <label className="form-check-label">Par Semester</label>
          </div>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-4 offset-1">
          <label htmlFor="start">De : </label>{' '}
          <input
            type="date"
            onChange={(e: any) => {
              setDateDe(new Date(e.target.value));
              console.log('1');
              console.log(barFor);
            }}
          />
        </div>
        <div className="col-4">
          <label htmlFor="start">à : </label>{' '}
          <input
            type="date"
            onChange={(e: any) => setDateA(new Date(e.target.value))}
          />
        </div>
      </div>
      {barFor == 'prestation' && (
        <Prestation date1={dateDe.getTime()} date2={dateA.getTime()} />
      )}
      {barFor == 'clients' && (
        <ClientsBar date1={dateDe.getTime()} date2={dateA.getTime()} />
      )}
      {barFor == 'semester' && <Semester />}
    </div>
  );
}
