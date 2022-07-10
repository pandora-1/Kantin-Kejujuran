import axios from "axios"
import React from 'react'
import config from "../../config"
import {useRouter}  from 'next/router';

const LoginRegisterComponent = () => {
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
        await axios.post(`${config.urlBackend}/login`, payload)
        .then(res => {
          alert("Berhasil login!")
          console.log(res)
          if (typeof window !== 'undefined') {
            localStorage.setItem("token",res.data.token)
            router.push(`${config.urlFrontend}`)
          }
        }).catch(error => alert("ID / Password salah!"));
    }
    return(
    <div className="container" style={{marginTop: "10vw", width: "40vw", justifyContent: "center", backgroundColor: "rgba(204, 204, 204, 0.1)", borderRadius: "20px", padding: "2vw"}}>
        <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
            <li class="nav-item" role="presentation">
                <a class="nav-link active" id="tab-login" data-mdb-toggle="pill" href="/login" role="tab"
                aria-controls="pills-login" aria-selected="true">Login</a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link" id="tab-register" data-mdb-toggle="pill" href="/register" role="tab"
                aria-controls="pills-register" aria-selected="false">Register</a>
            </li>
            </ul>

            <div class="tab-content">
            <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                <form>
                <div class="form-outline mb-4">
                    <input onChange={(e) => setUsername(e.target.value)} type="email" id="username" class="form-control" />
                    <label style={{color: "whitesmoke"}} class="form-label" for="loginName">ID</label>
                </div>

                <div class="form-outline mb-4">
                    <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" class="form-control" />
                    <label style={{color: "whitesmoke"}} class="form-label" for="loginPassword">Password</label>
                </div>

                <button onClick={onSubmit} type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>

                <div class="text-center" style={{color: "whitesmoke"}}>
                    <p>Not a member? <a href="/register" style={{color: "white"}}>Register</a></p>
                </div>
                <div class="text-right" style={{color: "whitesmoke"}}>
                    <p><a href="/" style={{color: "white"}}>Back to homepage</a></p>
                </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default LoginRegisterComponent;