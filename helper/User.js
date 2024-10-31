const fs = require('fs');
const path = require('path');
const {compareSync, hashSync} = require("bcrypt");
const countries = require("../data/countries.json");
const users = require("../data/users.json");

const User = {
    /**
     * Creates a new user with the given username and password.
     *
     * @param {string} username - The username of the new user.
     * @param {string} password - The password of the new user.
     * @returns {Object} - An object containing the result of the operation.
     * @property {boolean} error - Indicates if there was an error.
     * @property {string} message - A message describing the result.
     * @property {number} status - The HTTP status code of the result.
     */
    create: async (username, password) => {
        if (!username && !password) {
            return {
                error: true,
                message: 'Username and password are required',
                status: 400
            }
        }

        try {
            const getUser = User.get(username);
            if (getUser) {
                return User.verify(username, password);
            } else {
                const hashedPassword = hashSync(password, 10);
                const usersData = require('../data/users.json');
                usersData.push({
                    username,
                    password: hashedPassword,
                    created_at: new Date(),
                    role: 'user'
                });

                await fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(usersData), (err) => {
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
                    data: { username, isAdmin: false },
                    status: 201
                };
            }
        } catch (err) {
            return {
                error: true,
                message: err.message,
                status: 500
            }
        }
    },

    /**
     * Deletes a user with the given username.
     *
     * @param {string} username - The username of the user to be deleted.
     * @returns {Object} - An object containing the result of the operation.
     * @property {boolean} error - Indicates if there was an error.
     * @property {string} message - A message describing the result.
     * @property {number} status - The HTTP status code of the result.
     */
    delete: async (username) => {
        if (!username) {
            return {
                error: true,
                message: 'Username is required',
                status: 400
            }
        }

        const usersData = require('../data/users.json');
        const userIndex = usersData.findIndex(user => user.username === username);

        if (userIndex === -1) {
            return {
                error: true,
                message: 'User not found',
                status: 404
            }
        }

        usersData.splice(userIndex, 1);

        await fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(usersData), (err) => {
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
            message: 'User deleted successfully',
            status: 200
        }
    },

    /**
     * Retrieves a user with the given username.
     *
     * @param {string} username - The username of the user to be retrieved.
     * @returns {Object|undefined} - The user object if found, otherwise undefined.
     * @throws {Error} - Throws an error if the username is not provided.
     */
    get: (username) => {
        if (!username) {
            throw new Error('Username is required');
        }

        const usersData = require('../data/users.json');
        return usersData.find(user => user.username === username);
    },

    /**
     * Verifies a user's credentials with the given username and password.
     *
     * @param {string} username - The username of the user to be verified.
     * @param {string} password - The password of the user to be verified.
     * @returns {Object} - An object containing the result of the operation.
     * @property {boolean} error - Indicates if there was an error.
     * @property {string} message - A message describing the result.
     * @property {number} status - The HTTP status code of the result.
     * @property {Object} [data] - The user data if the operation was successful.
     */
    verify: (username, password) => {
        if (!username && !password) {
            return {
                error: true,
                message: 'Username and password are required',
                status: 400
            }
        }

        const usersData = require('../data/users.json');
        const user = usersData.find(user => user.username === username);

        if (!user) {
            return {
                error: true,
                message: 'User not found',
                status: 404
            }
        }

        if (!compareSync(password, user.password)) {
            return {
                error: true,
                message: 'Invalid password',
                status: 401
            }
        }

        return {
            error: false,
            data: {username: user.username, isAdmin: user.role === 'admin'},
            status: 200
        }
    },

    /**
     * Retrieves all users.
     *
     * @returns {Object} - An object containing the result of the operation.
     * @property {boolean} error - Indicates if there was an error.
     * @property {Object[]} data - The list of all users.
     */
    getAll: () => {
        const usersData = require('../data/users.json');
        return {
            error: false,
            data: usersData
        }
    },

    updateRole: async (username, role) => {
        const users = require('../data/users.json');
        const user = users.find(user => user.username === username);

        if (!user) {
            return {
                error: true,
                message: 'User not found',
                status: 404
            }
        }

        const index = users.findIndex(user => user.username === username);
        users[index].role = role;

        await fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users), (err) => {
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
            data: users[index],
            status: 200
        };
    }
}

module.exports = User;