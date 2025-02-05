import React, { useState } from "react";
import OurLocation from "./OurLocation";
import SectionTitle from "../../../../components/SectionTitle";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { FaClipboardList } from "react-icons/fa6";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuthContext";

const Reservation = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue, // Allows us to programmatically set field values
  } = useForm();

  const [time, setTime] = useState("10:00");
  const [startDate, setStartDate] = useState(new Date());

  const onSubmit = (data) => {
    console.log({
      ...data,
      time, // Include time selected from TimePicker
      date: startDate.toISOString().split("T")[0], // Format date for consistency
    });

    const bookingsData = {
      ...data,
      time,
      date: startDate.toISOString().split("T")[0],
      status: "pending",
    };

    axiosSecure.post("/bookings", bookingsData).then((res) => {
      if (res.data?.insertedId) {
        reset();
        Swal.fire({
          title: "Booked a table!",
          text: "Thanks for bookings!",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="">
      <SectionTitle
        heading="Book a table"
        subHeading="Reservation"
      ></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-20">
          {/* Date Picker */}
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-semibold">Date*</span>
              </div>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setValue("date", date.toISOString().split("T")[0]);
                }}
                dateFormat="yyyy-MM-dd"
                type="date"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.date && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </label>
          </div>

          {/* Time Picker */}
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-semibold">Time*</span>
              </div>
              <div className="relative">
                {/* Custom wrapper for the TimePicker */}
                <TimePicker
                  onChange={(value) => {
                    setTime(value);
                    setValue("time", value);
                  }}
                  value={time}
                  className="input input-bordered w-full"
                  clockClassName="hidden" // Hide the clock if not needed
                  disableClock // Optionally disable the clock
                />
              </div>
              {errors.time && (
                <span className="text-red-500 text-sm mt-1">
                  This field is required
                </span>
              )}
            </label>
          </div>

          {/* Guest Dropdown */}
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-semibold">Guest*</span>
              </div>
              <select
                {...register("guest", { required: true })}
                defaultValue=""
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select Guests
                </option>
                <option>1 Person</option>
                <option>2 Persons</option>
                <option>3 Persons</option>
                <option>4 Persons</option>
              </select>
              {errors.guest && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-semibold">Name*</span>
              </div>
              <input
                type="text"
                placeholder="Name"
                defaultValue={user?.displayName || "annonymouse"}
                {...register("name", { required: true })}
                className="input input-bordered w-full max-w-xs bg-gray-200"
                readOnly
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </label>
          </div>

          {/* Phone */}
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-semibold">Phone*</span>
              </div>
              <input
                type="text"
                placeholder="Phone"
                {...register("phone", { required: true })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </label>
          </div>

          {/* Email */}
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-semibold">Email*</span>
              </div>
              <input
                type="email"
                placeholder="Email"
                defaultValue={user?.email || "annonymouse@gmail.com"}
                {...register("email", { required: true })}
                className="input input-bordered w-full max-w-xs bg-gray-200"
                readOnly
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </label>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="btn bg-gradient-to-r from-[#835D23] to-[#B58130] text-white mt-4 rounded-none text-base"
            type="submit"
          >
            Book A Table <FaClipboardList className="ml-2" />
          </button>
        </div>
      </form>

      {/* Our Location section */}
      <div>
        <OurLocation />
      </div>
    </div>
  );
};

export default Reservation;
