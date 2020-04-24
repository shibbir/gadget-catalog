module.exports = app => {
    app.get("*", (req, res) => {
        if(req.xhr) return res.status(404).send("The resource you are looking for is not exists.");
        res.render("index");
    });
};
