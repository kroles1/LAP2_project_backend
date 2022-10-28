const usersController = require('../../../controllers/users')
const User = require('../../../models/User');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }

describe('users controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        test('it returns all users with a 200 status code', async () => {
            jest.spyOn(User, 'all', 'get')
                 .mockResolvedValue(['user1']);
            await usersController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['user1']);
        })
    });


    describe('getById', () => {
        test('it returns a user with a 200 status code', async () => {
            let testUser = {
                id: 1, user_name: 'Test User', 
                email: 'testuser@testuser.com',
                password: 'testingmockuser'
            }
            jest.spyOn(User, 'getById')
                .mockResolvedValue(new User(testUser));
                
            const mockReq = { params: { id: 1 } }
            await usersController.getById(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new User(testUser));
        })
    });
})
