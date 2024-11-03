/////////////////////////////////////////////////////////////////////
///TESTS UNITAIRES
/////////////////////////////////////////////////////////////////////

const Country = require('../helper/Country');

test('Get all countries', () => {
    const dataCountries = require('../data/countries.json');
    const countries = Country.getAll();
    expect(countries.error).toBe(false);
    expect(countries.data.length).toBe(dataCountries.length);
});

test('Get a country', () => {
    const id = 250;
    const country = Country.get(id);
    expect(country.error).toBe(false);
    expect(country.data.ccn3).toBe(id.toString());
});

test('Get a country with invalid ID', () => {
    const id = 'invalid';
    const country = Country.get(id);
    expect(country.error).toBe(true);
    expect(country.status).toBe(404);
    expect(country.message).toBe('Country not found');
});

test('Get full data of a country', () => {
    const id = 250;
    const country = Country.getFullData(id);
    expect(country.error).toBe(false);
});

test('Get full data of a country with invalid ID', () => {
    const id = 'invalid';
    const country = Country.getFullData(id);
    expect(country.error).toBe(true);
    expect(country.status).toBe(404);
    expect(country.message).toBe('Country not found');
});

test('Get normal data of a country', () => {
    const id = 250;
    const country = Country.getNormalData(id);
    expect(country.error).toBe(false);
    expect(country.data.name).toBeDefined();
    expect(country.data.cca2).toBeDefined();
    expect(country.data.cca3).toBeDefined();
    expect(country.data.currencies).toBeDefined();
    expect(country.data.languages).toBeDefined();
    expect(country.data.flag).toBeDefined();
    expect(country.data.capital).toBeDefined();
    expect(country.data.population).toBeDefined();
    expect(country.data.continents).toBeDefined();
});

test('Get normal data of a country with invalid ID', () => {
    const id = 'invalid';
    const country = Country.getNormalData(id);
    expect(country.error).toBe(true);
    expect(country.status).toBe(404);
    expect(country.message).toBe('Country not found');
});

test('Get short data of a country', () => {
    const id = 250;
    const country = Country.getShortData(id);
    expect(country.error).toBe(false);
    expect(country.data.name).toBeDefined();
    expect(country.data.cca2).toBeDefined();
    expect(country.data.cca3).toBeDefined();
    expect(country.data.flag).toBeDefined();
});

test('Get short data of a country with invalid ID', () => {
    const id = 'invalid';
    const country = Country.getShortData(id);
    expect(country.error).toBe(true);
    expect(country.status).toBe(404);
    expect(country.message).toBe('Country not found');
});

test('Get custom data of a country', () => {
    const id = 250;
    const fields = ["name","capital","population"];
    const country = Country.getCustomData(id, fields);
    expect(country.error).toBe(false);
    expect(country.data.name).toBeDefined();
    expect(country.data.capital).toBeDefined();
    expect(country.data.population).toBeDefined();
    expect(country.data.cca2).toBeUndefined();
});

