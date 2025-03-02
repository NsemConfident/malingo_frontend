/* eslint-disable react/no-unknown-property */
import JoinedActivity from "../JoinedActivity/JoinedActivity";
import PendingActivities from "../pendingActivities/PendingActivities";
import DeclinedActivity from "../declinedActivity/DeclinedActivity";

const HomeRightSideBar = () => {
  return (
    <div>
      <JoinedActivity />
      <hr class="h-px my-1 bg-gray-200 border-[o.3px] dark:bg-gray-100" />
      <PendingActivities />
      <hr class="h-px my-1 bg-gray-200 border-[0.3px] dark:bg-gray-100" />
      <DeclinedActivity />
    </div>
  );
};

export default HomeRightSideBar;
