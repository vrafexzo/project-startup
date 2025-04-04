import Order from "../models/Order.js";
import Service from "../models/Service.js";
import { Op } from "sequelize";

const generateOrderId = async (serviceId) => {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const count = await Order.count({
    where: {
      createdAt: {
        [Op.gte]: new Date(today.setHours(0, 0, 0, 0)),
        [Op.lt]: new Date(today.setHours(23, 59, 59, 999)),
      },
    },
  });

  const orderNumber = String(count + 1).padStart(2, "0");
  return `${serviceId}${year}${month}${day}${orderNumber}`;
};

export const getOrdersPage = async (req, res) => {  
  try {
    const serviceList = await Service.findAll();
  res.render('order/form', {
    serviceList,
      title: 'Order',
      message: req.query.message
  });
  } catch (error) {
    return res.status(404).json({ error: "Page Tidak Tersedia" });
  }
}

export const createOrder = async (req, res) => {
  try {
    const { name, email, noHP, address, budget, details, paymentMethod, serviceId } = req.body;

    if (!name || !email || !noHP || !address || !paymentMethod || !serviceId) {
      return res.status(400).json({ error: "Semua field wajib diisi!" });
    }

    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Layanan tidak ditemukan!" });
    }

    const orderId = await generateOrderId(serviceId);

    const order = await Order.create({
      orderId,
      name,
      email,
      noHP,
      address,
      budget: budget || null,
      details,
      paymentMethod,
      serviceId,
    });

    res.redirect(`/order/success/${orderId}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrdersSuccessPage = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { orderId: req.params.orderId },
      include: Service,
    });

    if (!order) {
      return res.status(404).json({ error: "Pesanan tidak ditemukan!" });
    }

    res.render("order/success", {
      order,
      message: req.query.message,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: Service });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { orderId: req.params.orderId },
      include: Service,
    });

    if (!order) {
      return res.status(404).json({ error: "Order tidak ditemukan!" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
