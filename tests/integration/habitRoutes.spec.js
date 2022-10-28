describe('habit endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })

    it('should not return a list of all habits in database without a user', async () => {
        const res = await request(api).get('/habits');
        expect(res.statusCode).toEqual(401);
        
    });

    it('should return a list of all habits of a user in database', async () => {
        const res = await request(api).get('/habits');
        expect(req.currentUser, res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
    });

    
});
