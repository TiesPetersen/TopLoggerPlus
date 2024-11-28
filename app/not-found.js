import Link from "next/link";

export default function Custom404() {
    return (
      <div className="text-center p-5">Page Not Found. Go <Link href='/'><u>Home</u></Link>.</div>
    )
}