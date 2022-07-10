import config from "../../config"
import axios from "axios"
import React from 'react'
import Image from 'next/image'
import { useEffect } from "react";

const CardComponent = () => {
    let [isLogin, setIsLogin] = React.useState(null) // state hook
    useEffect(() => {
      const login = typeof window !== 'undefined' ? (localStorage.getItem('token') == null ? false : true) : null
      setIsLogin(login)
    }, [])
    let [dataItems, setDataItems] = React.useState([])
    let [typeSorting, setTypeSorting] = React.useState('')
    let [ascendingSorting, setAscendingSorting] = React.useState('')
    React.useEffect(() => {
        axios.get(`${config.urlBackend}/items`)
          .then(res => {
            setDataItems(res.data.data.data);
            console.log(res)
          }).catch(error => console.log(error));
    }, [])

    const handleClickDelete = (e) => {
        axios.delete(`${config.urlBackend}/items/${e}`)
          .then(res => {
            window.location.reload(false);
            alert("Succes buy items!")
          }).catch(error => console.log(error));
    }   

    const handleClickSorting = () => {
        if(typeSorting != 1 && typeSorting != 2) {
            alert("Please choose type sorting")
        } else if (ascendingSorting != 1 && ascendingSorting != 2) {
            alert("Please choose ascending or descending")
        } else {
            const query_type = (typeSorting == 2 ? "sorted-by-name" : "sorted-by-date")
            const query_asc = (ascendingSorting == 1 ? "ascending" : "descending")
            axios.get(`${config.urlBackend}/items/${query_type}/${query_asc}`)
              .then(res => {
                setDataItems(res.data.data.data);
                console.log("sukses")
              }).catch(error => console.log(error));
        }
    }

    const Card = () => {
        return(
            <>
            {dataItems.map((d) => {
                return(
                    <div class="card col-3 col-md-3" style={{width: "22rem", marginRight: "3rem", marginBottom: "3rem", backgroundColor: "transparent", borderRadius: "15px", borderColor: "white", padding: "20px"}}>
                        <Image class="card-img-top" src={`/${d.image}`} alt="Card image cap" width={400} height={400}  layout='' objectFit=''/> 
                        <div class="card-body">
                            <h5 class="card-title" style={{color: "whitesmoke"}}>{d.name}</h5>
                            <h6 style={{color: "whitesmoke"}}>Released date: {d.created_at.slice(0,10)}</h6>
                            <p class="card-text" style={{color: "whitesmoke"}}>{d.description}</p>
                            <div className="row">
                                <button disabled={!isLogin} onClick={() => handleClickDelete(d.id)} class="col-6 btn btn-primary">Buy</button>
                            </div>
                        </div>
                    </div>
                )
            })}
            </>
        )
    }

    const IsEmpty = () => {
        return(
            <div>There is no data in canteen</div>
        )
    }

    return(
        <div className="container" style={{marginTop: "20px", width: "100vw", justifyContent: "center", backgroundColor: "rgba(204, 204, 204, 0.1)", borderRadius: "20px"}}>
            <div style={{fontSize: "3vw", textAlign: "center", marginBottom: "3vw", color: "white"}}>List of Sell Item</div>
            <div className="container" style={{marginBottom: "3vw", marginTop: "3vw"}}>
                <div className="row">
                    <div className="col-1" style={{color: "whitesmoke"}}>Sorted by</div>
                    <select onChange={(e) => setTypeSorting(e.target.value)} id="type-input" className="form-select col-sm" aria-label="Default select example">
                        <option selected>Choose Type</option>
                        <option value="1">Date Item</option>
                        <option value="2">Name</option>
                    </select>
                    <div className="col-1">

                    </div>
                    <select onChange={(e) => setAscendingSorting(e.target.value)} id="is-asc-input" className="form-select col-sm" aria-label="Default select example">
                        <option selected>Choose Ascending or Descending</option>
                        <option value="1">Ascending</option>
                        <option value="2">Descending</option>
                    </select>
                    <div className="col-1">

                    </div>
                    <button onClick={handleClickSorting} className="col-1 btn btn-primary">Sort</button>
                </div>
            </div>
            <div className="row ml-5">
                {dataItems == null ? <IsEmpty /> : <Card />}
            </div>
        </ div>
    )
}

export default CardComponent;