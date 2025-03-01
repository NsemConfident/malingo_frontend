import { Link } from "react-router-dom";
import HomeLayout from "../layouts/homeLayout/HomeLayout";
import HomeLeftSideBar from "../components/sections/homeLeftSideBar/HomeLeftSideBar";
import HomeRightSideBar from "../components/sections/homeRightSideBar/HomeRightSideBar";

const Home = () => {
  return (
    <HomeLayout>
      <div className="py-16 grid grid-cols-4">
        <div className=" col-span-1">
          <HomeLeftSideBar />
        </div>
        <div className="col-span-2">
        
          <Link to="/post-activity">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Post
            </button>
          </Link>
          <Link to="/create-activity">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Post
            </button>
          </Link>
        </div>
        <div className="col-span-1">
          <HomeRightSideBar />
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
