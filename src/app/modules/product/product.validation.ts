import { z } from 'zod'

const variantValidationSchema = z.object({
  type: z.string().min(1, 'Type is required'),
  value: z.string().min(1, 'Value is required'),
})

const inventoryValidationSchema = z.object({
  quantity: z.number().min(0, 'Quantity must be at least 0'),
  inStock: z.boolean(),
})

const productValidationSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name cannot be more than 50 characters'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price cannot be negative'),
  category: z.string().min(1, 'Category is required'),
  tags: z
    .array(z.string().min(1, 'Each tag must be a non empty string'))
    .nonempty('Tags are required'),
  variants: z
    .array(variantValidationSchema)
    .nonempty('At least one variant is required'),
  inventory: inventoryValidationSchema,
})

export default productValidationSchema
