import Link from "next/link"

interface ITag {
    tag: string
}

export default function Tag({tag}: ITag) {
  return (
    <Link href={`/country/?code=${tag}`} className="p-1 px-2 text-white font-bold bg-slate-500 rounded-md button--tag">{tag}</Link>
  )
}