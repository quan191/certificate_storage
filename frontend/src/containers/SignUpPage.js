import React, { Component, useEffect, useState } from 'react';
import Web3 from 'web3';
import Certificate from '../contracts/contracts/Certificate.json';

const SignUpPage = () => {
    const [name, setName] = useState('')
    const [role,setRole] = useState(4);
    // const[register,setRegistered] = useState(registered);

    //const ipfs = require('nano-ipfs-store').at('https://ipfs.infura.io:5001')
    const [web3, setWeb3] = useState(undefined);
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState([]);
    const [issuerRegistered, setIssuer] = useState(false)
    const [recipientRegistered, setRecipient] = useState(false)
    useEffect(() => {
      const init = async () => {
        var provider;
        if (window.ethereum) {
          provider = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          provider = new Web3(window.web3.currentProvider)
        }
        else {
          provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
        }
        const web3 = provider;
        const accounts = await web3.eth.getAccounts();
        setWeb3(web3);
        setAccount(accounts[0]);
        console.log(accounts);
        const networkId = await web3.eth.net.getId()
        console.log(networkId);
        const networkData = Certificate.networks[networkId]
        if (networkData) {
          const certiContract = new web3.eth.Contract(Certificate.abi, networkData.address)
          setContract(certiContract)
          certiContract.methods.checkIssuer(accounts[0]).call().then(result => setIssuer(result))
          certiContract.methods.checkRecipient(accounts[0]).call().then(result => setRecipient(result))
        } else {
          window.alert("contract not deployed to detected network")
        }
  
      }
      init()
    }, [])
    const signUp = async (event) => {
        event.preventDefault()
        await contract.methods.signUp(name,role).send({ from: account }).then(result => console.log(result));
        
    }

    return (
        <div>
            <h3 className="title is-3">Register form</h3>
            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Enter your Name" onChange={(e) => { setName(e.target.value) }} />
                </div>
            </div>
            <div className="field">
                <label className="label">Role</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Enter your Role number" onChange={(e) => { setRole(parseInt(e.target.value)) }} />
                </div>
            </div>
            <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-primary" onClick={signUp}>Submit</button>
                    </div>
                </div>
        </div>
    );
}

export default SignUpPage;
