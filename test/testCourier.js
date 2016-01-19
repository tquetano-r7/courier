

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
    .use((request) => {
        if (request.url.charAt(0) === '/') {
            request.url = `//localhost:8099/${request.url}`;
        }


    })
    .send((data) => {
        console.log(data);
    });

//fetch('http://jsonplaceholder.typicode.com/photos?test=me&another=test&to=run&Test=CAPITALS')
//    .then((response) => {
//        console.log(response);
//    });

courier({
    method: 'post',
    url: 'http://jsonplaceholder.typicode.com/photos'
})
    .send((data) => {
        console.log(data);
    });