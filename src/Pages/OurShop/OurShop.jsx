import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import coverImg from "../../assets/shop/banner2.jpg";
import Cover from "../Shared/Cover";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../hooks/useMenu";
import FoodCard from "../Shared/FoodCard";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuthContext";
const OurShop = () => {
 
  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
  const { category } = useParams();
  const initalIndex = categories.indexOf(category);

  const [tabIndex, setTabIndex] = useState(initalIndex);

  const [menu] = useMenu();

  const dessert = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const offered = menu.filter((item) => item.category === "offered");
  const drinks = menu.filter((item) => item.category === "drinks");

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Our Shop</title>
      </Helmet>

      <Cover image={coverImg} title={"Our Shop"}></Cover>

      <div className="max-w-6xl mx-auto px-4">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <div className="max-w-sm mx-auto my-6">
            {" "}
            <TabList>
              <Tab>Salad</Tab>
              <Tab>Pizza</Tab>
              <Tab>Soups</Tab>
              <Tab>Desserts</Tab>
              <Tab>Drinks</Tab>
            </TabList>
          </div>
          <TabPanel>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {salad.length === 0
                ? "No Items Available Right Now!"
                : salad.map((item) => (
                    <FoodCard key={item._id} item={item}></FoodCard>
                  ))}
            </div>
          </TabPanel>
          <TabPanel>
            {" "}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {pizza.length === 0
                ? "No Items Available Right Now!"
                : pizza.map((item) => (
                    <FoodCard key={item._id} item={item}></FoodCard>
                  ))}
            </div>
          </TabPanel>
          <TabPanel>
            {" "}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {soup.length === 0
                ? "No Items Available Right Now!"
                : soup.map((item) => (
                    <FoodCard key={item._id} item={item}></FoodCard>
                  ))}
            </div>
          </TabPanel>
          <TabPanel>
            {" "}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {dessert.length === 0
                ? "No Items Available Right Now!"
                : dessert.map((item) => (
                    <FoodCard key={item._id} item={item}></FoodCard>
                  ))}
            </div>
          </TabPanel>
          <TabPanel>
            {" "}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {drinks.length === 0
                ? "No Items Available Right Now!"
                : drinks.map((item) => (
                    <FoodCard key={item._id} item={item}></FoodCard>
                  ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default OurShop;
