import * as React from "react";
const CrossIcon = (props) => (
    <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_17_400)">
      <rect width={18} height={18} rx={9} fill="#100E12" fillOpacity={0.2} />
      <path
        d="M12 6L6 12"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12L6 6"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_17_400">
        <rect width={18} height={18} rx={9} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default CrossIcon;
