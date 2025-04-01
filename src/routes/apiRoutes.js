const express = require('express');
const router = express.Router();

router.get('/services', (req, res) => {
  const services = [
    {
      id: 'basic',
      name: 'Rakit PC Basic',
      price: 350000,
      description: 'Rakit untuk kebutuhan ringan (Office / Budget)'
    },
    {
      id: 'performance',
      name: 'Rakit PC Performance',
      price: 500000,
      description: 'Rakit untuk gaming / editing menengah'
    },
    {
      id: 'premium',
      name: 'Rakit PC Premium',
      price: 750000,
      description: 'Rakit untuk high-end gaming / profesional'
    }
  ];
  
  res.json(services);
});

module.exports = router;