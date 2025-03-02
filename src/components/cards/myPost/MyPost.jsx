import React from "react";

const MyPost = ({ image, title, description }) => {
  return (
    <div>
      <li className="pb-3 sm:pb-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="shrink-0">
            <img
              className="w-8 h-8 rounded-full"
              src={image}
              alt="Neil image"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {title}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {description}
            </p>
          </div>
          {/* could be use for other purposes like buttons */}
          {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            
          </div> */}
        </div>
      </li>
    </div>
  );
};

export default MyPost;
