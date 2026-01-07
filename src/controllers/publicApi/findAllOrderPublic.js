"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllOrderPublic = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const pagination_1 = require("../../utilities/pagination");
const orders_1 = require("../../models/orders");
const products_1 = require("../../models/products");
const user_1 = require("../../models/user");
const requestHandler_1 = require("../../utilities/requestHandler");
const orderItems_1 = require("../../models/orderItems");
const publicApiSchema_1 = require("../../validations/publicApiSchema");
const findAllOrderPublic = async (req, res) => {
  const { error: validationError, value: validatedData } = (0,
  requestHandler_1.validateRequest)(
    publicApiSchema_1.findAllOrderPublicSchema,
    req.query
  );
  if (validationError)
    return (0, requestHandler_1.handleValidationError)(res, validationError);
  try {
    const page = new pagination_1.Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    );
    const result = await orders_1.OrdersModel.findAndCountAll({
      where: {
        deleted: { [sequelize_1.Op.eq]: 0 },
        ...(Boolean(req.query.search) && {
          [sequelize_1.Op.or]: [
            {
              orderReferenceId: {
                [sequelize_1.Op.like]: `%${req.query.search}%`,
              },
            },
          ],
        }),
        ...(Boolean(req.query?.orderStatus) && {
          orderStatus: { [sequelize_1.Op.eq]: req.query.orderStatus },
        }),
      },
      attributes: [
        "orderId",
        "orderSubtotal",
        "orderShippingFee",
        "orderGrandTotal",
        "orderTotalItem",
        "orderCourierCompany",
        "orderTrackingId",
        "orderWaybillId",
        "orderPaymentUrl",
        "orderReferenceId",
        "orderStatus",
        [
          (0, sequelize_1.fn)(
            "DATE",
            (0, sequelize_1.col)("orders.created_at")
          ),
          "orderDate",
        ],
        [
          (0, sequelize_1.fn)(
            "TIME",
            (0, sequelize_1.col)("orders.created_at")
          ),
          "orderTime",
        ],
      ],
      include: [
        {
          model: user_1.UserModel,
          where: {
            deleted: { [sequelize_1.Op.eq]: 0 },
            ...(Boolean(req.query.search) && {
              [sequelize_1.Op.or]: [
                {
                  userName: { [sequelize_1.Op.like]: `%${req.query.search}%` },
                },
              ],
            }),
          },
          attributes: ["userName", "userWhatsAppNumber"],
        },
        {
          model: orderItems_1.OrderItemsModel,
          as: "orderItems",
          attributes: [
            "productNameSnapshot",
            "productPriceSnapshot",
            "productDiscountSnapshot",
            "productSellPriceSnapshot",
            "quantity",
            "totalPrice",
          ],
          include: [
            {
              model: products_1.ProductModel,
              attributes: [
                "productId",
                "productName",
                "productCode",
                "productStock",
                "productWeight",
                "productIsVisible",
                "productBarcode",
                "productUnit",
              ],
            },
          ],
        },
      ],
      order: [["orderId", "desc"]],
      ...(req.query.pagination === "true" && {
        limit: page.limit,
        offset: page.offset,
      }),
    });
    const response = response_1.ResponseData.default;
    response.data = page.data(result);
    return res.status(http_status_codes_1.StatusCodes.OK).json(response);
  } catch (serverError) {
    return (0, requestHandler_1.handleServerError)(res, serverError);
  }
};
exports.findAllOrderPublic = findAllOrderPublic;
