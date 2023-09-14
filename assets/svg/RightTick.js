import * as React from "react";
const RightTick = (props) => (
    <>
        <svg
            width="18"
            height="18"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect width={48} height={48}  />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 24L9 19L19 29L39 9L44 14L19 39L4 24Z"
                stroke="white"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    </>
);
export default RightTick;
