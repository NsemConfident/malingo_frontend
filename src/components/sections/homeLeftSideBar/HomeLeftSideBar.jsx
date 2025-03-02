/* eslint-disable react/no-unknown-property */
import MyActivities from "../myActivities/MyActivities";

const HomeLeftSideBar = () => {
  return (
    <div>
      <MyActivities />
      <hr class="h-px my-1 bg-gray-200 border-[0.3px] dark:bg-gray-100 " />
      <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        Trending Activities
      </h2>
      <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white"></h2>
    </div>
  );
};

export default HomeLeftSideBar;
