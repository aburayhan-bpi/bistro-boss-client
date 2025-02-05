import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover";
import menuImage from "../../assets/menu/banner3.jpg";
import dessertImage from "../../assets/menu/dessert-bg.jpeg";
import pizzaImage from "../../assets/menu/pizza-bg.jpg";
import saladImage from "../../assets/menu//salad-bg.jpg";
import soupImage from "../../assets/menu/soup-bg.jpg";
import PopularMenu from "../Home/PopularMenu";
import useMenu from "../../hooks/useMenu";
import SectionTitle from "../../components/SectionTitle";
import MenuCategory from "./MenuCategory/MenuCategory";
import { AuthContext } from "../../Providers/AuthProvider";
import useAuth from "../../hooks/useAuthContext";

const OurMenu = () => {
  const [menu] = useMenu();

  // const { user } = useContext(AuthContext);
  // const { user } = useAuth();
  // console.log(user?.email);

  const dessert = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const offered = menu.filter((item) => item.category === "offered");
  // console.log(offered);
  return (
    <div className="">
      <Helmet>
        <title>Bistro Boss | Our Menu</title>
      </Helmet>
      <Cover image={menuImage} title={"Our Menu"}></Cover>
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          subHeading={"Don't miss"}
          heading={"Today's Offer"}
        ></SectionTitle>
        <MenuCategory items={offered} title={"offered"}></MenuCategory>
        <div className="mt-20">
          {/* dessert menu items */}
          <div className="mb-16">
            <Cover image={dessertImage} title={"Desserts"}></Cover>
          </div>

          <MenuCategory items={dessert} title={"dessert"}></MenuCategory>
        </div>
        <div className="mt-20">
          {/* dessert menu items */}
          <div className="mb-16">
            <Cover image={pizzaImage} title={"Pizza"}></Cover>
          </div>

          <MenuCategory items={pizza} title={"pizza"}></MenuCategory>
        </div>
        <div className="mt-20">
          {/* dessert menu items */}
          <div className="mb-16">
            <Cover image={saladImage} title={"Salad"}></Cover>
          </div>

          <MenuCategory items={salad} title={"salad"}></MenuCategory>
        </div>
        <div className="mt-20">
          {/* dessert menu items */}
          <div className="mb-16">
            <Cover image={soupImage} title={"Soup"}></Cover>
          </div>

          <MenuCategory items={soup} title={"soup"}></MenuCategory>
        </div>
      </div>
    </div>
  );
};

export default OurMenu;
