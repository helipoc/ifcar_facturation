import React from "react"
import HOME from "../goBack"
import {Link} from "react-router-dom"

export default function Client(){

    return (<div className="container">
     <HOME/>
    <div className="row mb-5 d-flex align-items-center">
    <h1 className="display-6 text-center text-secondary mt-5">Gestion des Factures et Devis</h1>
     </div>
     <div className="row">
         <div className="col d-flex justify-content-center">
          <Link to="/facturation/ajouter"><button className="btn btn-primary" style={{marginRight:"8em",width:"8em"}}>Ajouter</button></Link>
          <button className="btn btn-primary" style={{width:"8em"}}>Gérer</button>
        </div>
     </div>
    </div>)
}