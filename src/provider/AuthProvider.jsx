// import { createContext } from "react";
import { createContext } from "react";
import { useState, useEffect } from "react";
import { app } from "../Firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create User by email and pass
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //  login with pass
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        // location.reload();
      })
      .catch((error) => {
        Swal.fire(error.message);
      });
  };

  // Logout
  const logOut = () => {
    // setLoading(true);
    return signOut(auth);
  };

  // Update User
  const updateUser = (displayName, photoURL) => {
    updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: photoURL,
    })
      .then(() => {
        console.log("Profile updated!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // state

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log("user on onAuthStateChanged", user);
      setUser(currentUser);
      //   setLoading(false);
    });
  }, [user]);

  // Google Sign In
  const provider = new GoogleAuthProvider();
  const googleSignIn = () => {
    // setLoading(true);
    return signInWithPopup(auth, provider)
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Successfully logged in",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(result);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed to log in",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error(error);
      });
  };

  const authInfo = {
    user,
    setUser,
    createUser,
    updateUser,
    googleSignIn,
    logIn,
    logOut,
  };
  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
