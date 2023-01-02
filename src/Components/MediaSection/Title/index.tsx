import Link from "next/link";
import React, { FC } from "react";

const Title = ({ children }: { children: any }) => {
  const showMoreLikeThis = () => {};
  return (
    <div className="inline-block ml-[3vw]">
      <Link
        href={`/categories/${children
          .toLowerCase()
          .trim()
          .replaceAll(" ", "_")}`}
      >
        <a>
          <button
            onClick={showMoreLikeThis}
            className="text-white  font-bold flex items-baseline group"
          >
            <p className="text-2xl">{children}</p>
            <div className="transition-[margin] flex items-center duration-700 relative   group-hover:ml-4">
              <p className="transition-[opacity] text-[#54b9c5] duration-700 ease-in opacity-0 group-hover:opacity-100  group-hover:duration-150">
                Explore All
              </p>
              <p
                className="transition-all  text-start text-xl
               text-[#54b9c5] duration-300 delay-100 ease-out  -ml-24 opacity-0 group-hover:opacity-100 group-hover:ml-2"
              >
                &gt;
              </p>
            </div>
          </button>
        </a>
      </Link>
    </div>
  );
};

export default Title;
