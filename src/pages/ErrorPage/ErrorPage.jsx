import { Link } from "react-router-dom";

const ErrorPage = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center",
    },
    heading: {
      fontSize: "3em",
      marginBottom: "0.5em",
    },
    text: {
      fontSize: "1.5em",
    },
  };
  return (
    <div>
      <div style={styles.container}>
        <h1 className="font-semibold " style={styles.heading}>
          404
        </h1>
        <h1 style={styles.heading}>Not Found!</h1>
        <p style={styles.text}>The page you are looking for does not exist.</p>
        <Link
          className="rounded-lg my-6 bg-[#32a374] py-3 px-6 text-white"
          to="/"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
