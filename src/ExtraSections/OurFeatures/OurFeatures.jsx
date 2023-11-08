import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlFood,
  faCheckCircle,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

const FeatureCard = ({ title, description, icon }) => (
  <div className="border text-white max-w-sm mx-auto m-4 bg-base shadow-md rounded-lg overflow-hidden ">
    <div className="text-center py-4">
      <FontAwesomeIcon icon={icon} className="text-4xl text-white" />
    </div>
    <div className="px-6 py-4">
      <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
      <p className="text-white">{description}</p>
    </div>
  </div>
);

const OurFeatures = () => {
  return (
    <div className="my-20 ">
      <h2 className="text-center mb-3 text-4xl font-medium ">Our Features</h2>
      <p className="text-center text-xl font-normal">
        We always ensure the following things
      </p>
      <hr
        className="mx-auto m-10"
        width="50%"
        color="blue"
        size="2"
        align="center"
      />
      <div className="text-center m-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-center">
        <FeatureCard
          title="Variety of Foods"
          description="In this community we work with variety of foods"
          icon={faBowlFood}
        />
        <FeatureCard
          title="Quality Maintenance"
          description="We ensure the highest quality of food we deliver"
          icon={faCheckCircle}
        />
        <FeatureCard
          title="Quick Delivery System"
          description="Foods ordered here are quickly delivered."
          icon={faTruck}
        />
      </div>
    </div>
  );
};

export default OurFeatures;
