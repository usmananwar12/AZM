const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://admin:admin%401234@alzahidmadnicluster.6h65c6g.mongodb.net/mydb1?retryWrites=true&w=majority&appName=AlZahidMadniCluster")
    .then(() => {
        console.log("✅ Connected to Atlas:", mongoose.connection.host);
        console.log("🧭 DB:", mongoose.connection.name);
    })
    .catch((err) => {
        console.error("❌ Failed to connect to Atlas");
        process.exit(1);
    });

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Schema
const voucherSchema = new mongoose.Schema({
    voucherNo: { type: String, required: true },
    passportNo: { type: String, required: true },
    name: { type: String, required: true },
    withBed: { type: Boolean, required: true },
    withTransport: { type: Boolean, required: true },
    withZiarat: { type: Boolean, required: true },
    food: { type: String },
    flightDetails: [{
        airline: String,
        flightNo: String,
        sector: String,
        flightDate: Date,
        departureTime: String,
        arrivalTime: String
    }],
    accommodationDetails: [{
        city: String,
        hotelName: String,
        confirmationNumber: String,
        checkIn: Date,
        checkOut: Date,
        nights: Number,
        roomType: String
    }],
    contactDetails: [{
        name: String,
        contactNumber: String
    }]
});

const Voucher = mongoose.model("vouchers", voucherSchema);

// Routes
app.post('/api/paxes', async (req, res) => {
    console.log("🔔 POST /api/paxes");
    console.log("📦 Body:", req.body);

    const body = req.body;

    // Validate required fields
    if (
        !body.voucherNo ||
        !body.passportNo ||
        !body.name ||
        typeof body.withBed !== 'boolean' ||
        typeof body.withTransport !== 'boolean' ||
        typeof body.withZiarat !== 'boolean'
    ) {
        console.log("❌ Missing required fields");
        return res.status(400).json({
            msg: "voucherNo, passportNo, name, withBed, withTransport, and withZiarat are required and must be valid"
        });
    }

    try {
        const result = await Voucher.create(body);
        console.log("✅ Document saved to Atlas:", result);
        return res.status(201).json({ msg: "Success", voucher: result });
    } catch (err) {
        console.error("❌ Error saving document:", err);
        return res.status(500).json({ msg: "Internal Server Error", error: err.message });
    }
});

app.get('/api/paxes', async (req, res) => {
    try {
        const vouchers = await Voucher.find({});
        return res.json(vouchers);
    } catch (err) {
        console.error("❌ Error fetching documents:", err);
        return res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.get('/paxes', async (req, res) => {
    const allVouchers = await Voucher.find({});
    const html = `
    <ul>
      ${allVouchers.map((p) => `<li>${p.name} - ${p.passportNo}</li>`).join("")}
    </ul>
  `;
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`🚀 Server started at http://localhost:${PORT}`);
});
