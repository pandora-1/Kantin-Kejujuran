import axios from "axios"
import React from 'react'
import config from "../../config"
import Router , {useRouter}  from 'next/router';


const AddItemComponent = () => {
    const router = useRouter()
    let [name, setName] = React.useState('') // state hook
    let [description, setDescription] = React.useState('') // state hook
    let [price, setPrice] = React.useState(-1) // state hook
    let [image, setImage] = React.useState(null)

    const handleSubmitItem = (e) => {
        if(name == '' || description == '' || price == -1 || image == null) {
            alert("Please fill out form")
            e.preventDefault();
        } else {
            router.push(`${config.urlFrontend}`)
        }
    }

    return(
        <form target="_blank" action={`${config.urlBackend}/items`} method="post" enctype="multipart/form-data" className="container" style={{width: "50%", marginTop: "20px", justifyContent: "center", backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "20px", padding: "20px"}}>
            <div style={{fontSize: "3vw", textAlign: "center", marginTop: "3vw", marginBottom: "3vw", color: "white"}}>Add Item</div>
            <div className="mb-3">
                <label for="name" class="form-label" style={{color: "whitesmoke"}}>Name</label>
                <input name="name" onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="name" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label for="formFile" className="form-label" style={{color: "whitesmoke"}}>Image Uploader</label>
                <input name="image" onChange={(e) => setImage(e.target.value)} className="form-control" type="file" id="file" />
            </div>
            <div className="mb-3">
                <label for="description" className="form-label" style={{color: "whitesmoke"}}>Description</label>
                <textarea type="text" name="description" onChange={(e) => setDescription(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div className="mb-3">
                <label for="price" className="form-label" style={{color: "whitesmoke"}}>Price</label>
                <input type="text" name="price" onChange={(e) => setPrice(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="price" className="form-text" style={{color: "gray"}}>Please input only number</div>
            </div>
            <button onClick={handleSubmitItem} type="submit" class="btn btn-primary">Submit</button>
        </form>
    )
}

export default AddItemComponent;