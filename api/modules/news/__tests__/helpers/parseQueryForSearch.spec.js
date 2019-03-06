const parseQueryForSearch = require('../../helpers/parseQueryForSearch')

describe('parseQueryForSearch', function () {
    it('should parse quary as expected with superflous option', function () {

        const res = parseQueryForSearch({fakeParam: 'aaaaaaaaaaa'})

        expect(res).toEqual({
            title: '',
            tags: [],
            size: 20,
            page: 1
        })

    });

    it('parse query as expected', () => {
        const data = {
            title: 'test',
            tags: 'aa, bb',
            size: 13,
            page: 2,
        };
        const res = parseQueryForSearch(data);

        expect(res).toEqual({
            ...data,
            tags: data.tags.split(','),
        });
    });

    it('parse query with tags', () => {
        const res = parseQueryForSearch({ tags: 'first,second' });

        expect(res).toEqual({
            title: '',
            tags: ['first', 'second'],
            size: 20,
            page: 1,
        });
    });

    it('restore size > 20', () => {
        const res = parseQueryForSearch({ size: 40 });

        expect(res).toEqual({
            title: '',
            tags: [],
            size: 20,
            page: 1,
        });
    });


});