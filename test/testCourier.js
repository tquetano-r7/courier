

import courier from '../src/index';

const request = courier();

request
    //.get('//localhost:3000/test')
    .get('http://jsonplaceholder.typicode.com/photos')
    .query('test', 'me')
    .query({
        another: 'test',
        to: 'run'
    })
    .send((data, error, response) => {
        console.log(data);
        console.log(error);
        console.log(response);
    });