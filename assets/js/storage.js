// ERaja Namespaced Storage Engine

const ERajaStorage = {

    prefix: "eraja_",

    set(key, value) {
        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(value));
        } catch (error) {
            console.error("Storage Set Error:", error);
        }
    },

    get(key) {
        try {
            const value = localStorage.getItem(this.prefix + key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error("Storage Get Error:", error);
            return null;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(this.prefix + key);
        } catch (error) {
            console.error("Storage Remove Error:", error);
        }
    },

    clearAll() {
        try {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            });
        } catch (error) {
            console.error("Storage Clear Error:", error);
        }
    }

};