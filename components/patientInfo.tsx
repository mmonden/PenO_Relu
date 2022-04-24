import Image from "next/image";

export default function PatientInfo() {
  return (
    <div className="relative min-h-full min-w-full ">
      <div className="absolute min-w-full h-1/6 flex justify-center text-3xl border-b-2 border-black">
        Profiel
      </div>
      <div className="absolute flex flex-row h-5/6 min-w-full bottom-0 space-x-10 overflow-y-auto">
        <div className="flex items-center pl-4">
          <Image
            src={require("./images/Patient_1.jpg")}
            className=""
            alt="Photo"
            width={150}
            height={180}
          />
        </div>
        <div className="flex flex-column pt-3">
          <p>
            <span className="font-bold">Naam: </span>
            <span>Xander Pottier </span>
          </p>
          <p>
            <span className="font-bold">Geslacht: </span>
            <span>M</span>
          </p>
          <p>
            <span className="font-bold">Geboorte: </span>
            <span>29/06/2001 </span>
          </p>
          <p>
            <span className="font-bold">Beroep: </span>
            <span> Front end Developer </span>
          </p>
          <p>
            <span className="font-bold">Extra info: </span>
            <span> 3 Gaatjes, heeft nog wijsheidstanden </span>
          </p>
        </div>
      </div>
    </div>
  );
}
