import React, { Component, useEffect, useState } from 'react';

import Web3 from 'web3';
import Certificate from '../contracts/contracts/Certificate.json';
const RecipientCert = () => {
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
      init();
      
    }, [])
    const [cerId,setCert] = useState([]);
    const getCertificateId = async()=>{ 
        let i=[];
        await contract.methods.getCertificateIdOfUser(account).call().then((result)=>{
            console.log(result);
            i=result;
        });
        for (let k=0;k<i.length;k++){
            console.log(i[k]);
            await contract.methods.getCertificateById(i[k]).call().then((result)=>{
                console.log(result.title,",",result.recipient);
            })
        }
          }

    return (
        <div>
            
            <button className="button is-primary" onClick={getCertificateId}>GetYourCertificateInfomation</button>
            
        </div>
        
    );
}

export default RecipientCert;
