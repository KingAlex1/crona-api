const supertest = require('supertest')
const server = require('../../../server')
const {connect ,dropDb  , close} = require('../../../utils/mongo')
const NewsService = require('../services/news-services')

describe('News routes', function () {
    describe('news search', function () {
        beforeAll(async () => {
            await connect();
            await dropDb();
        });

        afterAll(async () => {
            await dropDb();
            await close();
        });



        it('no records by get all', async () => {
            const response = await supertest(server).get('/news');

            expect(response.body).toEqual({
                data: [],
                filter: {
                    title: '',
                    tags: [],
                    size: 20,
                    page: 1,
                },
                count: 0,
                pages: 0,
            });
        });

        it('return as expected search', async ()=> {
            await NewsService.createNews({
                title: 'Senior js',
                description: 'desc',
                tags: ['js, node'],
                userHash: 'dfdsf',
                link:'aaa',
                date:'01.01.01'
            })
            await NewsService.createNews({
                title: 'Middle php',
                description: 'desc',
                tags: ['js, php'],
                userHash: 'dfdsf',
                link:'aaa',
                date:'01.01.01'
            });
            await NewsService.createNews({
                title: 'Senior php',
                description: 'desc',
                tags: ['php'],
                userHash: 'dfdsf',
                link:'aaa',
                date:'01.01.01'
            });

            const response = await supertest(server).get('/news?title=Se')
            const { body: { filter, data, count, pages } } = response;

            expect(filter).toEqual({
                title: 'Se',
                tags: [],
                size: 20,
                page: 1,
            });
            expect(data).toHaveLength(2);
            expect(count).toBe(2);
            expect(pages).toBe(1);
        });

        it('return no results by search', async () => {
            const response = await supertest(server).get('/news?title=Jun');
            const { body: { filter, data, count, pages } } = response;

            expect(filter).toEqual({
                title: 'Jun',
                tags: [],
                size: 20,
                page: 1,
            });
            expect(data).toHaveLength(0);
            expect(count).toBe(0);
            expect(pages).toBe(0);
        });


    });
});