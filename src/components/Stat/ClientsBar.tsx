import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getClients } from '../../api/DB';

export default function PreStation(props: any) {
  const [clients, setClients] = useState<any[]>([]);
  const data = {
    labels: clients.map((c) => c.client),
    datasets: [
      {
        label: 'Total TTC par Client (en DH) ',
        data: clients.map((c) =>
          c.Factures.filter(
            (b: any) =>
              b.paidOn.getTime() >= props.date1 &&
              b.paidOn.getTime() <= props.date2
          ).reduce((a: any, b: any) => a + (b.paid ? b.total : 0), 0)
        ),
        backgroundColor: '#30336b',
      },
      {
        label: 'Total TTC Formation (en DH) ',
        data: clients.map((c) =>
          c.Factures.filter(
            (b: any) =>
              b.paidOn.getTime() >= props.date1 &&
              b.paidOn.getTime() <= props.date2
          ).reduce(
            (a: any, b: any) =>
              a + (b.paid && b.type == 'Formation' ? b.total : 0),
            0
          )
        ),
        backgroundColor: '#ff7979',
      },
      {
        label: 'Total TTC Recrutement (en DH) ',
        data: clients.map((c) =>
          c.Factures.filter(
            (b: any) =>
              b.paidOn.getTime() >= props.date1 &&
              b.paidOn.getTime() <= props.date2
          ).reduce(
            (a: any, b: any) =>
              a + (b.paid && b.type == 'Recrutement' ? b.total : 0),
            0
          )
        ),
        backgroundColor: '#6ab04c',
      },
      {
        label: 'Total TTC Conseil (en DH) ',
        data: clients.map((c) =>
          c.Factures.filter(
            (b: any) =>
              b.paidOn.getTime() >= props.date1 &&
              b.paidOn.getTime() <= props.date2
          ).reduce(
            (a: any, b: any) =>
              a + (b.paid && b.type == 'Conseil' ? b.total : 0),
            0
          )
        ),
        backgroundColor: '#f0932b',
      },
    ],
  };

  useEffect(() => {
    getClients().then((res) => {
      setClients(res);
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
