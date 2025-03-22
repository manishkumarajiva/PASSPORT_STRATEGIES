const JWT = require('jsonwebtoken');

const AccessToken = async (user) => {
    try {
        const payload = {
            id : user.id,
            username : user.username,
            role : user.role ?? 'USER'
        }

        const options = {
            issuer : 'Manish Dhiman',
            expiresIn : '1h'
        }

        const secret_key = process.env.AUTHORIZATION_SECRET_KEY

        const authToken = await JWT.sign(payload, secret_key, options);
        return authToken;
    } catch (error) {
        console.log('ERROR DURING ACCESS AUTH TOKEN')
    }

}

module.exports = AccessToken;