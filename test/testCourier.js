

import courier, {
    setCourierDefaults
} from '../src/index';

const defaults = {
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