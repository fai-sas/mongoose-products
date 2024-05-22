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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = exports.createOrderIntoDB = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findOne({ _id: orderData.productId });
    console.log(product);
    if (!product) {
        throw new Error('No product found!');
    }
    if (orderData.quantity > product.inventory.quantity) {
        throw new Error('Insufficient stock available');
    }
    product.inventory.quantity -= orderData.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    yield product.save();
    const result = yield order_model_1.Order.create(orderData);
    return result;
});
exports.createOrderIntoDB = createOrderIntoDB;
const getAllOrdersFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (email) {
        result = yield order_model_1.Order.find({ email });
    }
    else {
        result = yield order_model_1.Order.find();
    }
    return result;
});
exports.OrderServices = {
    createOrderIntoDB: exports.createOrderIntoDB,
    getAllOrdersFromDB,
};
