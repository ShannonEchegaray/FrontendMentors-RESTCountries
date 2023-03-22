import { Welcome, Country } from "@/pages/countries/interfaces"

const adapt = (country: Welcome): Country => {
    return {
        name: country.name.common,
        officialName: country.name.official,
        population: country.population,
        region: country.region,
        subRegion: country?.subregion || "",
        capital: country?.capital?.join(", ") || "",
        topLevelDomain: country?.tld?.join(", ") || "",
        currencies: (country?.currencies && Object.values(country.currencies).map(el => el.name).join(", ")) || "",
        languages: (country?.languages && Object.values(country.languages).join(", ")) || "",
        borders: country?.borders || [],
        flag: {
            png: country?.flags.png || "https://picsum.photos/200",
            alt: country?.flags.alt || "country"
        }
    }
}

export const adaptCountries = (country: Welcome[]) => {
    return country.map(adapt)
}