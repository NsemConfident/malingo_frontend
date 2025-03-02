/* eslint-disable react/no-unknown-property */
import MyPost from "../../cards/myPost/MyPost";
import data from "../../../data/data";
const PendingActivities = () => {
  return (
    <div>
      <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        Activites Pending
      </h2>
      <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {data.activitiesPending.map((post, index) => (
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

export default PendingActivities;
