/* eslint-disable react/no-unknown-property */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Posts from "../data/ActivityData";
import HomeLayout from "../layouts/homeLayout/HomeLayout";
import HomeLeftSideBar from "../components/sections/homeLeftSideBar/HomeLeftSideBar";
import HomeRightSideBar from "../components/sections/homeRightSideBar/HomeRightSideBar";
import PostCard from "../components/cards/postCard/PostCard";

const Home = () => {
  const [activityData, setActivityData] = useState(null);
  const [activityOwner, setActivityOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetch("https://rrn24.techchantier.site/malingo/public/api/activity")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((activityData) => {
  //       setActivityData(activityData);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      setError(new Error("User is not authenticated"));
      setLoading(false);
      return;
    }

    // Axios config with Authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Fetch all activities
    axios
      .get("https://rrn24.techchantier.site/malingo/public/api/activity", config) // Replace with actual activities endpoint
      .then(async (response) => {
        const activities = response.data;

        // Fetch user details for each activity
        const activityUserData = await Promise.all(
          activities.map(async (activity) => {
            try {
              const userResponse = await axios.get(
                `https://rrn24.techchantier.site/malingo/public/api/users/${activity.user_id}`,
                config
              );
              return { user_data: userResponse.data, activity };
            } catch (err) {
              console.error("Error fetching user:", err);
              return { user_data: null, activity };
            }
          })
        );

        setActivityData(activityUserData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  console.log(activityData);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <HomeLayout>
      <div className="py-16 grid grid-cols-4">
        <div className=" col-span-1 overflow-y-scroll">
          <HomeLeftSideBar />
        </div>
        <div className="col-span-2 mx-20 my-2 overflow-y-scroll">
          <Link to="/post-activity">
            <div>
              <button
                type="button"
                class="py-5 px-5 w-full me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                What is your next adventure
              </button>
            </div>
          </Link>
          {activityData.map((post, index) => (
            <PostCard
              key={index}
              profile={post.user_data.name}
              name={post.user_data.name}
              email={post.user_data.email}
              numberOfMembers={post.activity.numberOfMembers}
              image={post.activity.ActivityPhoto}
              title={post.activity.title}
              description={post.activity.description}
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
