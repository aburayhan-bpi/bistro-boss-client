import React from "react";
import Banner from "./Banner";
import Category from "./Category";
import PopularMenu from "./PopularMenu";
import Featured from "./Featured/Featured";
import Testimonials from "./Testimonials/Testimonials";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div className="px-3 md:px-0">
      <Helmet>
        <title>Bistro Boss | Home</title>
      </Helmet>
      <div className="">
        <Banner></Banner>
      </div>
      <section className="max-w-5xl mx-auto">
        <Category></Category>
      </section>
      <section className="max-w-5xl mx-auto px-4">
        <PopularMenu></PopularMenu>
      </section>
      <section className="">
        <Featured></Featured>
      </section>
      <section className="max-w-5xl mx-auto">
        <Testimonials></Testimonials>
      </section>
    </div>
  );
};

export default Home;
