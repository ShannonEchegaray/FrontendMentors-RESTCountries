import { adaptCountries } from "@/utils/commons";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Country, Welcome } from "../../types/interfaces";
import Tag from "@/components/tag/tag";
import { NextRouter } from "next/router";
import Head from "next/head";

interface ICountryDetail {
  country: Country | null;
}

export default function CountryDetail({ country }: ICountryDetail) {
  const router: NextRouter = useRouter();

  const handlerBack = () => {
    router.back();
  };

  if (!country) return <p>Pagina no encontrada</p>;

  return (
    <>
      <Head>
        <title>RestCountries - {country.name}</title>
        <meta name="description" content={`Let's give a look to ${country.name}.`} />
      </Head>
      <div className="max-w-[1220px] m-auto p-8 flex flex-col gap-10">
        <button
          className="flex items-center p-1 border-2 rounded-md px-4 w-fit button--back"
          onClick={handlerBack}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="mr-2"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
          <span>Back</span>
        </button>
        <section className="flex flex-wrap justify-center">
          <div className="w-fit max-w-[600px] flex items-center">
            <div className="w-full shadow-md dark:shadow-slate-900 rounded-xl overflow-hidden">
              <img
                src={country.flag.png}
                alt={country.flag.alt}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="flex-grow flex flex-col md:p-10 md:px-20 py-10 justify-between">
            <div>
              <h1 className="font-bold text-4xl">{country.name}</h1>
            </div>
            <div className="flex py-10">
              <div className="w-1/2">
                <p>
                  <span className="font-bold">Native Name</span>:{" "}
                  {country.officialName}
                </p>
                <p>
                  <span className="font-bold">Population</span>:{" "}
                  {country.population}
                </p>
                <p>
                  <span className="font-bold">Region</span>: {country.region}
                </p>
                <p>
                  <span className="font-bold">Sub Region</span>:{" "}
                  {country.subRegion}
                </p>
                <p>
                  <span className="font-bold">Capital</span>: {country.capital}
                </p>
              </div>
              <div className="w-1/2">
                <p>
                  <span className="font-bold">
                    TLD &#40;Top Level Domain&#41;
                  </span>
                  : {country.topLevelDomain}
                </p>
                <p>
                  <span className="font-bold">Currencies</span>:{" "}
                  {country.currencies}
                </p>
                <p>
                  <span className="font-bold">Languages</span>:{" "}
                  {country.languages}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="font-bold">Borders:</span>{" "}
              {country.borders?.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {code, name} = context.query;
  
  try {
    const url = Boolean(code) 
      ? `https://restcountries.com/v3.1/alpha/${code}`
      : `https://restcountries.com/v3.1/name/${name}`

    const countries: Welcome[] = await (
      await fetch(url)
    ).json();

    return {
      props: {
        country: adaptCountries(countries)[0],
      },
    };
  } catch (error) {
    return {
      props: {
        country: null,
      },
    };
  }
};
