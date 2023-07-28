import { GetServerSideProps, GetStaticProps } from "next";
import type { InitFetch, Country } from "../types/interfaces";
import { adaptCountries } from "@/utils/commons";
import SearchBar from "@/components/search-bar/search-bar";
import dynamic from "next/dynamic";
import Head from "next/head";
import useCountry from "@/hooks/useCountry";
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

  const {showCountries: countries, numberOfPages, setSearch, setPage, actualPage} = useCountry(initCountries);

  const handleChangePage = (page: number) => {
    setPage(page);
  }

  return (
    <>
      <Head>
        <meta name="description" content="All the countries of the world! Come to see." />
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
          {Array.from({length: 7}, (_, index) => 
            actualPage - 2 + index > 0 
          && actualPage - 2 + index < numberOfPages 
          && (
              <button onClick={() => handleChangePage(actualPage - 3 + index)} key={index}>
                {actualPage - 2 + index}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  let countries: InitFetch[];

  countries = await (
      await fetch("https://restcountries.com/v3.1/all")
      ).json();
  
  return {
    props: {
      initCountries: countries
    }
  }
};
