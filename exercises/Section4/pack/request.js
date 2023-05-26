const axios = require('axios');

axios.get('https://dauphine.psl.eu')
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    })
    .then(() => {
        console.log("All Done");
    })
    ;