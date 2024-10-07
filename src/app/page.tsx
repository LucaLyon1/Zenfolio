import MoneyGrower from "@/components/MoneyGrower";
import { getPortfolio } from "@/lib/portfolio";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

async function modifyFolio() {
  const folio = await getPortfolio();
  if (folio) {
    return (
      <Link
        className="bg-blue-400 px-4 py-2 text-white rounded-lg hover:bg-blue-600 hover:scale-105 transition-all mt-4"
        href="/settings">
        Let's increase that !
      </Link>
    )
  }
  return (
    <Link
      className="bg-blue-400 px-4 py-2 text-white rounded-lg hover:bg-blue-600 hover:scale-105 transition-all mt-4"
      href="/create-zenfolio">
      Create your portfolio
    </Link>
  )
}

export default function Home() {
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center w-screen h-screen gap-4">
      <h1 className="text-3xl font-bold text-center">Watch your money grow in real time</h1>
      <p className="italic">Avoid intra-day volatility to focus on long-term returns</p>
      <div
        className="bg-white w-3/4 md:w-2/3 lg:w-1/2 py-6 flex items-center justify-around rounded-md shadow-md flex-col">
        <MoneyGrower />
        {modifyFolio()}
        <Link href="/learn-more" className="text-blue-500 hover:text-blue-700 mt-4">Learn More</Link>
      </div>
    </div>
  );
}
