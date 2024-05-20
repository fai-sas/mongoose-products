import { Request, Response } from 'express'
import productValidationSchema from './product.validation'
import { ProductServices } from './product.service'
import status from 'http-status'

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body

    const zodParsedData = productValidationSchema.parse(productData)

    const result = await ProductServices.createProductIntoDB(zodParsedData)

    res.status(status.OK).json({
      success: true,
      message: 'product is created successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    })
  }
}

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB()

    res.status(status.OK).json({
      totalResult: result.length,
      success: true,
      message: 'products retrieved successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    })
  }
}

export const ProductControllers = {
  createProduct,
  getAllProducts,
}
