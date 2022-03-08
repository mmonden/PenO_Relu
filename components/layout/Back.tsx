import { AiOutlineRightCircle, AiOutlineLeftCircle } from "react-icons/ai";

const Back = (value) => {
  return (
    <div className="text-4xl">
      {!value.value ? <AiOutlineRightCircle /> : <AiOutlineLeftCircle />}
    </div>
  );
};

export default Back;
