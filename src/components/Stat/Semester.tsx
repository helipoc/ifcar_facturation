import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { SemChartData } from '../../api/DB';

export default function Semester() {
  const [factures, setFactures] = useState<any[]>([]);
  const data = {
    labels: ['T1', 'T2', 'T3', 'T4'],
    datasets: [
      {
        label: 'Total TTC Du Trimestre (en DH) ',
        data: factures.map((f) => f.reduce((a: any, b: any) => a + b.total, 0)),
        backgroundColor: '#30336b',
      },
      {
        label: 'Total TTC Trimestre Des Formations (en DH) ',
        data: factures.map((f) =>
          f.reduce(
            (a: any, b: any) => a + (b.type == 'Formation' ? b.total : 0),
            0
          )
        ),
        backgroundColor: '#ff7979',
      },
      {
        label: 'Total TTC Trimestre Des Recrutements (en DH) ',
        data: factures.map((f) =>
          f.reduce(
            (a: any, b: any) => a + (b.type == 'Recrutement' ? b.total : 0),
            0
          )
        ),
        backgroundColor: '#6ab04c',
      },
      {
        label: 'Total TTC Trimestre Des Conseils (en DH) ',
        data: factures.map((f) =>
          f.reduce(
            (a: any, b: any) => a + (b.type == 'Conseil' ? b.total : 0),
            0
          )
        ),
        backgroundColor: '#f0932b',
      },
    ],
  };
  useEffect(() => {
    SemChartData().then((res) => {
      setFactures(res);
      console.log(res.flat());
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
