import { SearchOptions } from "@/hooks/useCountry";
import { useRouter } from "next/router";
import { ChangeEvent, useState, useEffect } from "react";
import options from "./options";

interface SearchBarProps {
  onSearch: (searchOptions: SearchOptions) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleSelect(event: ChangeEvent<HTMLSelectElement>) {
    setFilter(event.target.value);
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch({
        search,
        filter
      })
    }, 300);

    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filter])

  return (
    <form
      className="m-auto w-11/12 flex flex-col justify-between align-middle md:flex-row md:items-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="w-fit md:w-1/4 my-4 flex align-middle justify-around rounded-lg shadow-sm shadow-black overflow-hidden">
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
        className="w-[260px] h-[55px] px-2 outline-none rounded-lg shadow-md dark:bg-slate-700 dark:text-white font-semibold text-black"
        name=""
        id=""
      >
        <option value="" hidden defaultValue="">
          Filter By Region
        </option>
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </form>
  );
}

export default SearchBar;