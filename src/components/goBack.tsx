import React from 'react';

import { Link } from 'react-router-dom';

export default function GoHome() {
  return (
    <div className="row mt-2">
      <div className="col-sm">
        <Link to="/">
          <button className="btn btn-danger" onClick={() => history.go(-1)}>
            <b>⬅️ PAGE D'ACCUEIL</b>
          </button>
        </Link>
      </div>
    </div>
  );
}
