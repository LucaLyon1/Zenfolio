import MoneyGrower from "@/components/MoneyGrower";

export default function Home() {


  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center w-screen h-screen gap-4">
      <h1 className="text-3xl font-bold text-center">Watch your money grow in real time</h1>
      <p className="italic">Avoid intra-day volatility to focus on long-term returns</p>
      <div
        className="bg-white w-3/4 md:w-2/3 lg:w-1/2 py-6 h-1/3 flex items-center justify-around rounded-md shadow-md flex-col">
        <p className="text-lg italic text-gray-500">You currently have</p>
        <MoneyGrower />
        <p className="text-lg italic text-gray-500">Growing at</p>
        <div className="text-center text-3xl font-semibold">
          8%
        </div>
        <p className="text-lg italic text-gray-500">Per year</p>
        <button
          className="bg-blue-400 px-4 py-2 text-white rounded-lg hover:bg-blue-600 hover:scale-105 transition-all">
          Let's increase that
        </button>
      </div>
    </div>
  );
}
