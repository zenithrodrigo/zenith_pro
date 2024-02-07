import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import moment from "moment";
import { now } from "moment/moment";

export default function Order() {
  // const { orderId } = useParams();
  const { fetchOrderDetails, order } = useUser();

  // useEffect(() => {
  //   fetchOrderDetails(orderId);
  // }, [orderId]);

  return (
    <div className="wrap-card px-1 md:px-4">
      <h1 className="text-3xl font-bold m-8">Order details</h1>     
      <div className="mx-0 shadow-lg rounded-lg overflow-hidden md:mx-10">
        <table className="w-full table-fixed">
          <caption className="justify-start caption-top text-xl font-bold m-2">
            order items
          </caption>
          <thead>
            <tr className="text-[10px] bg-gray-100 sm:text-sm md:text-md">
              {/* <th className="w-1/4 py-4 px-6 text-gray-600 font-bold uppercase">Image</th> */}
              <th className="w-1/4 py-4 px-6 text-gray-600 font-bold uppercase">order ID</th>
              <th className="w-1/4 py-4 px-6 text-gray-600 font-bold uppercase">status</th>
              <th className="w-1/4 py-4 px-6 text-gray-600 font-bold uppercase">creation Date</th>
              {/* <th className="w-1/4 py-4 px-6 text-gray-600 font-bold uppercase">Action</th> */}
            </tr>
          </thead>
          <tbody className="bg-white">
        {order && (          
            <tr className="text-[10px] border border-slate-300/75 sm:text-sm md:text-md">
              {/* <td className="grid grid-cols-2 lg:grid-cols-4">              
                <div className="flex justify-center items-center">
                  <img src={item.images.front} alt=""></img>
                </div>
                <div className="flex justify-center items-center">
                  <img src={item.images.back} alt=""></img>
                </div>  
                <div className="flex justify-center items-center">
                  <img src={item.images.left} alt=""></img>
                </div>  
                <div className="flex justify-center items-center">
                  <img src={item.images.right} alt=""></img>
                </div>                                                  
              </td> */}
              <td className="py-4 px-6 border-b border-gray-200">{order.orderId}</td>
              <td className="py-4 px-6 border-b border-gray-200">{moment(order.date).format("DD MMM YY @ HH:mm")}</td>
              <td className="py-4 px-6 border-b border-gray-200">{order.status}</td>
              {/* <td className="py-4 px-6 border-b border-gray-200"><button className="text-{8px} bg-zinc-500 text-white py-1 px-2 rounded-md md:text-sm hover:bg-zinc-400" onClick={() => deleteOneFromCart(item)}>Delete</button></td> */}
            </tr>
        )}
          </tbody>
        </table>
        {!order && (
        <>
        <p className="m-4 font-bold">No item</p>       
        <div className="flex justify-around m-8">
          <Link className="bg-cyan-400 text-white text-sm leading-6 font-medium py-1 px-4 rounded-md hover:bg-cyan-300" to={"/shop"}>Shop</Link>
        </div>  
        </>     
        )}   
        <div className="flex justify-around m-4">
        {order && (
          <>
          <Link className="bg-cyan-400 text-white text-sm leading-6 font-medium py-1 px-4 rounded-md hover:bg-cyan-300" to={"/shop"}>Shop</Link>
          {/* <button className="bg-slate-500 text-white text-sm leading-6 font-medium py-1 px-4 rounded-md hover:bg-slate-400 z-0" onClick={() => deleteAllFromCart()}>Delete All</button> */}
          </>
        )}
        </div>  
      </div>     
    </div>
  );
}
