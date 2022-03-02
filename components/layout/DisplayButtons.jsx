const DisplayButtons = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row pb-3">
        <button className="flex flex-row border rounded border-2 w-fit text-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
            />
          </svg>
          <p>Full 3D View</p>
        </button>

        <button className="flex flex-row border rounded border-2 w-fit text-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
            />
          </svg>
          <p>Ortho Slices</p>
        </button>
      </div>

      <div className="flex flex-row">
        <div className="px-1">
          <button className="border rounded border-2 w-fit text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
              />
            </svg>
          </button>
        </div>

        <div className="px-1">
          <button className="border rounded border-2 w-fit text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
              />
            </svg>
          </button>
        </div>

        <div className="px-1">
          <button className="border rounded border-2 w-fit text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
              />
            </svg>
          </button>
        </div>

        <div className="px-1">
          <button className="border rounded border-2 w-fit text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayButtons;
