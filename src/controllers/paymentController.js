import Payment from "../models/Payment.js";
import Order from "../models/Order.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "public/uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      return cb(new Error("Hanya format JPG, JPEG, PNG yang diperbolehkan!"));
    }
    cb(null, true);
  },
});

export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({ include: Order });
    res.render("payments/index", { payments });
  } catch (error) {
    res.render("error", { message: "Gagal mengambil data pembayaran", error });
  }
};

// 🔹 GET PAYMENT BY ID
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      where: { orderId: req.params.orderId },
      include: Order,
    });

    if (!payment) {
      return res.render("error", { message: "Pembayaran tidak ditemukan!" });
    }

    res.render("payments/detail", { payment });
  } catch (error) {
    res.render("error", { message: "Gagal mengambil detail pembayaran", error });
  }
};

export const createPayment = async (req, res) => {
  try {
    upload.single("paymentProof")(req, res, async (err) => {
      if (err) return res.render("error", { message: err.message });

      const { orderId } = req.body;
      const order = await Order.findByPk(orderId);

      if (!order) {
        return res.render("error", { message: "Order tidak ditemukan!" });
      }

      const paymentProof = req.file ? `/uploads/${req.file.filename}` : null;

      await Payment.create({ orderId, paymentProof });

      res.redirect("/payments");
    });
  } catch (error) {
    res.render("error", { message: "Gagal membuat pembayaran", error });
  }
};

export const updatePayment = async (req, res) => {
  try {
    upload.single("paymentProof")(req, res, async (err) => {
      if (err) return res.render("error", { message: err.message });

      const { orderId } = req.body;
      const payment = await Payment.findOne({ where: { orderId } });

      if (!payment) {
        return res.render("error", { message: "Pembayaran tidak ditemukan!" });
      }

      if (payment.paymentProof) {
        const oldPath = `public${payment.paymentProof}`;
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      const paymentProof = req.file ? `/uploads/${req.file.filename}` : payment.paymentProof;

      await payment.update({ paymentProof });

      res.redirect("/payments");
    });
  } catch (error) {
    res.render("error", { message: "Gagal memperbarui pembayaran", error });
  }
};
