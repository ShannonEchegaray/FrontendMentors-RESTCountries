import { StringMappingType } from "typescript";

export interface Country {
    name: string;
    officialName: string;
    population: number;
    region: string;
    subRegion?: string;
    capital?: string;
    topLevelDomain?: string;
    currencies?: string;
    languages?: string;
    borders?:  string[];
    flag: Flag;
}

interface Flag {
    alt: string;
    png: string; 
}

export interface Welcome {
    name:         Name;
    tld:          string[];
    cca2:         string;
    ccn3:         string;
    cca3:         string;
    cioc:         string;
    independent:  boolean;
    status:       string;
    unMember:     boolean;
    currencies:   Record<string, Currency>;
    idd:          Idd;
    capital:      string[];
    altSpellings: string[];
    region:       string;
    subregion:    string;
    languages:    Record<string, string>;
    translations: { [key: string]: Translation };
    latlng:       number[];
    landlocked:   boolean;
    borders:      string[];
    area:         number;
    demonyms:     Demonyms;
    flag:         string;
    maps:         Maps;
    population:   number;
    gini:         Gini;
    fifa:         string;
    car:          Car;
    timezones:    string[];
    continents:   string[];
    flags:        Flags;
    coatOfArms:   CoatOfArms;
    startOfWeek:  string;
    capitalInfo:  CapitalInfo;
    postalCode:   PostalCode;
}

interface CapitalInfo {
    latlng: number[];
}

interface Car {
    signs: string[];
    side:  string;
}

interface CoatOfArms {
    png: string;
    svg: string;
}

interface Currency {
    name:   string;
    symbol: string;
}

interface Demonyms {
    eng: Eng;
    fra: Eng;
}

interface Eng {
    f: string;
    m: string;
}

interface Flags {
    png: string;
    svg: string;
    alt: string;
}

interface Gini {
    "2014": number;
}

interface Idd {
    root:     string;
    suffixes: string[];
}

interface Maps {
    googleMaps:     string;
    openStreetMaps: string;
}

interface Name {
    common:     string;
    official:   string;
    nativeName: NativeName;
}

interface NativeName {
    spa: Translation;
}

interface Translation {
    official: string;
    common:   string;
}

interface PostalCode {
    format: string;
    regex:  string;
}