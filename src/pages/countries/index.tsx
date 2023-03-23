import { GetServerSideProps, GetStaticProps } from "next";
import type { Welcome, Country } from "../../types/interfaces";
import { adaptCountries } from "@/utils/commons";
import SearchBar from "@/components/search-bar/search-bar";
import dynamic from "next/dynamic";
const CountryCard = dynamic(
  () => import("@/components/country-card/country-card"),
  {
    ssr: false,
  }
);

interface ICountries {
  countries: Country[];
  pages: number;
}

export default function Countries({ countries }: ICountries) {
  return (
    <div className="m-auto max-w-[1440px] py-5">
      <SearchBar />
      <div className="p-5 layout-countries gap-20">
        {countries.map((el) => (
          <CountryCard key={el.officialName} country={el}></CountryCard>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page = 0, search = "", filter = "" } = context.query;

  let countries: Welcome[] | null | undefined;

  // Filtro por paises
  if (filter) {
    countries = await (
      await fetch(`https://restcountries.com/v3.1/region/${filter}`)
    ).json();
  } else {
    countries = await (
      await fetch("https://restcountries.com/v3.1/all")
    ).json();
  }

  // Filtro por busqueda
  if (search) {
    countries = countries?.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes((search as string).toLowerCase());
    });
  }

  if (!countries) {
    return {
      props: {
        countries: [],
      },
    };
  }

  // Paginacion
  const sliced: Welcome[] = countries.slice(+page * 20, +page * 20 + 20);

  return {
    props: {
      countries: adaptCountries(sliced),
    },
  };
};
