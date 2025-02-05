import React, { useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import Rating from "react-rating";
import { useForm } from "react-hook-form";
import { FaRocket } from "react-icons/fa6";
import { RxRocket } from "react-icons/rx";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuthContext";

const Review = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [star, setStar] = useState(5);
  console.log(star);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const reviewData = {
      name: user?.displayName,
      email: user?.email,
      likedRecipe: data?.favrecipe,
      suggestion: data?.suggestion,
      details: data?.reviewdetails,
      rating: star,
    };
    console.log(reviewData);

    axiosPublic.post("/reviews", reviewData).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          title: "Review complete!",
          text: "Thanks for giving us review!",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <SectionTitle
        heading={"Give a review"}
        subHeading={"Sharing Is Caring"}
      ></SectionTitle>
      <div className="bg-gray-100 p-6">
        <div>
          <h2 className="text-center font-semibold pt-4 text-4xl">Rate Us!</h2>
          <div className="flex justify-center mt-6">
            <div className="rating rating-lg">
              {[1, 2, 3, 4, 5].map((star, index) => (
                <input
                  key={index}
                  type="radio"
                  name="rating-9"
                  value={star}
                  onChange={() => setStar(star)}
                  className="mask mask-star-2"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mx-32 mt-8">
          {" "}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* which recipe you like most */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">
                  Which recipe you like most?
                </span>
              </div>
              <input
                type="text"
                {...register("favrecipe", { required: true })}
                placeholder="Recipe you like most"
                className="input w-full"
              />
              {errors.favrecipe && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </label>
            {/* do you have any suggestion for us */}
            <label className="form-control w-full mt-4">
              <div className="label">
                <span className="label-text font-semibold">
                  Do you have any suggestion for us?
                </span>
              </div>
              <input
                type="text"
                {...register("suggestion", { required: true })}
                placeholder="Suggestion"
                className="input w-full"
              />
              {errors.suggestion && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </label>
            {/* review textarea */}
            <label className="form-control w-full mt-4">
              <div className="label">
                <span className="label-text font-semibold">
                  Kindly express you care in a short story?
                </span>
              </div>
              <textarea
                placeholder="Review in details"
                {...register("reviewdetails", { required: true })}
                className="textarea textarea-bordered textarea-lg w-full "
              ></textarea>{" "}
              {errors.reviewdetails && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </label>

            <button
              className="btn bg-gradient-to-r from-[#835D23] to-[#B58130] text-white mt-4 rounded-none text-base"
              type="submit"
            >
              Send Review <BsFillRocketTakeoffFill></BsFillRocketTakeoffFill>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Review;
