import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="flex flex-col gap-8 w-[50%] items-center justify-center">
        <div className="font-bold text-4xl flex gap-[3rem]">
          <h1> 404 </h1>
          <h1>|</h1>
          <h1>Not Found</h1>
        </div>
        <p className="text-lg font-medium">
          The page you are looking for does not exist.
        </p>

        <Link to={"/"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
