import * as React from "react";
const PlusIcon = (props) => (
    <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_17_405)">
      <path
        d="M2.8125 9H15.1875"
        stroke="white"
        strokeWidth={1.6875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 2.8125V15.1875"
        stroke="white"
        strokeWidth={1.6875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_17_405">
        <rect width={18} height={18} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default PlusIcon;
