import GymCard from "@/components/GymCard";
import Info from "@/components/Info";
import Tools from "@/components/Tools";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Info/>
      <GymCard/>
      <Tools />
      <div className="text-center text-zinc-600 flex justify-center items-center gap-3 mb-4">
        <div>By Ties Petersen</div>
        <Link href='https://github.com/TiesPetersen'><i className="fa-brands fa-square-github text-2xl p-0 m-0"></i></Link>
      </div>
    </div>
  );
}
