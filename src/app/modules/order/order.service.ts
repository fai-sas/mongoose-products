import { TOrder } from './order.interface'
import { Order } from './order.model'

const createOrderIntoDB = async (orderData: TOrder) => {
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
