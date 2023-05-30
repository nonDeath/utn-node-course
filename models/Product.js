const mongoose = require('mongoose');
const CURRENCY = process.env.APP_CURRENCY;
const LOCALE = process.env.APP_LOCALE;

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        min: [0, 'Debe ser como mínimo cero.'],
    },
    quantity: {
        type: Number,
        min: [0, 'Debe ser como mínimo cero.'],
    },
    description: {
        type: String,
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref:"Categories",
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
    virtuals: {
        formattedPrice: {
            get() {
                return new Intl
                    .NumberFormat(LOCALE, {style: 'currency', currency: CURRENCY})
                    .format(this.price);
            }
        }
    },
    toJSON: { virtuals: true }
});

module.exports = mongoose.model('Products', ProductSchema);
