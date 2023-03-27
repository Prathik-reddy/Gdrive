import React from 'react'
import { useState } from "react";
import "./Display.css"
const Display = ({ contract, account }) => {

  const [data, setData] = useState("");

  const getData = async () => {
    let dataArray;
    const otherAddress = document.querySelector(".address").value;

    try {
      if (otherAddress) {
        dataArray = await contract.display(otherAddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
        console.log(dataArray);
      }
    } catch (error) {
      alert("you dont have access on this address")
    }
    const isEmpty = Object.keys(dataArray).length === 0;
    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      console.log(str_array);

      const images = str_array.map((item, i) => {
        console.log("this is : " + item);
        return (
          <a href={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`} key={i} target="_blank" rel="noreferrer">
            <img src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`} alt="new" className="image-list" />
          </a>
        )
      })
      setData(images)
    } else {
      alert("NO images found");
    }



  }

  return (
    <>
      <div className="image-list">{data}</div>
      <input type="text" placeholder="Enter Address" className="address"></input>
      <button className="center button" onClick={getData}>Get Data</button>
    </>
  )
}

export default Display