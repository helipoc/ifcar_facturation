import React, { useEffect } from 'react';
import HOME from '../goBack';
import { getClients, insertClient } from '../../api/DB';

export default function Client() {
  useEffect(() => {
    let data = async () => console.log(await getClients());
    data();
  });

  const add = async () => {
    await insertClient({ name: 'test', address: 'hmida', tel: '12345' });
  };
  return (
    <div className="container">
      <HOME />
      <div className="row">
        <h1 className="display-6 text-center">Page Client</h1>
      </div>
      <button className="btn btn-primary" onClick={add}>
        Insert
      </button>
    </div>
  );
}
