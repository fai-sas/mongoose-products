import { TProduct } from './product.interface'
import { Product } from './product.model'

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData)
  return result
}

const getAllProductsFromDB = async () => {
  const result = await Product.find()
  return result
}

const getSingleProductFromDB = async (_id: string) => {
  const result = await Product.findOne({ _id })
  return result
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
}
