import React,{useState,useEffect, useContext} from "react";
// internal import
import{
    Table,
    Form,
    Services,
    Profile,
    Completeshipment,
    GetShipment,StartShipment,

}  from "../Component";

import { TrackingContext } from "../Context/Tracking.js";

const index=() => {

     const {currentUser,
    createShipment,
    getALLShipments,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentCount,}=useContext(TrackingContext);

        //State variable
        const [createShipmentModal,setCreateShipmentModal]=useState(false);
        const [openProfile,setOpenProfile]=useState(false);
        const [startModal,setStartModal]=useState(false);
        const[completeModal,setCompleteModal]=useState(false);
        const[getModal,setGetModal]=useState(false);

        //DAta state variable
        const [allShipment,setAllShipmentdata]=useState([]);
       useEffect(() => {
    const loadShipments = async () => {
        const data = await getALLShipments();
        setAllShipmentdata(data);
    };

    loadShipments();
}, []);

    return(
         <>
         <Services
         setOpenProfile={setOpenProfile}
         setCompleteModal={setCompleteModal}
         setGetModal={setGetModal}
         setStartModal={setStartModal}
         />

         <Table
         setCreateShipmentModal={setCreateShipmentModal}
            allShipmentsdata={allShipment}
            />

            <Form
            createShipmentModal={createShipmentModal}
            createShipment={createShipment}
            setCreateShipmentModal={setCreateShipmentModal}
            />

            <Profile
            openProfile={openProfile}
            setOpenProfile={setOpenProfile}
            currentUser={currentUser}
            getShipmentCount={getShipmentCount}
            />

            <Completeshipment
            completeModal={completeModal}
            setCompleteModal={setCompleteModal}
            completeShipment={completeShipment}
            />

            <GetShipment
            getModal={getModal}
            setGetModal={setGetModal}
            getShipment={getShipment}
            />

            <StartShipment  
            startModal={startModal}
            setStartModal={setStartModal}
            startShipment={startShipment}
            />
            </>
    );
};
export default index;

