

import courier, {
    setCourierDefaults
} from '../src/index';

const defaults = {
    cache: 'no-cache',
    headers: {
        'CSRFToken': 'blah'
    }
};

setCourierDefaults(defaults);

/**
 * @todo create various fake apis to do actual testing
 */

const request = courier();

request
    //.get('//localhost:3000/test')
    .get('http://jsonplaceholder.typicode.com/photos')
    .query('test', 'me')
    .query({
        another: 'test',
        to: 'run',
        Test: 'CAPITALS'
    })
    .send((data, error, response) => {
        console.log(data);
        console.log(error);
        console.log(response);
    });

fetch('http://jsonplaceholder.typicode.com/photos?test=me&another=test&to=run&Test=CAPITALS')
    .then((response) => {
        console.log(response);
    });

courier({
    method: 'post',
    query: {
        another: 'test',
        to: 'run',
        Test: 'CAPITALS'
    },
    url: 'http://jsonplaceholder.typicode.com/photos'
})
    .send((data, error, response) => {
        console.log(data);
        console.log(error);
        console.log(response);
    });