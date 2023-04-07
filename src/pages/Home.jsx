import { Link } from "react-router-dom";
import Table from "../components/Table";

const Home = () => {
  return (
    <div>
      <div className="grid place-items-center min-[350px]:mt-10 mt-10">
        <h1 className="text-teal-500 font-bold text-[2.5rem]">My Library</h1>
      </div>
      <div className="mt-5 flex justify-center">
        <Table />
      </div>
      <div className="grid place-items-center mt-3">
        <Link
          to="/add"
          className="bg-teal-400 rounded md:py-2 md:px-2 p-1 text-white hover:bg-teal-600 text-[0.7rem] md:text-base"
        >
          New Book
        </Link>
      </div>
    </div>
  );
};

export default Home;
