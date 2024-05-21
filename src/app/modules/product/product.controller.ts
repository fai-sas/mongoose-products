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
    const { searchTerm } = req.query
    const result = await ProductServices.getAllProductsFromDB(searchTerm)

    let message
    if (searchTerm) {
      if (result.length > 0) {
        message = `Products matching search term '${searchTerm}' fetched successfully!`
      } else {
        message = `No products found matching search term '${searchTerm}'.`
      }
    } else {
      message = 'Products fetched successfully!'
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
    })
  }
}

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductServices.getSingleProductFromDB(productId)

    if (!result) {
      return res.status(status.NOT_FOUND).json({
        success: false,
        message: `Product with id: ${productId} not found!`,
      })
    }

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
    const { product: updatedProduct } = req.body

    const result = await ProductServices.updateProductFromDB(
      productId,
      updatedProduct
    )

    if (!result) {
      return res.status(status.NOT_FOUND).json({
        success: false,
        message: `Product with id: ${productId} not found!`,
      })
    }

    res.status(status.OK).json({
      success: true,
      message: `Product with id: ${productId} updated successfully!`,
      data: result,
    })
  } catch (error: any) {
    console.error('Error updating product:', error)
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

    if (!result) {
      return res.status(status.NOT_FOUND).json({
        success: false,
        message: `Product with id: ${productId} not found!`,
      })
    }

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
