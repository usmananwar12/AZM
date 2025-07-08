// --- Dependencies ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- App & Port ---
const app = express();
const PORT = process.env.PORT || 8000;

// --- MongoDB Atlas Connection ---
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://admin:admin%401234@alzahidmadnicluster.6h65c6g.mongodb.net/mydb1?retryWrites=true&w=majority&appName=AlZahidMadniCluster";

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("✅ Connected to Atlas:", mongoose.connection.host);
        console.log("🧭 DB:", mongoose.connection.name);
    })
    .catch((err) => {
        console.error("❌ Failed to connect to Atlas", err);
        process.exit(1);
    });

// --- Middleware ---
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Debug log for all requests
app.use((req, res, next) => {
    console.log(`➡️  ${req.method} ${req.path}`);
    if (req.method === 'POST' || req.method === 'PATCH') {
        console.log('   Body:', req.body);
    }
    next();
});

// --- Voucher Schema ---
const voucherSchema = new mongoose.Schema({
    voucherNo: { type: String, required: true },
    voucherDate: { type: String, required: true },
    paxes: [{
        passportNo: { type: String, required: true },
        name: { type: String, required: true },
        withBed: { type: Boolean, required: true },
        withTransport: { type: Boolean, required: true },
        withZiarat: { type: Boolean, required: true },
        food: { type: String }
    }],
    flightDetails: [{
        airline: String,
        flightNo: String,
        sector: String,
        flightDate: String,
        departureTime: String,
        arrivalTime: String
    }],
    accommodationDetails: [{
        city: String,
        hotelName: String,
        confirmationNumber: String,
        checkIn: String,
        checkOut: String,
        nights: Number,
        roomType: String
    }],
    contactDetails: [{
        name: String,
        contactNumber: String
    }]
}, { timestamps: true });
const Voucher = mongoose.model('vouchers', voucherSchema);

// --- Health Check Route ---
app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Al Zahid Madni API running' });
});

// --- Create Voucher ---
app.post('/api/paxes', async (req, res) => {
    try {
        const body = req.body;
        // Validate voucherNo and voucherDate
        if (!body.voucherNo || !body.voucherDate) {
            return res.status(400).json({ msg: 'voucherNo and voucherDate are required.' });
        }
        // Validate paxes array
        if (!Array.isArray(body.paxes) || body.paxes.length === 0) {
            return res.status(400).json({ msg: 'At least one pax is required in paxes array.' });
        }
        // Validate each pax
        for (const pax of body.paxes) {
            const requiredFields = ['passportNo', 'name', 'withBed', 'withTransport', 'withZiarat'];
            const missing = requiredFields.filter(f => pax[f] === undefined || pax[f] === null || pax[f] === '');
            if (missing.length > 0) {
                return res.status(400).json({ msg: `Missing required fields in pax: ${missing.join(', ')}` });
            }
            if (typeof pax.withBed !== 'boolean' || typeof pax.withTransport !== 'boolean' || typeof pax.withZiarat !== 'boolean') {
                return res.status(400).json({ msg: 'withBed, withTransport, and withZiarat must be boolean in each pax' });
            }
        }
        // Save to DB
        const result = await Voucher.create(body);
        console.log('✅ Voucher saved:', result._id);
        return res.status(201).json({ msg: 'Success', voucher: result });
    } catch (err) {
        console.error('❌ Error in POST /api/paxes:', err);
        return res.status(500).json({ msg: 'Internal Server Error', error: err.message });
    }
});

// --- Get All Vouchers (JSON) ---
app.get('/api/paxes', async (req, res) => {
    try {
        const vouchers = await Voucher.find({});
        return res.json(vouchers);
    } catch (err) {
        console.error('❌ Error in GET /api/paxes:', err);
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// --- Get All Vouchers (HTML List) ---
app.get('/paxes', async (req, res) => {
    try {
        const allVouchers = await Voucher.find({});
        const html = `
        <ul>
          ${allVouchers.map((v) =>
            `<li>${v.paxes.map(p => `${p.name} - ${p.passportNo}`).join(', ')}</li>`
          ).join('')}
        </ul>
      `;
        res.send(html);
    } catch (err) {
        console.error('❌ Error in GET /paxes:', err);
        res.status(500).send('Error fetching paxes');
    }
});

// --- Get Voucher by ID ---
app.get('/api/paxes/:id', async (req, res) => {
    try {
        const voucher = await Voucher.findById(req.params.id);
        if (!voucher) return res.status(404).json({ error: 'Voucher not found' });
        return res.json(voucher);
    } catch (err) {
        console.error('❌ Error in GET /api/paxes/:id:', err);
        return res.status(500).json({ error: 'Error fetching voucher by ID' });
    }
});

// --- Update Voucher by ID ---
app.patch('/api/paxes/:id', async (req, res) => {
    try {
        const updates = req.body;
        // If paxes is present, validate it
        if (updates.paxes) {
            if (!Array.isArray(updates.paxes) || updates.paxes.length === 0) {
                return res.status(400).json({ msg: 'At least one pax is required in paxes array.' });
            }
            for (const pax of updates.paxes) {
                const requiredFields = ['passportNo', 'name', 'withBed', 'withTransport', 'withZiarat'];
                const missing = requiredFields.filter(f => pax[f] === undefined || pax[f] === null || pax[f] === '');
                if (missing.length > 0) {
                    return res.status(400).json({ msg: `Missing required fields in pax: ${missing.join(', ')}` });
                }
                if (typeof pax.withBed !== 'boolean' || typeof pax.withTransport !== 'boolean' || typeof pax.withZiarat !== 'boolean') {
                    return res.status(400).json({ msg: 'withBed, withTransport, and withZiarat must be boolean in each pax' });
                }
            }
        }
        const voucher = await Voucher.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
        if (!voucher) return res.status(404).json({ error: 'Voucher not found' });
        return res.json(voucher);
    } catch (err) {
        console.error('❌ Error in PATCH /api/paxes/:id:', err);
        return res.status(500).json({ error: 'Error updating voucher' });
    }
});

// --- Delete Voucher by ID ---
app.delete('/api/paxes/:id', async (req, res) => {
    try {
        const voucher = await Voucher.findByIdAndDelete(req.params.id);
        if (!voucher) return res.status(404).json({ error: 'Voucher not found' });
        return res.json({ msg: 'Voucher deleted successfully' });
    } catch (err) {
        console.error('❌ Error in DELETE /api/paxes/:id:', err);
        return res.status(500).json({ error: 'Error deleting voucher' });
    }
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`🚀 Server started at http://localhost:${PORT}`);
});
