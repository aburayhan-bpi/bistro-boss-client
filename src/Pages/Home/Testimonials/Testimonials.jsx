import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  // console.log(reviews);

  return (
    <section>
      <SectionTitle
        subHeading={"What Our Client Say"}
        heading={"Testimonials"}
      ></SectionTitle>
      <div className="">
        <Swiper
          navigation={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Navigation, Autoplay]}
          className="mySwiper cursor-pointer"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div>
                <div className="flex flex-col items-center gap-8 mx-16">
                  <div>
                    <Rating
                      style={{ maxWidth: 180 }}
                      value={review.rating}
                      readOnly
                    />
                    <div className="flex justify-center mt-6">
                      <FaQuoteLeft className="text-7xl" />
                    </div>
                  </div>
                  <p>{review.details}</p>
                  <h3 className="font-semibold text-yellow-500">
                    {review.name}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
