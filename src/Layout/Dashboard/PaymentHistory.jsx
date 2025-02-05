import React from "react";
import SectionTitle from "../../components/SectionTitle";
import useAuth from "../../hooks/useAuthContext";
import usePaymentHistory from "../../hooks/usePaymentHistory";
import { FaRegTrashAlt, FaUsersCog } from "react-icons/fa";
import moment from "moment";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  //   const axiosSecure = useAxiosSecure();
  const [paymentHistory] = usePaymentHistory();

  return (
    <div>
      <div>
        <div>
          <div>
            <div className="flex justify-center -mt-14">
              <SectionTitle
                heading={"Payment History"}
                subHeading={"At A Glance!"}
              ></SectionTitle>
            </div>
            <div className="flex justify-start ml-4 my-4">
              <h2 className="text-xl font-semibold uppercase">
                Total payments: {paymentHistory.length}
              </h2>
            </div>
            <div>
              <div className="overflow-x-auto mx-4 shadow-xl">
                <table className="table overflow-hidden">
                  {/* head */}
                  <thead className="bg-yellow-600 text-white">
                    <tr className="">
                      <th></th>
                      <th>EMAIL</th>
                      <th>CATEGORY</th>
                      <th>TOTAL PRICE</th>
                      <th>PAYMENT DATE</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.length === 0 ? (
                      <p>No data vailable</p>
                    ) : (
                      paymentHistory.map((singleData, index) => (
                        <tr key={singleData?._id}>
                          <td className="font-semibold">{1 + index}</td>

                          <td>
                            <h2>{singleData?.email}</h2>
                          </td>
                          <td className="opacity-75">
                            {singleData?.category
                              ? singleData.category
                              : "Food Order"}
                          </td>
                          <td className="opacity-75">${singleData?.price}</td>
                          <td className="opacity-75">
                            {moment(singleData?.date).format(
                              "dddd, MMMM D, YYYY"
                            )}
                          </td>
                          <td className="">
                            <p className="p-1 bg-green-100 text-center rounded-md text-green-700">
                              Paid
                            </p>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
