import React, { useEffect, useState } from 'react';
import HOME from '../goBack';
import { Bar } from 'react-chartjs-2';
import { TotalFactureTTC } from '../../api/DB';

const randomColor = require('randomcolor');

export default function Stat() {
  const [totalFacs, setTotalFacs] = useState<any[]>([]);
  const data = {
    labels: ['Formation', 'Recrutement', 'Conseil'],
    datasets: [
      {
        label: 'Total TTC (en DH) ',
        data: [...totalFacs],
        backgroundColor: totalFacs.map(() => randomColor()),
      },
    ],
  };

  useEffect(() => {
    TotalFactureTTC().then((res) => {
      setTotalFacs([...res]);
      console.log(res);
    });
  }, []);
  return (
    <div className="container">
      <HOME />
      <div className="row">
        <h4 className="display-1 text-center mb-3">En construction</h4>
      </div>
      <div className="row">
        <div className="col-10 offset-1">
          <Bar data={data} />
        </div>
      </div>
    </div>
  );
}
