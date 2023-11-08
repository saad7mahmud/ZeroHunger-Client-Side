import { Link } from "react-router-dom";

const AvailableFoodsCard = ({ availableFood }) => {
  const {
    _id,
    foodName,
    foodImage,
    foodQuantityNumber,
    foodExpiryDate,
    expiryDateMs,
    foodPickUpLocation,
    foodStatus,
    additionalDonatorNotes,
    donatorName,
    donatorEmail,
    donatorImage,
  } = availableFood;

  console.log(foodName);

  return (
    <div>
      <div className="card   bg-base shadow-2xl ">
        <figure className="px-10 pt-10">
          <img src={foodImage} alt="Shoes" className="rounded-xl " />
        </figure>
        <div className="card-body  ">
          <p className="text-2xl font-bold">{foodName}</p>
          <p>
            <span className="font-bold">Food ID: </span>
            {`${_id}`}
          </p>
          <div className="flex items-center gap-2">
            <img className="w-7 rounded-full" src={donatorImage} alt="" />
            <p>
              <span className="font-bold">Donator Name: </span>
              {` ${donatorName}`}
            </p>
          </div>
          <p>
            <span className="font-bold">Food Quantity: </span>
            {`${foodQuantityNumber} Person`}
          </p>
          <p>
            <span className="font-bold">Pickup Location: </span>
            {` ${foodPickUpLocation}`}
          </p>
          <p>
            <span className="font-bold">Expiry Date: </span>
            {` ${foodExpiryDate}`}
          </p>
          <p>
            <span className="font-bold">Additional Notes: </span>
            {`${additionalDonatorNotes}`}
          </p>
          <p>
            <span className="font-bold">Donator Mail: </span>
            {`${donatorEmail}`}
          </p>

          <div className="card-actions ">
            <Link to={`/available-foods/${_id}`}>
              <div>
                <button className="w-full mt-10 mb-3 btn btn-primary">
                  View Details
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableFoodsCard;
