import Tanden from "./Tanden";

const Anatomy = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center text-2xl">
        <img
          src="https://cdn-icons-png.flaticon.com/512/103/103386.png"
          className="h-6 w-8 px-1"
          fill="none"
          stroke="currentColor"/>

        Anatomy Selector
      </div>

      <Tanden />
    </div>
  );
};

export default Anatomy;
