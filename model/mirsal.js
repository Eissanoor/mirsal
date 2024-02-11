const mongoose = require("mongoose");
const mirsalschema = new mongoose.Schema(
    {
        cardno: Number,
        Date: String,
        load: String,
        vehicltype: String,
        enginehp: String,
        modelyear: String,
        weight: String,
        origin: String,
        importer_or_owner: String,
        chassisno: String,
        declearationno: String,
        color: String,
        enginno: String,
        comments: String,
        qrcode: String
    },
    {
        timestamps: true,
    }
);
const mirsal = new mongoose.model("mirsal", mirsalschema);
module.exports = mirsal;
