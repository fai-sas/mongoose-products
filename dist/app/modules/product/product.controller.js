"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_validation_1 = __importDefault(require("./product.validation"));
const product_service_1 = require("./product.service");
const http_status_1 = __importDefault(require("http-status"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product: productData } = req.body;
        const zodParsedData = product_validation_1.default.parse(productData);
        const result = yield product_service_1.ProductServices.createProductIntoDB(zodParsedData);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const result = yield product_service_1.ProductServices.getAllProductsFromDB(searchTerm);
        let message;
        if (searchTerm) {
            if (result.length > 0) {
                message = `Products matching search term '${searchTerm}' fetched successfully!`;
            }
            else {
                message = `No products found matching search term '${searchTerm}'.`;
            }
        }
        else {
            message = 'Products fetched successfully!';
        }
        res.status(http_status_1.default.OK).json({
            totalResult: result.length,
            success: true,
            message: message,
            data: result,
        });
    }
    catch (error) {
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
        if (!result) {
            return res.status(http_status_1.default.NOT_FOUND).json({
                success: false,
                message: `Product with id: ${productId} not found!`,
            });
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            message: `Product with id: ${productId} fetched successfully!`,
            data: result,
        });
    }
    catch (error) {
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const { product: updatedProduct } = req.body;
        const result = yield product_service_1.ProductServices.updateProductFromDB(productId, updatedProduct);
        if (!result) {
            return res.status(http_status_1.default.NOT_FOUND).json({
                success: false,
                message: `Product with id: ${productId} not found!`,
            });
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            message: `Product with id: ${productId} updated successfully!`,
            data: result,
        });
    }
    catch (error) {
        console.error('Error updating product:', error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const productExists = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
        if (!productExists) {
            return res.status(http_status_1.default.NOT_FOUND).json({
                success: false,
                message: `Product with id: ${productId} not found!`,
            });
        }
        const result = yield product_service_1.ProductServices.deleteProductFromDB(productId);
        if (!result) {
            return res.status(http_status_1.default.NOT_FOUND).json({
                success: false,
                message: `Product with id: ${productId} not found!`,
            });
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            message: `Product with id: ${productId} deleted successfully!`,
            data: result,
        });
    }
    catch (error) {
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
