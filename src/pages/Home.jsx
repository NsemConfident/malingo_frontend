/* eslint-disable react/no-unknown-property */
import { Link } from "react-router-dom";
import Posts from "../data/ActivityData";
import HomeLayout from "../layouts/homeLayout/HomeLayout";
import HomeLeftSideBar from "../components/sections/homeLeftSideBar/HomeLeftSideBar";
import HomeRightSideBar from "../components/sections/homeRightSideBar/HomeRightSideBar";
import PostCard from "../components/cards/postCard/PostCard";

const Home = () => {
  return (
    <HomeLayout>
      <div className="py-16 grid grid-cols-4">
        <div className=" col-span-1 overflow-y-scroll">
          <HomeLeftSideBar />
        </div>
        <div className="col-span-2 mx-20 my-2 overflow-y-scroll">
          <Link to='/post-activity'>
            <div>
              <button
                type="button"
                class="py-5 px-5 w-full me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                What is your next adventure
              </button>
            </div>
          </Link>
          {Posts.map((post, index) => (
            <PostCard
              key={index}
              profile={post.userData.profile}
              name={post.userData.name}
              email={post.userData.email}
              numberOfMembers={post.userData.numberOfMembers}
              image={post.image}
              title={post.title}
              description={post.description}
            />
          ))}
        </div>
        <div className="col-span-1 overflow-y-scroll">
          <HomeRightSideBar />
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
