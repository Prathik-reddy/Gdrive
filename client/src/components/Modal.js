import React from 'react'
import { useEffect } from 'react'
import "./Modal.css"
const Modal = ({ setModalOpen, contract }) => {

  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    console.log("shared");
    setModalOpen(false);

  }
  const revokeAccess = async () => {
    const address = document.querySelector("#selectNumber").value;
    console.log(address);
    await contract.disallow(address);

    console.log("revokeAccess");
    setModalOpen(false);
  }

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      console.log(addressList);
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i][0];
        if (options[i][1]) {
          let e1 = document.createElement("option");
          e1.textContent = opt;
          e1.value = opt;
          select.appendChild(e1);
        }
      }
    }
    contract && accessList();
  }, [])

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">Share With</div>
        <div className="body">
          <input type="text" className="address" placeholder="Enter Address" />
        </div>
        <form id="myForm">
          <select id="selectNumber">
            <option className='address'>People with access</option>
          </select>
        </form>
        <div className="footer">
          <button onClick={() => { setModalOpen(false) }} id="cancelBtn">Cancel</button>
          <button onClick={() => sharing()} >Share</button>
          <button onClick={() => revokeAccess()} >Revoke</button>
        </div>
      </div>
    </div>
  )
}

export default Modal