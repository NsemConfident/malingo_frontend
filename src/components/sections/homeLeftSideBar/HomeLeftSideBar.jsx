/* eslint-disable react/no-unknown-property */
import React from "react";
import data from "../../../data";
import MyPost from "../myPost/MyPost";

const HomeLeftSideBar = () => {
  return (
    <div>
      <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        My Post
      </h2>
      <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {data.myPost.map((post, index) => (
          <MyPost
            key={index}
            image={post.image}
            title={post.title}
            description={post.description}
          />
        ))}
      </ul>
    </div>
  );
};

export default HomeLeftSideBar;
