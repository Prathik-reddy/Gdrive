import React from 'react'
import { useState } from "react"
import axios from "axios"
import "./FileUpload.css"
const FileUpload = ({ contract, account, provider }) => {

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No Image selected")

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "87643cf90aaad0338c8d",//3ebb1994c8da22704dad
            pinata_secret_api_key: "60a370b5185f0a6ce92e59b4f08b03adc0e836b7f94e61cc6a4bc871bb35370a",
            //ce8e1830f75bab989004c14bf1baf2897eac73b2b75b8b77b3f0be23a7a35578
            "Content-Type": "multipart/form-data",
          },
        })

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        // contract.add(account, ImgHash);
        const signer = contract.connect(provider.getSigner());
        signer.add(account, ImgHash);
        alert("Image successfully uploaded");
        setFileName("No Image Selected")
        setFile(null);

      } catch (error) {
        alert(error)
      }
    }

  }

  const retrieveFile = async (e) => {
    const data = e.target.files[0];
    console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    }

    setFileName(e.target.files[0].name);
    e.preventDefault();
  }

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">Choose Image</label>
        <input disabled={!account} type="file" id="file-upload" name="data" onChange={retrieveFile} />
        <span className="textArea">Image : {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>Upload File</button>
      </form>
    </div>
  )
}

export default FileUpload