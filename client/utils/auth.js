// use this to decode a token and get the user's information from it
//from package-json: json web token
import decode from "jwt-decode"

// create a new class to instantiate for a user
class AuthService {
    //get user data
    getProfile() {
        return decode(this.getToken());
    }

    // check if user is logged in
    loggedIn() {
        //checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token); //handwaiving here
    }

    //check if token is expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }
}

export default new AuthService();
