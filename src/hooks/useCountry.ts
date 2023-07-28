import { useEffect, useState } from "react";

// COMMONS
import { adaptCountries } from "@/utils/commons";

// INTERFACES
import type { Country, InitFetch } from "@/types/interfaces";

interface ReturnUseCountry {
    numberOfPages: number;
    setSearch: (options: Pick<SearchOptions, "filter" | "search">) => void;
    setPage: (page: number) => void;
    showCountries: Country[];
    actualPage: number;
}

type UseCountryFunction = (countries: InitFetch[]) => ReturnUseCountry;

export interface SearchOptions {
    filter?: string;
    search?: string;
    page?: number | string;
}

const useCountry: UseCountryFunction = (initCountries) => {
    const [allCountries, setAllCountries] = useState(initCountries);
    const [pages, setPages] = useState(() => Math.ceil(initCountries.length / 20));
    const [options, setOptions] = useState<SearchOptions>({});
    const [showCountries, setShowCountries] = useState(() => adaptCountries(initCountries));
    const [actualPage, setActualPage] = useState(0);

    useEffect(() => {
        let countries: InitFetch[] = allCountries;

        // Filtro por paises
        if (options.filter !== "Todos" && options.filter) {
            countries = countries.filter((country) => options.filter === country.region);
        }

        // Filtro por busqueda
        if (options.search) {
            countries = countries.filter((country) => {
            return country.name.common
                .toLowerCase()
                .includes((options.search as string).toLowerCase());
            });
        }
        
        // Paginacion
        const numberOfPages = Math.ceil(countries.length / 20);
        const sliced = countries.slice(+(options.page ?? 0) * 20, +(options.page ?? 0) * 20 + 20);

        setShowCountries(adaptCountries(sliced))
        setPages(numberOfPages);
        setActualPage(options.page ? +options.page : 0)
    }, [options, allCountries])

    const setSearch = (options: Pick<SearchOptions, "filter" | "search">) => {
       setOptions({...options, page: 0})
    }

    const setPage = (page: number) => {
        setOptions((prevState) => ({...prevState, page}))
    }

    return {
        numberOfPages: pages,
        showCountries,
        setPage,
        setSearch,
        actualPage
    }
}

export default useCountry;