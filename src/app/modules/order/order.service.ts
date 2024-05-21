import { Product } from '../product/product.model'
import { TOrder } from './order.interface'
import { Order } from './order.model'

export const createOrderIntoDB = async (orderData: TOrder) => {
  const product = await Product.findOne({ _id: orderData.productId })
  console.log(product)

  if (!product) {
    throw new Error('No product found!')
  }

  if (orderData.quantity > product.inventory.quantity) {
    throw new Error('Insufficient stock available')
  }

  product.inventory.quantity -= orderData.quantity
  product.inventory.inStock = product.inventory.quantity > 0

  await product.save()

  const result = await Order.create(orderData)
  return result
}

const getAllOrdersFromDB = async (email: any) => {
  let result

  if (email) {
    result = await Order.find({ email })
  } else {
    result = await Order.find()
  }

  return result
}

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
}
