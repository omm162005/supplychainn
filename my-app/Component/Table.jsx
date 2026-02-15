export default({setCreateShipmentModal,allShipmentsdata})=>{
  const convertTime=(time)=>{
    const NewTime=new Date(time*1000);
    const dataTime= new Intl.DateTimeFormat("en-US",{
        year:"numeric",
        month:"2-digit",
        day:"2-digit",
    }).format(NewTime);
    return dataTime;
  };

  console.log(allShipmentsdata);
  return(
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div>
        <h1 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Create Tracking
        </h1>
        <p className="text-gray-600 mt-2 ">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        </p>
        </div>
        <div className="mt-3 md:mt-0">
          
          <button
          onClick={() => setCreateShipmentModal(true)}
          href="javascript:void(0)"
          className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 hover:bg-gray-700 
          active:bg-gray-900 md:text-sm rounded-lg md:inline-flex  cursor-pointer">
            

            Add Tracking
            </button>
          
        </div>
        </div>
        
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Sender</th>
                <th className="py-3 px-6">Receiver</th>
                <th className="py-3 px-6">PickupTime</th>
                <th className="py-3 px-6">DeliveryTime</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Paid</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Distance</th>
              </tr>
            </thead>

            <tbody className="text-gray-600 divide-y">
              {allShipmentsdata?.map((shipment, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.sender.slice(0, 15)}...{shipment.sender.slice(-4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.receiver.slice(0, 15)}...{shipment.receiver.slice(-4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {convertTime(shipment.PriceickupTime)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.deliveryTime} 
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.status==0 ? "Not Started" : shipment.status==1 ? "In Transit" : "Delivered"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.isPaid ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.distance} KM
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
  );
};



                


        
