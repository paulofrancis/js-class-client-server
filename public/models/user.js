class User {

    constructor(name, gender, dob, country, email, password, photo, admin) {
        this._id;
        this._name = name;
        this._gender = gender;
        this._dob = dob;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get gender() {
        return this._gender;
    }

    get dob() {
        return this._dob;
    }

    get country() {
        return this._country;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get photo() {
        return this._photo;
    }

    set photo(value) {
        this._photo = value;
    }

    get admin() {
        return this._admin;
    }

    get register() {
        return this._register;
    }

    loadFromJSON(json) {

        for (let name in json) {
            switch (name) {
                case '_register':
                case '_dob':
                    this[name] = new Date(json[name]);
                    break;
                default:
                    if (name.substring(0, 1) === '_') this[name] = json[name];
                    break;
            }
        }
    }

    toJSON() {

        let json = {};

        Object.keys(this).forEach(key => {

            if (this[key] !== undefined) json[key] = this[key];
        });

        return json;
    }

    save() {

        return new Promise((resolve, reject) => {

            let promise;

            if (this.id) {

                promise = HttpRequest.put(`/users/${this.id}`, this.toJSON());

            } else {

                promise = HttpRequest.post('/users', this.toJSON());
            }

            promise.then(data => {

                this.loadFromJSON(data);
                resolve(this);

            }).catch(err => {

                reject(err);
            });
        });
    }

    static getUserStorage() {

        return Fetch.get('/users');
    }

    remove() {

        return HttpRequest.delete(`/users/${this.id}`);
    }

}