import { TProduct } from './product.interface'
import { Product } from './product.model'

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product)
  return result
}

const getAllProductsFromDB = async (searchTerm: any) => {
  let result

  if (searchTerm) {
    const searchOptions = { $regex: searchTerm, $options: 'i' }
    result = await Product.find({
      $or: [
        { name: searchOptions },
        { description: searchOptions },
        { category: searchOptions },
      ],
    })
  } else {
    result = await Product.find()
  }
  return result
}

const getSingleProductFromDB = async (_id: string) => {
  const result = await Product.findOne({ _id })
  return result
}

export const updateProductFromDB = async (
  _id: string,
  updatedProduct: object
) => {
  const result = await Product.findOneAndUpdate({ _id }, updatedProduct, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteProductFromDB = async (_id: string) => {
  const result = await Product.deleteOne({ _id })
  return result
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
}
