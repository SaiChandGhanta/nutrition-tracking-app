import jwt, { decode } from "jsonwebtoken";

// Note -> Use the middleware in the routes after importing it
// e.g. -> router.post('/', auth, createIntakeLog);
// Checks if the user is valid and allows next action
// Click the nutrition button => auth middleware verify -> (NEXT) => Nutrition Controller
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // check if custom or google token
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, "secret");

            req.userId = decodedData?.id;
        } else {
            // This is for google auth
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        // calling next action
        next();

    } catch (error) {
        console.log(error);
    }
};

export default auth;