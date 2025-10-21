import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
    
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">About Us</h3>
          <p className="text-sm leading-6">
            We are your trusted eCommerce store offering top-quality products at affordable prices.
            Shop with confidence and enjoy fast delivery and excellent customer service.
          </p>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Shop</a></li>
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
          </ul>
        </div>

      
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-sm">Email: support@jacobstore.com</p>
          <p className="text-sm">Phone: +92 344 567 890</p>
          <p className="text-sm">Address: 123 Market Street, Rawalpini Pakistan</p>
        </div>
      </div>

  
      <div className="text-center text-gray-400 text-sm mt-8 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Yaqoob&apos;s Store All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
