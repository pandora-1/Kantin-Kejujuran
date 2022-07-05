import axios from "axios"
import React from 'react'
import config from "../../config"

const BalanceComponent = () => {
    let [balance, setBalance] = React.useState(-5) // state hook
    let [changes, setChanges] = React.useState(-5) // state hook
    let [typeChanges, setTypeChanges] = React.useState('') // state hook

    React.useEffect(() => {
        axios.get(`${config.urlBackend}/balance`)
          .then(res => {
            setBalance(res.data.data.data.balance);
          }).catch(error => console.log(error));
    }, [])

    const handleSubmitBalance = (e) => {
        if(changes == -5) {
            alert("Please insert value in amount input!")
        } else {
            if(typeChanges == '2') {
                const payload = {
                    "balance": changes * (-1),
                }
                axios.put(`${config.urlBackend}/balance`, payload)
                .then(res => {
          
                  
                }).catch(error => {
                    console.log(error)
                    alert("Canteen don't have enough balance")
                });
            } else if (typeChanges == '1') {
                const payload = {
                    "balance": changes,
                }
                axios.put(`${config.urlBackend}/balance`, payload)
                .then(res => {
                  
                }).catch(error => console.log(error));
            } else {
                alert("Please choose you want to add or substract the balance!")
            }
        }
    }

    return(
        <div className="container" style={{width: "50%", marginTop: "20px", justifyContent: "center", backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "20px", padding: "20px"}}>
            <div style={{fontSize: "3vw", textAlign: "center", marginTop: "3vw", marginBottom: "3vw", color: "white"}}>Balance: {balance}</div>
            <form>
                <div className="mb-3">
                    <label for="amount" className="form-label" style={{color: "whitesmoke"}}>Amount</label>
                    <input onChange={(e) => setChanges(parseInt(e.target.value))} type="number" className="form-control" />
                </div>
                <div className="mb-3">
                    <label for="changes" className="form-label" style={{color: "whitesmoke"}}>Choose changes</label>
                    <select onChange={(e) => setTypeChanges(e.target.value)}  className="form-select" aria-label="Default select example">
                        <option selected>Choose changes</option>
                        <option value="1">Add Balance</option>
                        <option value="2">Substract Balance</option>
                    </select>
                </div>
                <button onClick={handleSubmitBalance} type="submit" className="btn btn-primary" style={{marginTop: "1vw"}}>Change Balance</button>
            </form>
        </div>
    )
}

export default BalanceComponent;