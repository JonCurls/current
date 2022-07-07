// use this to decode a token and get the user's information from it
//from package-json: json web token
import decode from "jwt-decode"

// create a new class to instantiate for a user
class AuthService {
    //get user data
    getProfile() {
        return decode(this.getToken());
    }
}

export default new AuthService();
