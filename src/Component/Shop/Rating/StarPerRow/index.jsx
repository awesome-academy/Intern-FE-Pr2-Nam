import { FaRegStar, FaStar } from "react-icons/fa";

function StarPerRow({ stars }) {
  const arrayStar = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div>
      {arrayStar.map((item, index) => {
        return item <= stars ? (
          <span key={index}>
            <FaStar />
          </span>
        ) : (
          <span key={index}>
            <FaRegStar />
          </span>
        );
      })}
    </div>
  );
}

export default StarPerRow;
