const pick = require('lodash/pick')
// const connect = require('../../../../utils/mongo/connect')
// const close = require('../../../../utils/mongo/close')
const {connect ,dropDb ,close} = require('../../../../utils/mongo')
const NewsService = require('../../services/news-services')

describe('News Service', function () {
    beforeAll(async () => {
        await connect();
        await dropDb();
    });

    afterAll(async () => {
        await dropDb();
        await close();
    });

    it('should create news as expected', async function () {

        const newsData = {
            userHash: 'some-hash',
            title: 'news-title',
            description: "News description",
            date: '01.01.01',
            link: 'link',
            tags: [
                'js',
                'node'
            ]
        }

        const newsModel = await NewsService.createNews(newsData)
        const news = newsModel.toObject();

        expect(pick(news, Object.keys(newsData))).toEqual(newsData)
        expect(news).toHaveProperty('hash')
        expect(news).toHaveProperty('createdAt')
        expect(news).toHaveProperty('updatedAt')
        await dropDb()

    });

    it("error iser can\'t create more than 10 news", async function () {
        const newsData = {
            userHash: 'some-hash',
            title: 'news-title',
            description: "News description",
            date: '01.01.01',
            link: 'link',
            tags: [
                'js',
                'node'
            ]
        }

        let i = 0
        do {            
            await NewsService.createNews(newsData)
            i++
        } while (i < 9)

        try {
            await NewsService.createNews(newsData);
        } catch (e) {
            expect(e).toEqual(new Error('нельзя создавать больше 10 записей'));
        }

    });



    it('error on not valid data', async () => {
        try {
            await NewsService.createNews({});
        } catch (e) {
            const {errors} = e.toJSON();

            expect(errors).toHaveProperty('description');
            expect(errors).toHaveProperty('title');
            expect(errors).toHaveProperty('userHash');
            expect(errors).toHaveProperty('link');
        }
    })


});