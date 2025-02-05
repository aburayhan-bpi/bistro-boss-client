import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle";
import { FaUtensils, FaUtensilSpoon } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_IMAGEBB_HOSTING_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    // image upload to imagebb then get an image url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(res.data);
    if (res.data.success) {
      const menuItem = {
        name: data?.name,
        category: data?.category,
        price: parseFloat(data.price),
        recipe: data?.recipe,
        image: res.data?.data?.display_url,
      };
      const menuRes = await axiosSecure.post("/menu", menuItem);
      // console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        Swal.fire({
          title: "Item added!",
          text: `${data?.name} has been added to menu!`,
          icon: "success",
        });
        reset();
      }
      // console.log(menuItem);
    }
  };

  return (
    <div>
      <div className="-mt-10">
        <SectionTitle
          heading={"Add an item"}
          subHeading={"What's new?"}
        ></SectionTitle>
      </div>
      <div className="bg-[#E8E8E8] shadow-lg p-10 max-w-7xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* recipe name */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">Recipe name*</span>
            </div>
            <input
              {...register("name", { required: true })}
              type="text"
              name="name"
              placeholder="Recipe name"
              className="input w-full rounded-md"
            />
            {errors.name?.type === "required" && (
              <p role="alert" className="text-red-500 mt-1 ml-1">
                Recipe name is required
              </p>
            )}
          </label>

          <div className="grid md:grid-cols-2 justify-between gap-10 mt-4">
            {/* category */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">Cateogry*</span>
              </div>
              <select
                {...register("category", { required: "Category is required" })}
                className="select w-full rounded-md"
                defaultValue=""
              >
                <option disabled value="">
                  Category?
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
              {errors.category && (
                <p role="alert" className="text-red-500 mt-1 ml-1">
                  Category is required
                </p>
              )}
            </label>
            {/* price */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">Price*</span>
              </div>
              <input
                {...register("price", { required: true })}
                type="number"
                name="price"
                placeholder="Price"
                className="input w-full rounded-md"
              />
              {errors.price?.type === "required" && (
                <p role="alert" className="text-red-500 mt-1 ml-1">
                  Price is required
                </p>
              )}
            </label>
          </div>
          <div className="mt-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">
                  Recipe details*
                </span>
              </div>
              <textarea
                {...register("recipe", { required: true })}
                placeholder="Recipe details"
                className="textarea w-full rounded-md"
              ></textarea>
              {errors.name?.type === "required" && (
                <p role="alert" className="text-red-500 mt-1 ml-1">
                  Recipe details is required
                </p>
              )}
            </label>
          </div>
          {/* file */}
          <div className="mt-4">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-semibold">Pick a file*</span>
              </div>
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
              />
              {errors.image?.type === "required" && (
                <p role="alert" className="text-red-500 mt-1 ml-1">
                  Photo is required
                </p>
              )}
            </label>
          </div>
          <button
            className="btn bg-gradient-to-r from-[#835D23] to-[#B58130] text-white mt-4 rounded-none text-base"
            type="submit"
          >
            Add Item <FaUtensils></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
