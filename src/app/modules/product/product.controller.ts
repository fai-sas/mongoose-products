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
      message: 'Product created successfully!',
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
      message: 'Products fetched successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    })
  }
}

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductServices.getSingleProductFromDB(productId)

    res.status(status.OK).json({
      success: true,
      message: `Product with id: ${productId} fetched successfully!`,
      data: result,
    })
  } catch (error: any) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    })
  }
}

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const updatedProduct = req.body

    const result = await ProductServices.updateProductFromDB(
      productId,
      updatedProduct
    )

    console.log({ result: result })

    res.status(status.OK).json({
      success: true,
      message: `Product with id: ${productId} updated successfully!`,
      data: result,
    })
  } catch (error: any) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    })
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductServices.deleteProductFromDB(productId)

    res.status(status.OK).json({
      success: true,
      message: `Product with id: ${productId} deleted successfully!`,
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
  getSingleProduct,
  updateProduct,
  deleteProduct,
}
