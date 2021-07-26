import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { TotalFactureTTC } from '../../api/DB';

export default function PreStation(props: any) {
  const [totalFacs, setTotalFacs] = useState<any[]>([]);
  const data = {
    labels: ['Total TTC'],
    datasets: [
      {
        label: 'Total TTC (en DH) ',
        data: [totalFacs[0]],
        backgroundColor: '#54a0ff',
      },
      {
        label: 'Total TTC Formation (en DH) ',
        data: [totalFacs[1]],
        backgroundColor: '#ff7979',
      },
      {
        label: 'Total TTC Recrutement (en DH) ',
        data: [totalFacs[2]],
        backgroundColor: '#6ab04c',
      },
      {
        label: 'Total TTC Conseil (en DH) ',
        data: [totalFacs[3]],
        backgroundColor: '#f0932b',
      },
    ],
  };

  useEffect(() => {
    console.log(props.date1);
    console.log(props.date2);
    TotalFactureTTC(props.date1, props.date2).then((res) => {
      setTotalFacs([...res]);
      console.log(res);
    });
  }, [props.date1, props.date2]);

  return (
    <div className="row">
      <div className="col-10 offset-1">
        <Bar data={data} />
      </div>
    </div>
  );
}
