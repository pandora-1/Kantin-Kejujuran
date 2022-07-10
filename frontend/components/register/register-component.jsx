import axios from "axios"
import React from 'react'
import config from "../../config"
import {useRouter}  from 'next/router';

const RegisterComponent = () => {
    const router = useRouter()
    let [username, setUsername] = React.useState("") // state hook
    let [password, setPassword] = React.useState("") // state hook
    const onSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            "username": username,
            "password": password
        }
        console.log(payload)
        await axios.post(`${config.urlBackend}/register`, payload)
        .then(res => {
          alert("Berhasil terdaftar!")
          router.push(`${config.urlFrontend}/login`)
          console.log(res)
        }).catch(error => {
            console.log(error)
            alert("ID tidak valid")
        });
    }
    return(
        <div className="container" style={{marginTop: "10vw", width: "40vw", justifyContent: "center", backgroundColor: "rgba(204, 204, 204, 0.1)", borderRadius: "20px", padding: "2vw"}}>
            <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                <li class="nav-item" role="presentation">
                    <a class="nav-link" id="tab-login" data-mdb-toggle="pill" href="/login" role="tab"
                    aria-controls="pills-login" aria-selected="false">Login</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link active" id="tab-register" data-mdb-toggle="pill" href="/register" role="tab"
                    aria-controls="pills-register" aria-selected="true">Register</a>
                </li>
            </ul>
            <div class="tab-pane fade show active" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                <form>
                    <div class="form-outline mb-4">
                        <input onChange={(e) => setUsername(e.target.value)} type="text" id="id" class="form-control" />
                        <label style={{color: "whitesmoke"}} class="form-label">ID</label>
                    </div>

                    <div class="form-outline mb-4">
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" class="form-control" />
                        <label style={{color: "whitesmoke"}} class="form-label" for="registerPassword">Password</label>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block mb-3" onClick={onSubmit}>Sign up</button>
                    <div class="text-right" style={{color: "whitesmoke"}}>
                        <p><a href="/" style={{color: "white"}}>Back to homepage</a></p>
                    </div>
                    </form>
                </div>
        </div>
    )
}

export default RegisterComponent;