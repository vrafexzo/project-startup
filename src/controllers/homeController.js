// Home controller for handling homepage requests

/**
 * Render the homepage
 */
exports.getHomepage = (req, res) => {
    // You can fetch service data from database in the future
    const services = {
      rakitPC: [
        {
          name: 'Rakit PC Basic',
          price: 'Rp350.000',
          features: [
            'Rakit untuk kebutuhan ringan (Office / Budget)',
            'Pemilihan komponen sesuai anggaran',
            'Perakitan standar & pengecekan fungsi dasar',
            'Garansi teknis 7 hari'
          ],
          type: 'primary'
        },
        {
          name: 'Rakit PC Performance',
          price: 'Rp500.000',
          features: [
            'Rakit untuk gaming / editing menengah',
            'Optimalisasi performa dan airflow',
            'Pemasangan rapi & manajemen kabel',
            'Garansi teknis 14 hari + dukungan teknis'
          ],
          type: 'primary'
        },
        {
          name: 'Rakit PC Premium',
          price: 'Rp750.000',
          features: [
            'Rakit untuk high-end gaming / profesional',
            'Konsultasi custom spesifik & airflow optimal',
            'Cable management estetik & test benchmark',
            'Garansi teknis 30 hari + after-sales support'
          ],
          type: 'primary'
        }
      ],
      konsultasi: [
        {
          name: 'Konsultasi PC',
          price: 'Rp150.000',
          features: [
            'Konsultasi kebutuhan penggunaan',
            'Diskusi spesifikasi dan anggaran',
            'Rekomendasi komponen',
            'Tanya jawab langsung via chat/call'
          ],
          type: 'success'
        }
      ]
    };
  
    // Render homepage with service data
    res.render('pages/index', {
      title: 'Rakit PC & Konsultasi | PC Builder Service',
      services: services
    });
  };
  
  /**
   * Render the about page
   */
  exports.getAbout = (req, res) => {
    res.render('home/about', {
      title: 'About Us | PC Builder Service'
    });
  };
  
  /**
   * Render the contact page
   */
  exports.getContact = (req, res) => {
    res.render('home/contact', {
      title: 'Contact Us | PC Builder Service'
    });
  };