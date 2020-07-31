const request = require('supertest');
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach( async () => {
       await  connection.migrate.rollback();
       await  connection.migrate.latest();
    });

    afterAll( async () => {
        await connection.destroy();
    })

    it('Should be create new Ong', async () => {
        const response = await request(app).post('/ongs')
        //.set
        .send({
            name : "APAD",
            email: "contato@jofege.com.br",
            whatsapp : "19997139904",
            city: "Itatiba",
            uf: "SP"
        })

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});