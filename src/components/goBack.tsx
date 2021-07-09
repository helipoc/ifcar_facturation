import React from "react"

import { Link } from "react-router-dom";


export default function GoHome() {

    return(
        <div className="row mt-2">
        <Link to="/">
            <button className="btn btn-danger"><b>⬅️ PAGE D'ACCUEIL</b></button>
        </Link>
        </div>
    )
}