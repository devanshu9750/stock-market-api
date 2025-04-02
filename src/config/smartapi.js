let { SmartAPI, WebSocketV2 } = require('smartapi-javascript');
let { TOTP } = require('totp-generator');

let smart_api = new SmartAPI({ api_key: 'smartapi_key' });
let smart_api_ws = null;

const connectSmartApi = async () => {
    try {
        let totp = TOTP.generate(process.env.SMART_API_TOTP_KEY);
        let data = await smart_api.generateSession(process.env.ANGEL_ONE_CLIENT_CODE, process.env.ANGEL_ONE_PASSWORD, totp.otp);

        if (data.status) {
            smart_api_ws = WebSocketV2({
                jwttoken: data.data.jwtToken,
                apikey: process.env.SMART_API_TOTP_KEY,
                clientcode: process.env.ANGEL_ONE_CLIENT_CODE,
                feedtype: data.data.feedToken
            });

            console.log('✅ Smart API Connection Successful');
        } else {
            console.error('❌ Smart API Connection Failed:', data.message);
            throw new Error('Smart API connection failed');
        }
    } catch (error) {
        console.error('❌ Smart API Connection Error:', err);
        throw new Error('Smart API connection failed');
    }
}

smart_api.setSessionExpiryHook(connectSmartApi);

const getSmartApiWebSocket = () => smart_api_ws;

module.exports = { smart_api, connectSmartApi, getSmartApiWebSocket };