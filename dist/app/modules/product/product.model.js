"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const variantSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: [true, 'Type is required'],
    },
    value: {
        type: String,
        required: [true, 'Value is required'],
    },
});
const inventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    },
    inStock: {
        type: Boolean,
        required: [true, 'InStock is required'],
    },
});
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [30, 'Name cannot be more than 30 characters'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
    },
    tags: {
        type: [String],
        required: [true, 'Tags are required'],
    },
    variants: {
        type: [variantSchema],
        required: [true, 'Variants are required'],
    },
    inventory: {
        type: inventorySchema,
        required: [true, 'Inventory is required'],
    },
}, {
    timestamps: true,
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
