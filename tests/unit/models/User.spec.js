const User = require('../../../models/User');
const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('User', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with users on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}]});
            const all = await User.all;
            expect(all).toHaveLength(1)
        })
    });

    describe('getById', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = { id: 1, user_name: 'Test Author', email: 'test@author.com', password: 'mocktestAuthor' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ userData] });
            const result = await User.getById(1);
            expect(result).toBeInstanceOf(User)
        })
    });
})
