import { useRouter } from "next/router";
import { FormEvent, ChangeEvent, useState } from "react";

export default function SearchBar() {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleSelect(event: ChangeEvent<HTMLSelectElement>) {
    setFilter(event.target.value);
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const URLParams = new URLSearchParams();

    if (search.length > 0) URLParams.set("search", search);
    if (filter.length > 0) URLParams.set("filter", filter);

    router.push("/countries?" + URLParams.toString());
  }

  return (
    <form
      className="m-auto w-11/12 flex justify-between align-middle"
      onSubmit={handleSubmit}
    >
      <div className="w-1/4 flex align-middle justify-around rounded-lg shadow-sm shadow-black overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="m-2.5 cursor-pointer"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
        <input
          onChange={handleSearch}
          value={search}
          className="w-full p-2 outline-none text-black  dark:bg-slate-700 dark:text-white font-semibold"
          type="text"
          placeholder="Search for a country..."
        />
      </div>
      <select
        onChange={handleSelect}
        placeholder="Filter by region"
        className="w-[260px] px-2 outline-none rounded-lg shadow-md dark:bg-slate-700 dark:text-white font-semibold text-black"
        name=""
        id=""
      >
        <option value="" hidden defaultValue="">
          Filter By Region
        </option>
        {["Africa", "America", "Asia", "Europe", "Oceania"].map((region, i) => (
          <option key={i} value={region.toLowerCase()}>
            {region}
          </option>
        ))}
      </select>
    </form>
  );
}
