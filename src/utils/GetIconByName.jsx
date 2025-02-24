import { AiOutlineLike, AiTwotoneDislike } from "react-icons/ai";
import { FaStar, FaShoppingCart, FaCommentDots, FaPhone } from "react-icons/fa";
import { MdOutlineRateReview, MdEmail } from "react-icons/md";

export const GetIconByName = (name, size = 24, className = "") => {
  switch (name) {
    case "like":
    case "likes":
      return <AiOutlineLike size={size} className={className} />;
    case "dislike":
    case "dislikes":
      return <AiTwotoneDislike size={size} className={className} />;
    case "rate":
      return <FaStar size={size} />;
    case "order":
    case "orders":
      return <FaShoppingCart size={size} className={className} />;
    case "review":
    case "reviews":
      return <MdOutlineRateReview size={size} className={className} />;
    case "contact":
      return <FaPhone size={size} className={className} />;
    case "email":
      return <MdEmail size={size} className={className} />;
    default:
      return null; // Return null for unknown names to avoid rendering issues
  }
};
