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
    </div>
  );
}
