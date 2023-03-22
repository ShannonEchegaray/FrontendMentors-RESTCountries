interface ITag {
    tag: string
}

export default function Tag({tag}: ITag) {
    console.log(tag)
  return (
    <div className="p-1 px-2 text-white font-bold bg-slate-500 rounded-md button--tag">{tag}</div>
  )
}