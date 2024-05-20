import { z } from 'zod'

const orderValidationSchema = z.object({
  email: z.string().email('Invalid email address'),
  productId: z.string().min(1, 'Product ID is required'),
  price: z.number().min(0, 'Price cannot be negative'),
  quantity: z.number().min(0, 'Quantity must be at least 0'),
})

export default orderValidationSchema
