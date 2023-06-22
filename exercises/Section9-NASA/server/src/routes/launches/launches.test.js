const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200)
            ;
        expect(response.body.length).toBe(3);
    });
});

describe('Test POST /launches', () => {
    const completeLaunchData = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'January 4, 2028',
    };

    // Removing the launchDate property from the completeLaunchData
    const { launchDate, ...launchDataWithOutDate    } = completeLaunchData;
    const { mission,    ...launchDataWithOutMission } = completeLaunchData;
    const { rocket,     ...launchDataWithOutRocket  } = completeLaunchData;
    const { target,     ...launchDataWithOutTarget  } = completeLaunchData;

    const errorMissingProperty = { error: 'Missing launch property' };
    const errorInvalidDate = { error: 'Invalid Launch Date.' };

    test('It shoudl respond with 201 success', async () => {

        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201)
            ;

            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responsDate = new Date(response.body.launchDate).valueOf();

            expect(response.body).toMatchObject(launchDataWithOutDate);
            expect(responsDate).toBe(requestDate);
    });
    test('It should catch missing date property to 400', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithOutDate)
            .expect('Content-Type', /json/)
            .expect(400)
            ;
        expect(response.body).toStrictEqual(errorMissingProperty);
    });
    test('It should catch missing rocket property to 400', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithOutRocket)
            .expect('Content-Type', /json/)
            .expect(400)
            ;
        expect(response.body).toStrictEqual(errorMissingProperty);
    });
    test('It should catch missing Mission property to 400', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithOutMission)
            .expect('Content-Type', /json/)
            .expect(400)
            ;
        expect(response.body).toStrictEqual(errorMissingProperty);
    });
    test('It should catch missing Target property to 400', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithOutTarget)
            .expect('Content-Type', /json/)
            .expect(400)
            ;
        expect(response.body).toStrictEqual(errorMissingProperty);
    });
    test('It should catch invalid date', async () => {
        const response = await request(app)
            .post('/launches')
            .send({
                ...launchDataWithOutDate,
                launchDate: 'Hello',
            })
            .expect('Content-Type', /json/)
            .expect(400)
            ;
        expect(response.body).toStrictEqual(errorInvalidDate);
    });
});

describe('Test DELETE /launches', () => {
    // Test Data if needed

    // Test that the call passed well
    test('Some successful delete', async () => {

    });

    // Test that the call is correctly handled
    test('Some unsuccessful delete', async () => {

    });
});