import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
  // const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  //   const [menu, setMenu] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   // console.log(menu)
  // //   const soup = menu.filter((item) => item.category === "soup");
  // //   console.log(soup);

  //   useEffect(() => {
  //     fetch("http://localhost:5000/menu")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setMenu(data);
  //         setLoading(false);
  //       });
  //   }, []);

  //   return [menu, loading];

  const {
    data: menu = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosPublic.get("/menu");
      return res.data;
    },
  });
  return [menu, refetch, isLoading];
};
export default useMenu;
