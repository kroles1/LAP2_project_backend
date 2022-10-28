describe('auth endpoints', () => {
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
    });

    it("Responds with the user's information", async () => {
          await request(api)
            .post('/auth/login')
            .send({
              email: 'example@email.com',
              password: 'Password'
            })
            .expect(200);
        });
});
