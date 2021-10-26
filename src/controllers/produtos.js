
export default (app) => {
    if (app) {
        app.get("/produtos", (request, response) => {
            response.send("Olá Mundo!")
        })

    };
};

