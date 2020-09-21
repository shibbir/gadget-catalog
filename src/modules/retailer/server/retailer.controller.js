const Retailer = require("./retailer.model");
const User = require("../../user/server/user.model");

const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");

async function getRetailer(req, res) {
    try {
        const doc = await Retailer.findOne({ _id: req.params.id, createdBy: req.user._id }).exec();

        if(!doc) {
            return res.status(404).send("Retailer not found.");
        }

        res.json(doc);
    } catch(err) {
        res.sendStatus(500);
    }
}

async function getRetailers(req, res) {
    const admin = await User.findOne({role: "admin"});

    try {
        const docs = await Retailer.find({ $or: [
            { createdBy : req.user.id },
            { createdBy: admin.id }
        ]}).sort("name").exec();

        res.json(docs);
    } catch(err) {
        res.sendStatus(500);
    }
}

async function createRetailer(req, res) {
    try {
        let model = new Retailer({
            name: req.body.name,
            slug: convertToSlug(req.body.name),
            email: req.body.email,
            website: req.body.website,
            address: req.body.address,
            createdBy: req.user._id
        });

        model = await model.save();

        res.json(model);
    } catch(err) {
        res.sendStatus(500);
    }
}

function updateRetailer(req, res) {
    Retailer.findOne({ name: req.body.name }, function(err, doc) {
        if(err) return res.sendStatus(500);

        if(doc && doc._id.toString() !== req.params.id) {
            return res.status(400).send("Retailer name already exists.");
        }

        Retailer.findOne({ _id: req.params.id, createdBy: req.user._id }, function(err, doc) {
            if(err) return res.sendStatus(500);

            if(!doc) {
                return res.sendStatus(404);
            }

            doc.name = req.body.name;
            doc.slug = convertToSlug(req.body.name);
            doc.email = req.body.email;
            doc.website = req.body.website;
            doc.address = req.body.address

            doc.save();
            res.json(doc);
        });
    });
}

exports.getRetailer = getRetailer;
exports.getRetailers = getRetailers;
exports.createRetailer = createRetailer;
exports.updateRetailer = updateRetailer;
