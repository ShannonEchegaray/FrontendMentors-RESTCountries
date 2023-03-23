import type { Country } from "@/types/interfaces";
import Image from "next/image";
import Link from "next/link";

interface ICountry {
  country: Country;
}

export default function CountryCard({ country }: ICountry) {
  return (
    <Link
      href={`/countries/${country.name}`}
      className="w-full min-h-[16rem]  rounded-lg justify-between align-middle"
    >
      <div className="flex flex-col shadow-md shadow-slate-900 overflow-hidden rounded-lg ">
        <div className="w-full h-32 border-b-2 overflow-hidden">
          <img
            className="w-full h-full object-fill object-center"
            src={country.flag.png}
            alt={country.flag.alt}
          />
        </div>
        <div className="p-4">
          <p className="mb-3 font-bold">{country.name}</p>
          <p>
            <span className="font-medium">Population</span>:{" "}
            {new Intl.NumberFormat().format(country.population)}
          </p>
          <p>
            <span className="font-medium">Region</span>: {country.region}
          </p>
          {country.capital ? (
            <p>
              <span className="font-medium">Capital</span>: {country.capital}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </Link>
  );
}
