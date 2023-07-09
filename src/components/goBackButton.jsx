//REACT-ICONS
import { IoArrowBackCircleSharp, IoPersonAddSharp } from "react-icons/io5";

const goBack = ({ destination }) => {
  return (
    <i className={"right"}>
      <button
        className={"btn light-blue darken-1"}
        onClick={() => (window.location.href = `${destination}?reload=true`)}
      >
        <IoArrowBackCircleSharp size={"34"} color={"#fff"} />
      </button>
      <hr />
    </i>
  );
};

export default goBack;
