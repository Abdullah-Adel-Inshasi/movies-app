import { memo } from "react";

const LockIcon = () => {
  return (
    <svg width={24} height={24}>
      <path
        fillRule="evenodd"
        color="#656565"
        d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V9H19C20.1046 9 21 9.89543 21 11V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V11C3 9.89543 3.89543 9 5 9H7V8ZM15 8V9H9V8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8ZM5 11V19H19V11H5ZM11 13V17H13V13H11Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export default memo(LockIcon);
