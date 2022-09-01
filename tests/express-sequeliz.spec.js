const { expect } = require('chai');
const chai = require('chai').use(require('chai-as-promised'));
const { db, Campus, Student } = require('../server/db');

const _app = require('../server/app');
const app = require('supertest')(_app);

xdescribe('Sequelize Tests', () => {
    //****************empty database****************
    beforeEach(async () => {
        await db.sync({ force: true });
    });
    //****************Campus Model Tests****************
    describe('Campus', () => {
        describe('requires a name', () => {
            it('cannot be null', async () => {
                await expect(
                    Campus.create({ address: '123 Random Lane' }),
                    "We shouldn't be able to create a campus with no name"
                ).to.be.rejected;
            });
            it('cannot be empty', async () => {
                await expect(
                    Campus.create({ name: '', address: '123 Random Lane' }),
                    "We shouldn't be able to create a campus with an empty name"
                ).to.be.rejected;
            });
        });
        describe('requires an address', () => {
            it('cannot be null', async () => {
                await expect(
                    Campus.create({ name: 'University' }),
                    "We shouldn't be able to create a campus with no address"
                ).to.be.rejected;
            });
            it('cannot be empty', async () => {
                await expect(
                    Campus.create({ name: 'University', address: '' }),
                    "We shouldn't be able to create a campus with an empty name"
                ).to.be.rejected;
            });
        });
    });
    //****************Student Model Test****************
    describe('Student', () => {
        describe('requires a valid email', () => {
            it('cannot be null', async () => {
                await expect(
                    Student.create({ firstName: 'John', lastName: 'Doe' }),
                    "We shouldn't be able to create a Student with no email"
                ).to.be.rejected;
            });
            it('cannot be empty', async () => {
                await expect(
                    Student.create({
                        firstName: 'John',
                        lastName: 'Doe',
                        email: '',
                    }),
                    "We shouldn't be able to create a Student with an empty email"
                ).to.be.rejected;
            });
            it('must be valid', async () => {
                await expect(
                    Student.create({
                        firstName: 'John',
                        lastName: 'Doe',
                        email: 'awdwawdgmail.com',
                    }),
                    "We shouldn't be able to create a Student without an '@'"
                ).to.be.rejected;
                await expect(
                    Student.create({
                        firstName: 'John',
                        lastName: 'Doe',
                        email: 'awd wawd@gmail.com',
                    }),
                    "We shouldn't be able to create a Student with spaces"
                ).to.be.rejected;
                await expect(
                    Student.create({
                        firstName: 'John',
                        lastName: 'Doe',
                        email: 'awdwawd@gmail',
                    }),
                    "We shouldn't be able to create a Student without a top level domain"
                ).to.be.rejected;
                await expect(
                    Student.create({
                        firstName: 'John',
                        lastName: 'Doe',
                        email: 'awdwawd@.com',
                    }),
                    "We shouldn't be able to create a Student without a domain name"
                ).to.be.rejected;
            });
        });
    });
});

xdescribe('Express Tests', () => {
    //****************Seed databse****************
    beforeEach(async () => {
        await db.sync({ force: true });
        const _students = await Promise.all([
            Student.create({
                firstName: 'John',
                lastName: 'Doe',
                email: 'jd@som.com',
            }),
            Student.create({
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jdf@som.com',
            }),
            Student.create({
                firstName: 'Random',
                lastName: 'Person',
                email: 'rpers@aol.com',
            }),
            Student.create({
                firstName: 'Another',
                lastName: 'One',
                email: 'anothero@yahoo.com',
            }),
        ]);
        const _campuses = await Promise.all([
            Campus.create({ name: 'University', address: '123 somewhere' }),
            Campus.create({ name: 'Place', address: '2 Location' }),
            Campus.create({ name: 'Greendale', address: '1 University Drive' }),
        ]);
        const [john, jane] = _students;
        const [university, place] = _campuses;
        await john.setCampus(place, { hooks: false });
        await jane.setCampus(university, { hooks: false });
    });
    describe('students routes', () => {
        describe('GET /api/students', () => {
            it('responds with all students', async () => {
                const response = await app.get('/api/students');
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array');
                const names = response.body.map(user => user.firstName);
                expect(names).to.include('Another');
                expect(names).to.include('Jane');
            });

            it('includes a campus ID if a student has one', async () => {
                const response = await app.get('/api/students');
                const campuses = response.body.map(user => user.campusId);
                expect(campuses).to.include(2);
                expect(campuses).to.include(null);
                expect(response.body.length).to.equal(4);
            });
        });
        describe('GET /api/students/:id', () => {
            it('responds with a single student including their campus', async () => {
                const response = await app.get('/api/students/2');
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('object');

                expect(response.body.lastName).to.equal('Doe');
                expect(response.body.campus.name).to.equal('University');

                const response2 = await app.get('/api/students/3');
                expect(response2.status).to.equal(200);
                expect(response2.body).to.be.an('object');

                expect(response2.body.lastName).to.equal('Person');
                expect(response2.body.campus).to.equal(null);
            });
        });
    });
});
