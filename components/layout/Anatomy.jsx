import Tanden from "./Tanden";

const Anatomy = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <img
          src="https://cdn-icons-png.flaticon.com/512/103/103386.png"
          className="h-5 w-4 pt-1"
          fill="none"
          stroke="currentColor"/>

        <h1>Anatomy Selector</h1>
      </div>

      <Tanden />
    </div>
  );
};

export default Anatomy;