test('Update a country', async () => {
    const data = {
        "name": {
            "common": "Seychelllles",
            "official": "Republic of Seychelles",
            "nativeName": {
                "crs": {
                    "official": "Repiblik Sesel",
                    "common": "Sesel"
                },
                "eng": {
                    "official": "Republic of Seychelles",
                    "common": "Seychelles"
                },
                "fra": {
                    "official": "République des Seychelles",
                    "common": "Seychelles"
                }
            }
        },
        "tld": {
            "0": ".sc"
        },
        "cca2": "SC",
        "ccn3": "690",
        "cca3": "SYC",
        "cioc": "SEY",
        "independent": "true",
        "status": "officially-assigned",
        "unMember": "true",
        "currencies": {
            "SCR": {
                "name": "Seychellois rupee",
                "symbol": "₨"
            }
        },
        "idd": {
            "root": "+2",
            "suffixes": {
                "0": "48"
            }
        },
        "capital": {
            "0": "Victoria"
        },
        "altSpellings": {
            "0": "SC",
            "1": "Republic of Seychelles",
            "2": "Repiblik Sesel",
            "3": "République des Seychelles"
        },
        "region": "Africa",
        "subregion": "Eastern Africa",
        "languages": {
            "crs": "Seychellois Creole",
            "eng": "English",
            "fra": "French"
        },
        "translations": {
            "ara": {
                "official": "جمهورية سيشل",
                "common": "سيشل"
            },
            "bre": {
                "official": "Republik Sechelez",
                "common": "Sechelez"
            },
            "ces": {
                "official": "Seychelská republika",
                "common": "Seychely"
            },
            "cym": {
                "official": "Republic of Seychelles",
                "common": "Seychelles"
            },
            "deu": {
                "official": "Republik der Seychellen",
                "common": "Seychellen"
            },
            "est": {
                "official": "Seišelli Vabariik",
                "common": "Seišellid"
            },
            "fin": {
                "official": "Seychellien tasavalta",
                "common": "Seychellit"
            },
            "fra": {
                "official": "République des Seychelles",
                "common": "Seychelles"
            },
            "hrv": {
                "official": "Republika Sejšeli",
                "common": "Sejšeli"
            },
            "hun": {
                "official": "Seychelle Köztársaság",
                "common": "Seychelle-szigetek"
            },
            "ita": {
                "official": "Repubblica delle Seychelles",
                "common": "Seychelles"
            },
            "jpn": {
                "official": "セイシェル共和国",
                "common": "セーシェル"
            },
            "kor": {
                "official": "세이셸 공화국",
                "common": "세이셸"
            },
            "nld": {
                "official": "Republiek der Seychellen",
                "common": "Seychellen"
            },
            "per": {
                "official": "جمهوری سیشل",
                "common": "سیشل"
            },
            "pol": {
                "official": "Republika Seszeli",
                "common": "Seszele"
            },
            "por": {
                "official": "República das Seychelles",
                "common": "Seicheles"
            },
            "rus": {
                "official": "Республика Сейшельские Острова",
                "common": "Сейшельские Острова"
            },
            "slk": {
                "official": "Seychelská republika",
                "common": "Seychely"
            },
            "spa": {
                "official": "República de las Seychelles",
                "common": "Seychelles"
            },
            "srp": {
                "official": "Република Сејшели",
                "common": "Сејшели"
            },
            "swe": {
                "official": "Republiken Seychellerna",
                "common": "Seychellerna"
            },
            "tur": {
                "official": "Seyşeller Cumhuriyeti",
                "common": "Seyşeller"
            },
            "urd": {
                "official": "جمہوریہ سیچیلیس",
                "common": "سیچیلیس"
            },
            "zho": {
                "official": "塞舌尔共和国",
                "common": "塞舌尔"
            }
        },
        "latlng": {
            "0": "-4.58333333",
            "1": "55.66666666"
        },
        "landlocked": "false",
        "area": "452",
        "demonyms": {
            "eng": {
                "f": "Seychellois",
                "m": "Seychellois"
            },
            "fra": {
                "f": "Seychelloise",
                "m": "Seychellois"
            }
        },
        "flag": "🇸🇨",
        "maps": {
            "googleMaps": "https://goo.gl/maps/aqCcy2TKh5TV5MAX8",
            "openStreetMaps": "https://www.openstreetmap.org/relation/536765"
        },
        "population": "98462",
        "gini": {
            "2018": "32.1"
        },
        "fifa": "SEY",
        "car": {
            "signs": {
                "0": "SY"
            },
            "side": "left"
        },
        "timezones": {
            "0": "UTC+04:00"
        },
        "continents": {
            "0": "Africa"
        },
        "flags": {
            "png": "https://flagcdn.com/w320/sc.png",
            "svg": "https://flagcdn.com/sc.svg",
            "alt": "The flag of Seychelles is composed of five broadening oblique bands of blue, yellow, red, white and green, which extend from the hoist side of the bottom edge to the top and fly edges of the field."
        },
        "coatOfArms": {
            "png": "https://mainfacts.com/media/images/coats_of_arms/sc.png",
            "svg": "https://mainfacts.com/media/images/coats_of_arms/sc.svg"
        },
        "startOfWeek": "monday",
        "capitalInfo": {
            "latlng": {
                "0": "-4.62",
                "1": "60"
            }
        }
    };
    const update = await Country.update(data);
    expect(update.error).toBe(false);
});

test('Update a country with invalid data', async () => {
    const data = {};
    const update = await Country.update(data);
    expect(update.error).toBe(true);
    expect(update.status).toBe(400);
    expect(update.message).toBe('Country ID is required');
});

/////////////////////////////////////////////////////////////////////
///TESTS FONCTIONNELS
/////////////////////////////////////////////////////////////////////

const countries = require('../router/countries');
const express = require("express");
const request = require("supertest");

jest.mock('../middlewares/logged', () => jest.fn((req, res, next) => next()));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/countries', countries);

describe('GET /countries/:id/:type', () => {
    it('should return 404 if country not found', async () => {
        const response = await request(app).get('/countries/123/full');
        console.log(response);
        expect(response.status).toBe(404);
        expect(response.text).toBe('Country not found');
    });

    it('should return full data of a country', async () => {
        const response = await request(app).get('/countries/250/full');
        console.log(response)
        expect(response.status).toBe(200);
    });

    it('should return normal data of a country', async () => {
        const response = await request(app).get('/countries/250/normal');
        expect(response.status).toBe(200);
        expect(response.body.name).toBeDefined();
        expect(response.body.cca2).toBeDefined();
        expect(response.body.cca3).toBeDefined();
        expect(response.body.currencies).toBeDefined();
        expect(response.body.languages).toBeDefined();
        expect(response.body.flag).toBeDefined();
        expect(response.body.capital).toBeDefined();
        expect(response.body.population).toBeDefined();
        expect(response.body.continents).toBeDefined();
    });

    it('should return short data of a country', async () => {
        const response = await request(app).get('/countries/250/short');
        expect(response.status).toBe(200);
        expect(response.body.name).toBeDefined();
        expect(response.body.cca2).toBeDefined();
        expect(response.body.cca3).toBeDefined();
        expect(response.body.flag).toBeDefined();
    });
});