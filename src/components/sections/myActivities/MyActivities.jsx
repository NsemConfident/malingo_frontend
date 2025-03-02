/* eslint-disable react/no-unknown-property */
import React from "react";
import MyPost from "../../cards/myPost/MyPost";
import data from "../../../data/data";

const MyActivities = () => {
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

export default MyActivities;
