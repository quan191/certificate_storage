import React, { Component, useEffect, useState } from 'react';
import Web3 from 'web3';

import Certificate from '../contracts/contracts/Certificate.json';
const web3 = new Web3(Web3.givenProvider);
const IssuePage = () => {
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
  
    // const ipfs = require('nano-ipfs-store').at('https://ipfs.infura.io:5001');
    const [address,setAddress]=useState('');
    const [title,setTitle]=useState('');
    const [buffer,setBuffer]=useState('');
    const [ipfsHash,setHash]=useState('');
    const captureFile=(event)=>{
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            setBuffer(Buffer(reader.result));
        }
    }
    const issueCertificate = async(event)=>{
        event.preventDefault();
        await contract.methods.issueCertificate(address,title,"",1).send({ from: account }).then(r => console.log(r));
        // await ipfs.add(buffer, (error, result) => {
        //     if(error) {
        //       console.error(error)
        //       return
        //     }
        //     setHash(result[0].hash);
        //     })
        // await contract.methods.issueCertificate(address,title,ipfsHash,1).send({ from: account }).then(r => console.log(r));
        // console.log("hello",ipfsHash);
          }
    
    return (
        <div>
            <h3 className="title is-3">Issue Certificate</h3>
            <div className="field">
                <label className="label">Recipient Address</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Enter recipient Address" onChange={(e) => { setAddress(e.target.value) }} />
                </div>
            </div>
            <div className="field">
                <label className="label">Certificate title</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Enter your certificate title" onChange={(e) => { setTitle(e.target.value) }} />
                </div>
            </div>
            <h2>UPLOAD CERTIFICATE IMAGE</h2>
            
                <input type='file' onChange={captureFile} />
        
            <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-primary" onClick={issueCertificate}>Submit</button>
                    </div>
                </div>
        </div>
    );
}

export default IssuePage;
