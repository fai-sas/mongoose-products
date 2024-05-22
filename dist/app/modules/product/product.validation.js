"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const variantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, 'Type is required'),
    value: zod_1.z.string().min(1, 'Value is required'),
});
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().min(0, 'Quantity must be at least 0'),
    inStock: zod_1.z.boolean(),
});
const productValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, 'Name is required')
        .max(50, 'Name cannot be more than 50 characters'),
    description: zod_1.z.string().min(1, 'Description is required'),
    price: zod_1.z.number().min(0, 'Price cannot be negative'),
    category: zod_1.z.string().min(1, 'Category is required'),
    tags: zod_1.z
        .array(zod_1.z.string().min(1, 'Each tag must be a non empty string'))
        .nonempty('Tags are required'),
    variants: zod_1.z
        .array(variantValidationSchema)
        .nonempty('At least one variant is required'),
    inventory: inventoryValidationSchema,
});
exports.default = productValidationSchema;
