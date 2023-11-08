const Banner = () => {
  return (
    <div className=" p-2 overflow-hidden ">
      <div data-aos="fade-left" className=" mt-10 mb-10   bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse p-10">
          <img
            src="https://i.ibb.co/n89prrw/serving-food-960x400px.jpg"
            className="max-w-xl rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-3xl font-light">
              Sharing Abundance,
              <br />
              <span className="text-[#32a374] font-bold">
                {" "}
                Eliminating Hunger.
              </span>
            </h1>
            <p className="py-6 font-light ">
              At ZeroHunger, we are on a mission to create a world where no one
              has to go to bed hungry. Our platform is a hub for communities to
              come together and share surplus food,
              <span className="text-[#57b38d] font-semibold italic"> reducing waste</span> and
              alleviating food insecurity. We believe that food should be
              shared, not wasted, and that every meal can make a difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
