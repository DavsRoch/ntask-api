describe("Routes: Token", () => {
    const Users = app.db.models.Users;
    describe("POST /token", () => {
        beforeEach(done => {
            // código pré-teste
            Users
                .destroy({where: {}})
                .then(() => Users.create({
                    name: "Daviny",
                    email: "daviny@mail.net",
                    password: "12345"
                }))
                .then(() => done());
        });
        describe("status 200", () => {
            it("returns authenticated user token", done => {
                // código teste
                request.post("/token")
                    .send({
                        email: "daviny@mail.net",
                        password: "12345"
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.include.keys("token");
                        done(err);
                    });
            });
        });
        describe("status 401", () => {
            it("throws error when password is incorrect", done => {
                // código teste
                request.post("/token")
                    .send({
                        email: "daviny@mail.net",
                        password: "SENHA_ERRADA"
                    })
                    .expect(401)
                    .end((err, res) => {
                        console.log(res.body);
                        done(err)
                    });
            });
            it("throws error when email not exist", done => {
                // código testt
                request.post("/token")
                    .send({
                        email: "da@mail.net",
                        password: "123345"
                    })
                    .expect(401)
                    .end((err, res) => {
                        done(err)
                    })
            });
            it("throws error when email and password are blank", done => {
                // codigo teste
                request.post("/token")
                    .expect(401)
                    .end((err, res) => {
                        done(err);
                    });
            });
        });
    });
});
