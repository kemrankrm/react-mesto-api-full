// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
    'https://kemrankrm-fe.nomoredomains.work',
    'http://kemrankrm-fe.nomoredomains.work',
    'localhost:3000',
    'localhost:3001',
    'http://localhost:3001',
];

const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

const allowRequest = (req, res, next) => {
    const { origin } = req.headers;
    const { method } = req;
    const requestHeaders = req.headers['access-control-request-headers']; 

    console.log('CORUS MIDDLE WARE OK')

    if (allowedCors.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        console.log('ORIGIN OK', origin);
    }

    if (method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
        res.header('Access-Control-Allow-Headers', requestHeaders);

        return res.end();
    }

    next();
}

module.exports = {
    allowRequest
}