let instance = null;

class Auth {
    /**
     * @return {null}
     */
    constructor() {
        if (!instance) {
            instance = this;
        }

        this.authenticated = false;

        return instance;

    }

    login(cb) {
        this.authenticated = true;
        cb();
    }

    logout(cb) {
        this.authenticated = false;
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default Auth;
