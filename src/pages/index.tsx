import { useContext } from "react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";

// INTERFACES
import type { InitFetch } from "../types/interfaces";

// COMPONENTS
import SearchBar from "@/components/search-bar/search-bar";

// HOOKS
import useCountry from "@/hooks/useCountry";

// CONTEXT
import { ThemeContext } from "./_app";

const CountryCard = dynamic(
  () => import("@/components/country-card/country-card"),
  {
    ssr: false,
  }
);

interface ICountries {
  initCountries: InitFetch[];
  pages: number;
}

export default function Countries({ initCountries }: ICountries) {
  const { theme } = useContext(ThemeContext);
  const {
    showCountries: countries,
    numberOfPages,
    setSearch,
    setPage,
    actualPage,
  } = useCountry(initCountries);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  console.log(actualPage, numberOfPages);

  return (
    <>
      <Head>
        <meta
          name="description"
          content="All the countries of the world! Come to see."
        />
        <title>RestCountries - Home</title>
        <link rel="icon" href="/flag-icon.png"></link>
      </Head>
      <div className="m-auto max-w-[1440px] py-5">
        <SearchBar onSearch={setSearch} />
        <div className="p-5 layout-countries gap-20">
          {countries.map((el) => (
            <CountryCard key={el.officialName} country={el}></CountryCard>
          ))}
        </div>
        <div className="py-5 flex justify-center gap-4">
          {actualPage - 2 > 0 && (
            <button
              className={`px-3 py-2 shadow-md shadow-slate-900 rounded-md`}
              onClick={() => handleChangePage(0)}
            >
              &lt;&lt;
            </button>
          )}
          {Array.from(
            { length: 6 },
            (_, index) =>
              actualPage - 2 + index > 0 &&
              actualPage - 2 + index <= numberOfPages && (
                <button
                  className={`px-3 py-2 shadow-md shadow-slate-900 rounded-md ${
                    actualPage - 3 + index === actualPage
                      ? "bg-slate-600 text-white"
                      : ""
                  }`}
                  onClick={() => handleChangePage(actualPage - 3 + index)}
                  key={index}
                >
                  {actualPage - 2 + index}
                </button>
              )
          )}
          {actualPage + 2 < numberOfPages && (
            <button
              className={`px-3 py-2 shadow-md shadow-slate-900 rounded-md`}
              onClick={() => handleChangePage(numberOfPages - 1)}
            >
              &gt;&gt;
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let countries: InitFetch[];

  countries = await (await fetch("https://restcountries.com/v3.1/all")).json();

  return {
    props: {
      initCountries: countries,
    },
  };
};
