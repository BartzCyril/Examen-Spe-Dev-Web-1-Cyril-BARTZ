const ObjectHelper = {
    /**
     * Reconstructs a nested object from a flat object with dot-separated keys.
     *
     * @param {Object} obj - The flat object to be reconstructed.
     * @returns {Object} - The reconstructed nested object.
     */
    reconstruct: (obj) => {
        const newObj = {};

        Object.keys(obj).forEach(key => {
            const keys = key.split('.');
            keys.reduce((acc, currKey, index) => {
                if (!acc[currKey]) {
                    acc[currKey] = index === keys.length - 1 ? obj[key] : {};
                }
                return acc[currKey];
            }, newObj);
        });

        return newObj;
    }
}

module.exports = ObjectHelper;