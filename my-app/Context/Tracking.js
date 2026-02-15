import React, { useState,useEffect,createContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

// internal import

import tracking from "../Context/Tracking.json";
const TrackingAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const TrackingABI = tracking .abi;

//----fetching smart contract function----//
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(TrackingAddress, TrackingABI, signerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {

    // STATE VARIABLE
    const DappName = "Tracking Dapp";
    const [currentUser, setCurrentUser]= useState("");

    const createShipment = async(items) => {
        console.log(items);
        const {receiver, pickupTime, distance,price }= items;
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const createItem= await contract.createShipment(
                receiver,
                Math.floor(new Date(pickupTime).getTime() / 1000),
                distance,
                ethers.utils.parseUnits(price, 18) ,
                {
                    value: ethers.utils.parseUnits(price, 18),
                }
                

                
            );
            await createItem.wait();
            
             window.location.reload();
            console.log(createItem);
            console.log("Creating shipment:", items);

        }  catch (error) {
            console.log("Something went wrong while creating shipment", error);
            console.error(error);


    }

};

    const getALLShipments = async() => {
        try {
           const provider = new ethers.providers.Web3Provider(window.ethereum);

            const contract = fetchContract(provider);
            const shipments = await contract.getAllShipments();
            const allShipments = shipments.map((shipment) => ({
                sender: shipment.sender,
                receiver: shipment.receiver,
                price: ethers.utils.formatUnits(shipment.price.toString(), 18),
                pickupTime: shipment.pickupTime.toNumber(),
                deliveryTime: shipment.deliveryTime.toNumber(),
                distance: shipment.distance.toNumber(),
                isPaid: shipment.isPaid,
                status: shipment.status,
            }));
            return allShipments;
        }       catch (error) {
            console.log("Something went wrong while fetching shipments", error);
        }
    };

   const getShipmentCount = async() => {
        try {
            if (!window.ethereum) return "Install MetaMask";
            
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
           
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const contract = fetchContract(provider);
            const shipmentCount = await contract.getShipmentCount(accounts[0]);
            return shipmentCount.toNumber();
        } catch (error) {
            console.log("Something went wrong while fetching shipment count", error);
        }
    };

    const completeShipment = async (completeShip) => {
        console.log(completeShip);
         
        const {receiver,index}= completeShip;
        try {
            if (!window.ethereum) return "Install MetaMask";

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const transaction = await contract.completeShipment(
                accounts[0],
                receiver,
                index,
                {
                    gasLimit : 300000,
                }
            );
             await transaction.wait();
            console.log(transaction);
        }
            catch (error) {
            console.log("Something went wrong while completing shipment", error);
            }
        };

        const getShipment = async (index) => {
            console.log(index*1);
            try {
                if (!window.ethereum) return "Install MetaMask";

                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                const provider = new ethers.providers.Web3Provider(window.ethereum);

                const contract = fetchContract(provider);
                const shipment = await contract.getShipment(accounts[0], index*1);  

                const SingleShipment = {
                    sender: shipment[0],
                    receiver: shipment[1],
                    pickupTime: shipment[2].toNumber(),
                    deliveryTime: shipment[3].toNumber(),
                    distance: shipment[4].toNumber(),
                    price: ethers.utils.formatUnits(shipment[5].toString(), 18),
                    status: shipment[6],
                    isPaid: shipment[7],
                };
                return SingleShipment;
            }
            catch (error) {
                console.log("Sorry no Shipment", error);
            }
        };

        const startShipment = async (getProdect) => {

            const {receiver,index}= getProdect;
            try {
                if (!window.ethereum) return "Install MetaMask";
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                const web3Modal = new Web3Modal();
                const connection = await web3Modal.connect();
                const provider = new ethers.providers.Web3Provider(connection);
                const signer = provider.getSigner();        
                const contract = fetchContract(signer);
                const shipment= await contract.startShipment(
                    accounts[0],
                    receiver,
                    index*1,
                   
                );
                 await shipment.wait();
                console.log(shipment);
            }
                catch (error) {
                console.log("sorry no shipment", error);
                }

        };


        // check wallet is connected
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) return alert("Please install MetaMask.");

            const accounts = await window.ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentUser(accounts[0]);
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log("Something went wrong while connecting to wallet", error);
        }
    };

    //connect wallet function
    const connectWallet = async () => {
        try {
            if (!window.ethereum) return alert("Please install MetaMask."); 

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setCurrentUser(accounts[0]);
        } catch (error) {
            console.log("Something went wrong while connecting to wallet", error);
        }
    };

    useEffect(() => {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setCurrentUser(accounts[0]);
      } else {
        setCurrentUser("");
      }
    });
  }
}, []);


    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    return (
        <TrackingContext.Provider
            value={{
                connectWallet,
                createShipment,
                getALLShipments,
                getShipmentCount,
                completeShipment,   
                getShipment,
                startShipment,
                DappName,
                currentUser,
            }}
        >
            {children}
        </TrackingContext.Provider>
    );




            
}
