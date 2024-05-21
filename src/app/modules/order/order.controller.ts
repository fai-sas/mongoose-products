import status from 'http-status'
import { Request, Response } from 'express'
import orderValidationSchema from './order.validation'
import { OrderServices } from './order.service'

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body

    const zodParsedData = orderValidationSchema.parse(orderData)

    const result = await OrderServices.createOrderIntoDB(zodParsedData)

    res.status(status.OK).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
  } catch (error: any) {
    console.log(error)
    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
      error: error,
    })
  }
}

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query

    const result = await OrderServices.getAllOrdersFromDB(email)

    let message

    if (email) {
      if (result.length > 0) {
        message =
          message = `Orders fetched successfully for user email '${email}'`
      } else {
        message = `No orders found for user email '${email}'`
      }
    } else {
      message = 'Orders fetched successfully!'
    }

    res.status(status.OK).json({
      totalResult: result.length,
      success: true,
      message: message,
      data: result,
    })
  } catch (error: any) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
      error: error,
    })
  }
}

export const OrderControllers = {
  createOrder,
  getAllOrders,
}
