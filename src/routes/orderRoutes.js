import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('order/form', { 
    title: 'Order Form',
    service: {
      name: 'Rakit PC Basic',
      price: 'Rp350.000',
      description: 'Rakit untuk kebutuhan ringan (Office / Budget)'
    }
  });
});
router.get('/form', (req, res) => {
    res.render('order/form', { 
      title: 'Order Form',
      service: {
        name: 'Rakit PC Basic',
        price: 'Rp350.000',
        description: 'Rakit untuk kebutuhan ringan (Office / Budget)'
      }
    });
  });
  

router.post('/', (req, res) => {
  // Handle form submission
  res.redirect('/order/success');
});

router.get('/success', (req, res) => {
  res.render('order/success', { 
    title: 'Order Successful',
    order: {
      orderId: 'ORD' + Date.now().toString().slice(-8),
      timestamp: new Date().toISOString()
    }
  });
});


import {
  getOrders,
  getOrderById,
  createOrder,
} from "../controllers/orderController.js";


router.get("/", getOrders);
router.get("/:orderId", getOrderById);
router.post("/create", createOrder);

export default router;
