import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { TotalFactureTTC } from '../../api/DB';

export default function PreStation() {
  const [totalFacs, setTotalFacs] = useState<any[]>([]);
  const data = {
    labels: ['Formation', 'Recrutement', 'Conseil'],
    datasets: [
      {
        label: 'Total TTC (en DH) ',
        data: [...totalFacs],
        backgroundColor: '#1abc9c',
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
    <div className="row">
      <div className="col-10 offset-1">
        <Bar data={data} />
      </div>
    </div>
  );
}
