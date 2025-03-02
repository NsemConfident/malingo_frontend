/* eslint-disable react/no-unknown-property */
const PostCard = ({profile, name, email, numberOfMembers, image, title, description}) => {
  return (
    <div className="w-full mb-2 shadow-sm bg-white rounded-lg px-4 py-4">
      <div class="flex items-center">
        <div class="shrink-0 bg-auto">
          <img
            class="w-8 h-8 rounded-full"
            src={profile}
            alt="Neil image"
          />
        </div>
        <div class="flex-1 min-w-0 ms-4">
          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
            {name}
          </p>
          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
            {email}
          </p>
        </div>
        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {numberOfMembers} Members
        </div>
      </div>
      <div class=" bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="rounded-t-lg h-32 w-full object-cover "
            src="https://cdn.pixabay.com/photo/2024/11/03/17/49/mountain-9172053_640.jpg"
            alt=""
          />
        </a>
        <div class="p-5">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
          <a
            href="#"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Join Activity
            <svg
              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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
