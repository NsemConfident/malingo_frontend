/* eslint-disable react/no-unknown-property */
const PostCard = ({
  profile,
  name,
  email,
  numberOfMembers,
  image,
  title,
  description,
}) => {
  function getInitials(str) {
    return str
      .split(" ") // Split the string by spaces
      .map((word) => word.charAt(0)) // Get the first letter of each word
      .join(""); // Join the letters into a single string
  }
  return (
    <div className="w-full mb-2 shadow-sm bg-white rounded-lg px-4 py-4">
      <div className="flex items-center">
        <div className="shrink-0 bg-auto">
          <div className="w-10 h-10 font-extrabold text-2xl justify-center items-center text-center text-white rounded-full bg-blue-400">
            {getInitials(profile)}
          </div>
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {email}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {numberOfMembers} Members
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 mt-3">
        <div className="w-full rounded-t-lg overflow-hidden">
          <img
            className="w-full h-auto max-h-96 rounded-t-lg"
            src={image}
            alt={title}
            onError={(e) => {
              console.error("Image failed to load:", e);
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
            }}
          />
          {console.log("activity image: ", image)}
        </div>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Join Activity
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostCard;