import { Schema, model } from 'mongoose'
import { TInventory, TProduct, TVariant } from './product.interface'

const variantSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: [true, 'Type is required'],
  },
  value: {
    type: String,
    required: [true, 'Value is required'],
  },
})

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
  inStock: {
    type: Boolean,
    required: [true, 'InStock is required'],
  },
})

const productSchema = new Schema<TProduct>(
  {
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
  },
  {
    timestamps: true,
  }
)

productSchema.pre('save', async function (next) {
  const isProductExists = await Product.findOne({
    name: this.name,
  })

  if (isProductExists) {
    throw new Error(`Product with name ${this.name} already exists!`)
  }
  next()
})

export const Product = model<TProduct>('Product', productSchema)
