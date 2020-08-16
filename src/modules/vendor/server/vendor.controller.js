const Vendor = require("./vendor.model");
const User = require("../../user/server/user.model");

const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");

async function getVendors(req, res) {
    const admin = await User.findOne({role: "admin"});

    try {
        const docs = await Vendor.find({ $or: [
            { createdBy : req.user.id },
            { createdBy: admin.id }
        ]}).sort("name").exec();

        res.json(docs);
    } catch(err) {
        res.sendStatus(500);
    }
}

async function createVendor(req, res) {
    try {
        let model = new Vendor({
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
        console.log(err);
        res.sendStatus(500);
    }
}

exports.getVendors = getVendors;
exports.createVendor = createVendor;
