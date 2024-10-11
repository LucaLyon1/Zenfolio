import MoneyGrower from "@/components/MoneyGrower";
import { getPortfolio } from "@/lib/portfolio";
import { Roboto_Serif } from "next/font/google";
import Link from "next/link";

const roboto_serif = Roboto_Serif({
  weight: ['100', '900'],
  subsets: ["latin"]
})

async function modifyFolio() {
  const folio = await getPortfolio();
  if (folio) {
    return (
      <Link className="relative mt-2" href="/settings">
        <div className="absolute -inset-2">
          <div
            className="w-full h-full max-w-sm mx-auto lg:mx-0 opacity-50 blur-md bg-gradient-to-r from-yellow-400 via-pink-500 to-green-600">
          </div>
        </div>
        <div
          className="relative z-10 inline-flex items-center justify-center w-full px-4 py-2 
          text-white transition-all duration-200 border-2 border-transparent sm:w-auto rounded-lg 
          bg-[#09090B] hover:bg-gray-900 hover:scale-105"
          role="button">
          Let's increase that !
        </div>
      </Link>
    )
  }
  return (
    <Link
      className="border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-900 hover:scale-105 transition-all mt-4"
      href="/create-zenfolio">
      Create your portfolio
    </Link>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col items-center w-screen h-screen gap-4 pt-12">
      <h1 className={`text-4xl font-bold text-center ${roboto_serif.className}`}>Watch your money grow in real time</h1>
      <p className="italic text-gray-400">Avoid intra-day volatility to focus on long-term returns</p>
      <div
        className="w-3/4 md:w-2/3 lg:w-1/2 py-6 flex items-center justify-around rounded-md flex-col border border-gray-700 gap-4">
        <MoneyGrower />
        {modifyFolio()}
        <Link href="/learn-more" className="transition-all hover:text-gray-400 mt-4">Learn More</Link>
      </div>
    </div>
  );
}
