const fs = require("fs");
const path = require("path");

const Country = {
    /**
     * Retrieves all countries data.
     *
     * @returns {Object} - An object containing the result of the operation.
     * @property {boolean} error - Indicates if there was an error.
     * @property {Object[]} data - An array of country data.
     */
    getAll: () => {
        const countries = require('../data/countries.json');
        return {
            error: false,
            data: countries
        }
    },

    /**
     * Retrieves a country with the given ID.
     *
     * @param {number} id - The ID of the country to be retrieved.
     * @returns {Object} - An object containing the result of the operation.
     * @property {boolean} error - Indicates if there was an error.
     * @property {string} message - A message describing the result.
     * @property {number} status - The HTTP status code of the result.
     * @property {Object} [data] - The country data if the operation was successful.
     */
    get: (id) => {
        const countries = require('../data/countries.json');
        const country = countries.find(country => country.ccn3 === id.toString());

        if (!country) {
            return {
                error: true,
                message: 'Country not found',
                status: 404
            }
        }

        return {
            error: false,
            data: country
        }
    },

    /**
     * Retrieves the full data of a country with the given ID.
     *
     * @param {number} id - The ID of the country to be retrieved.
     * @returns {Object} - An object containing the result of the operation.
     * @property {boolean} error - Indicates if there was an error.
     * @property {string} message - A message describing the result.
     * @property {number} status - The HTTP status code of the result.
     * @property {Object} [data] - The country data if the operation was successful.
     */
    getFullData: (id) => {
        return Country.get(id);
    },

    /**
     * Retrieves the normal data of a country with the given ID.
     *
     * @param {number} id - The ID of the country to be retrieved.
     * @returns {Object} - An object containing the result of the operation.
     * @property {boolean} error - Indicates if there was an error.
     * @property {string} message - A message describing the result.
     * @property {number} status - The HTTP status code of the result.
     * @property {Object} [data] - The country data if the operation was successful.
     */
    getNormalData: (id) => {
        const country = Country.get(id);

        if (!country.error) {
            const {name, cca2, cca3, currencies, languages, flag, capital, population, continents} = country.data;
            return {
                error: false,
                data: {
                    name,
                    cca2,
                    cca3,
                    currencies,
                    languages,
                    flag,
                    capital,
                    population,
                    continents
                }
            }
        }

        return country;
    },

    /**
     * Retrieves the short data of a country with the given ID.
     *
     * @param {number} id - The ID of the country to be retrieved.
     * @returns {Object} - An object containing the result of the operation.
     * @property {boolean} error - Indicates if there was an error.
     * @property {string} message - A message describing the result.
     * @property {number} status - The HTTP status code of the result.
     * @property {Object} [data] - The country data if the operation was successful.
     */
    getShortData: (id) => {
        const country = Country.get(id);

        if (!country.error) {
            const {name, flag, cca2, cca3} = country.data;
            return {
                error: false,
                data: {
                    name,
                    flag,
                    cca2,
                    cca3
                }
            }
        }

        return country;
    },

    /**
     * Retrieves custom data of a country with the given ID and specified fields.
     *
     * @param {number} id - The ID of the country to be retrieved.
     * @param {Array<string>} fields - The fields to be retrieved from the country data.
     * @returns {Object} - An object containing the result of the operation.
     * @property {boolean} error - Indicates if there was an error.
     * @property {string} message - A message describing the result.
     * @property {number} status - The HTTP status code of the result.
     * @property {Object} [data] - The country data if the operation was successful.
     * @property {Array<string>} [errors] - The fields that were not found.
     */
    getCustomData: (id, fields) => {
        const country = Country.get(id);

        if (!country.error) {
            const data = {};
            const errors = [];

            fields.forEach(field => {
                if (country.data[field]) {
                    data[field] = country.data[field];
                } else {
                    errors.push(field);
                }
            });

            if (errors.length === fields.length) {
                return {
                    error: true,
                    message: 'Fields not found',
                    status: 404
                }
            } else if (errors.length > 0) {
                return {
                    error: false,
                    data,
                    errors,
                    message: 'Some fields not found',
                    status: 200
                }
            } else {
                return {
                    error: false,
                    data,
                    status: 200
                }
            }
        }

        return country;
    },

    /**
     * Updates the data of a country with the given data.
     *
     * @param {Object} data - The data to update the country with.
     * @returns {Promise<Object>} - An object containing the result of the operation.
     * @property {boolean} error - Indicates if there was an error.
     * @property {string} message - A message describing the result.
     * @property {number} status - The HTTP status code of the result.
     * @property {Object[]} [data] - The updated list of countries if the operation was successful.
     */
    update: async (data) => {
        if (!data.ccn3) {
            return {
                error: true,
                message: 'Country ID is required',
                status: 400
            }
        }

        const countries = require('../data/countries.json');
        const country = countries.find(country => country.ccn3 === data.ccn3);

        if (!country) {
            return {
                error: true,
                message: 'Country not found',
                status: 404
            }
        }

        const index = countries.indexOf(country);
        countries[index] = {...country, ...data};

        await fs.writeFile(path.join(__dirname, '../data/countries.json'), JSON.stringify(countries), (err) => {
            if (err) {
                return {
                    error: true,
                    message: err.message,
                    status: 500
                }
            }
        });

        return {
            error: false,
            data: countries[index],
            status: 200
        };
    }
}

module.exports = Country;