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
exports.OrderControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const order_validation_1 = __importDefault(require("./order.validation"));
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order: orderData } = req.body;
        const zodParsedData = order_validation_1.default.parse(orderData);
        const result = yield order_service_1.OrderServices.createOrderIntoDB(zodParsedData);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        const result = yield order_service_1.OrderServices.getAllOrdersFromDB(email);
        let message;
        if (email) {
            if (result.length > 0) {
                message =
                    message = `Orders fetched successfully for user email '${email}'`;
            }
            else {
                message = `No orders found for user email '${email}'`;
            }
        }
        else {
            message = 'Orders fetched successfully!';
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
            error: error,
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrders,
};
