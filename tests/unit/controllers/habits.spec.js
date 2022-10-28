const habitsController = require('../../../controllers/habits')
const Habit = require('../../../models/Habit');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }


describe('habits controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        test('it returns all habits with a 200 status code', async () => {
            jest.spyOn(Habit, 'all')
                 .mockResolvedValue(['habit1']);
            const mockReq = { currentUser: { id: 1 } }
            await habitsController.index(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['habit1']);
        })
    });


    describe('getById', () => {
        test('it returns a habit with a 200 status code', async () => {
            let habitData = { id: 1, name: 'Test Habit', difficulty: 'easy', frequency: 'd', number_of_rep: 1, user_id: 1 }
            jest.spyOn(Habit, 'getById')
                .mockResolvedValueOnce(new Habit(habitData));
                const mockReq = { params: { id: 1 } }
                await habitsController.getById(mockReq, mockRes);
                expect(mockStatus).toHaveBeenCalledWith(200);
                expect(mockJson).toHaveBeenCalledWith(new Habit(habitData));
        })
    });


    describe('create', () => {
        test('it returns a new habit with a 201 status code', async () => {
            let habitData = { 
                name: 'Test 2 Habit', 
                difficulty: 'hard', 
                frequency: 'w', 
                number_of_rep: 2, 
                user_id: 1 }
            jest.spyOn(Habit, 'create')
                .mockResolvedValue(new Habit(habitData));
                
            const mockReq = { currentUser: { id: 1 },  body: habitData }
            await habitsController.create(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(new Habit(habitData));
        })
    });


    describe('destroy', () => {
        test('it returns a 204 status code on successful deletion', async () => {
            jest.spyOn(Habit.prototype, 'destroy')
                .mockResolvedValue('Deleted');
            
            const mockReq = { params: { id: 1 } }
            await habitsController.destroy(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(204);
        })
    });
    
})
