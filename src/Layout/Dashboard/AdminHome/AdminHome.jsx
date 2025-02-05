import React from "react";
import useAuth from "../../../hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoWallet } from "react-icons/io5";
import { FaShop } from "react-icons/fa6";
import { MdWifiCalling3 } from "react-icons/md";
import { FaTruck, FaUsers } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = [] } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      console.log(res.data);
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  const data = [
    { name: "Users", value: stats.users },
    { name: "Menu Items", value: stats.menuItems },
    { name: "Orders", value: stats.orders },
    { name: "Revenue", value: stats.revenue },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  console.log("stats data......", data);

  return (
    <div>
      <div>
        <h2 className="mb-4 text-xl font-semibold">
          Hi, Welcome{" "}
          <span>{user?.displayName ? user?.displayName : "Back"}</span>
        </h2>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {/* counter statistics card start */}
          {/* card 1 - Revenue */}
          <div className="card bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] text-white">
            <div className="flex gap-3 justify-center items-center p-8 text-center">
              <IoWallet className="size-10"></IoWallet>
              <div>
                <p className="font-bold text-3xl text-left">
                  ${stats?.revenue}
                </p>
                <p className="text-left">Revenue</p>
              </div>
            </div>
          </div>

          {/* card 2 - Customers */}
          <div className="card bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] text-white">
            <div className="flex gap-3 justify-center items-center p-8 text-center">
              <FaUsers className="size-10"></FaUsers>
              <div>
                <p className="font-bold text-3xl text-left">{stats?.users}</p>
                <p className="text-left">Customers</p>
              </div>
            </div>
          </div>

          {/* card 3 - Products */}
          <div className="card bg-gradient-to-r from-[#FE4880] to-[#FECDE9] text-white">
            <div className="flex gap-3 justify-center items-center p-8 text-center">
              <MdWifiCalling3 className="size-10"></MdWifiCalling3>
              <div>
                <p className="font-bold text-3xl text-left">
                  {stats?.menuItems}
                </p>
                <p className="text-left">Products</p>
              </div>
            </div>
          </div>
          {/* card 4 - Orders */}
          <div className="card bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF] text-white">
            <div className="flex gap-3 justify-center items-center p-8 text-center">
              <FaTruck className="size-10"></FaTruck>
              <div>
                <p className="font-bold text-3xl text-left">{stats?.orders}</p>
                <p className="text-left">Orders</p>
              </div>
            </div>
          </div>
        </div>
        {/* counter statistics card end */}

        {/* profile statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            {/* <h2>Bar Chart - Detailed Statistics</h2> */}
            <BarChart
              width={600}
              height={300}
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Pie Chart */}
              {/* <h2>Pie Chart - Overview</h2> */}
              <PieChart width={400} height={400}>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>

              {/* Bar Chart */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
