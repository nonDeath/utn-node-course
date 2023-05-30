const mongoose = require('mongoose');
const { encrypt } = require('../support/handleCryptedText');

const UserSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true,
        },
        last: {
            type: String,
            required: true,
        },
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        select: false,
    },
},
{
    timestamps: true,
    virtuals: {
        fullName: {
            get() {
                return `${this.name.first} ${this.name.last}`;
            }
        },
    },
    toJSON: { virtuals: true }
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew()) {
        this.password = await encrypt(this.password);
    }

    next();
});

module.exports = mongoose.model('Users', UserSchema);
