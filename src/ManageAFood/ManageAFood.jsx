import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useEffect } from "react";

const ManageAFood = () => {
  const { user } = useContext(AuthContext);
  const url = `http://localhost:5000/requested-foods?donatorEmail=${user?.email}&requestedId`;

//   useEffect(() => {
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//       });
//   }, [url]);

  return <div>Manage a Food</div>;
};

export default ManageAFood;
