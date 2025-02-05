import SectionTitle from "../../../components/SectionTitle";
import featureImg from "../../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
  return (
    <div className="featured-item bg-fixed text-white pt-8 my-20">
      {/* <div className=""> */}
      <SectionTitle
        subHeading={"Check it out"}
        heading={"Featured Item"}
      ></SectionTitle>
      <div className="md:flex gap-10 items-center pb-20 pt-12 px-36">
        <div>
          <img src={featureImg} alt="" />
        </div>
        <div>
          <p className="">March 20, 2024</p>
          <p className="uppercase">Where can i get some?</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quam,
            ipsam esse fugit eligendi voluptatibus id. Consequatur impedit
            aliquam vero unde delectus quia obcaecati necessitatibus. Totam
            natus fuga sed dolore.
          </p>
          <button className="mt-4 rounded-lg border-black border-b-4 hover:border-white hover:bg-black hover:text-white w-36 p-1">
            Read More
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Featured;
