"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Address_1 = __importDefault(require("./Address"));
const Admin_1 = __importDefault(require("./Admin"));
const CartRouter_1 = __importDefault(require("./CartRouter"));
const Category_1 = __importDefault(require("./Category"));
const HealtRouter_1 = __importDefault(require("./HealtRouter"));
const MyProfileRouter_1 = __importDefault(require("./MyProfileRouter"));
const NotificationRouter_1 = __importDefault(require("./NotificationRouter"));
const OrderRouter_1 = __importDefault(require("./OrderRouter"));
const PaymentMethodRouter_1 = __importDefault(require("./PaymentMethodRouter"));
const ProductRouter_1 = __importDefault(require("./ProductRouter"));
const SettingRouter_1 = __importDefault(require("./SettingRouter"));
const ShippingRouter_1 = __importDefault(require("./ShippingRouter"));
const StatisticRouter_1 = __importDefault(require("./StatisticRouter"));
const TransactionRoutes_1 = __importDefault(require("./TransactionRoutes"));
const UserRouter_1 = __importDefault(require("./UserRouter"));
const WaBlasRouter_1 = __importDefault(require("./WaBlasRouter"));
const RoutesRegistry = {
    AddressRoute: Address_1.default,
    AdminRoute: Admin_1.default,
    CartRoute: CartRouter_1.default,
    CategoryRoute: Category_1.default,
    HealthRoute: HealtRouter_1.default,
    MyProfileRoute: MyProfileRouter_1.default,
    NotificationRoute: NotificationRouter_1.default,
    OrderRoute: OrderRouter_1.default,
    ProductRoute: ProductRouter_1.default,
    SettingRoute: SettingRouter_1.default,
    StatisticRoute: StatisticRouter_1.default,
    TransactionRoute: TransactionRoutes_1.default,
    UserRoute: UserRouter_1.default,
    WablasRoute: WaBlasRouter_1.default,
    PaymentMethodRouter: PaymentMethodRouter_1.default,
    ShippingRoute: ShippingRouter_1.default
};
exports.default = RoutesRegistry;
