// Order controller for handling PC build order requests

/**
 * Render the order form
 */
exports.getOrderForm = (req, res) => {
    const { type } = req.query;
    
    // Get service details based on type
    const serviceTypes = {
      'basic': {
        name: 'Rakit PC Basic',
        price: 350000,
        description: 'Rakit untuk kebutuhan ringan (Office / Budget)'
      },
      'performance': {
        name: 'Rakit PC Performance',
        price: 500000,
        description: 'Rakit untuk gaming / editing menengah'
      },
      'premium': {
        name: 'Rakit PC Premium',
        price: 750000,
        description: 'Rakit untuk high-end gaming / profesional'
      }
    };
    
    const service = type ? serviceTypes[type] : serviceTypes['basic'];
    
    res.render('order/form', {
      title: 'Order PC Building Service',
      service: service
    });
  };
  
  /**
   * Process order form submission
   */
  exports.submitOrder = (req, res) => {
    const {
      name,
      email,
      phone,
      address,
      serviceType,
      budget,
      requirements,
      paymentMethod
    } = req.body;
    
    // Validate form data (basic validation)
    if (!name || !email || !phone || !address || !serviceType) {
      return res.status(400).render('order/form', {
        title: 'Order PC Building Service',
        error: 'Semua data wajib diisi',
        formData: req.body
      });
    }
    
    // Here you would save the order to the database
    // For now, we'll just simulate a successful order
    
    // Generate a random order ID
    const orderId = 'ORD' + Date.now().toString().slice(-8);
    
    // Store order in session for the success page
    req.session.lastOrder = {
      orderId,
      name,
      email,
      serviceType,
      timestamp: new Date().toISOString()
    };
    
    // In a real application, you would redirect to payment processing
    // For now, redirect to success page
    res.redirect('/order/success');
  };
  
  /**
   * Render the order success page
   */
  exports.getOrderSuccess = (req, res) => {
    // Get last order from session
    const lastOrder = req.session.lastOrder;
    
    if (!lastOrder) {
      return res.redirect('/order');
    }
    
    res.render('order/success', {
      title: 'Order Successful',
      order: lastOrder
    });
  };
  
  /**
   * Render the consultation form
   */
  exports.getConsultationForm = (req, res) => {
    res.render('consultation/form', {
      title: 'PC Consultation Service',
      service: {
        name: 'Konsultasi PC',
        price: 150000,
        description: 'Konsultasi kebutuhan PC dan rekomendasi komponen'
      }
    });
  };
  
  /**
   * Process consultation form submission
   */
  exports.submitConsultation = (req, res) => {
    const {
      name,
      email,
      phone,
      budget,
      useCase,
      preferences,
      paymentMethod
    } = req.body;
    
    // Validate form data
    if (!name || !email || !phone || !useCase) {
      return res.status(400).render('consultation/form', {
        title: 'PC Consultation Service',
        error: 'Semua data wajib diisi',
        formData: req.body
      });
    }
    
    // Generate a random consultation ID
    const consultationId = 'CON' + Date.now().toString().slice(-8);
    
    // Store consultation in session
    req.session.lastConsultation = {
      consultationId,
      name,
      email,
      useCase,
      timestamp: new Date().toISOString()
    };
    
    // Redirect to success page
    res.redirect('/consultation/success');
  };