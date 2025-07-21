import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="bg-primary text-white pt-14 pb-8 border-t border-white/10 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand & About */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-gold mb-3 tracking-tight">
            PROPERTY WEY
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Real estate development, shortlets, renovations, dredging, project
            management and lifestyle transformation — crafted for a new era of
            property excellence.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold mb-2 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link to="/services" className="hover:text-gold transition">
                Services
              </Link>
            </li>
            <li>
              <Link to="/properties" className="hover:text-gold transition">
                Properties
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gold transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold transition">
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-semibold mb-2 text-lg">Connect With Us</h3>
          <div className="flex space-x-5 text-2xl mt-3">
            <motion.a
              href="https://wa.me/234XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-gray-300 hover:text-green-400 transition"
            >
              <FaWhatsapp />
            </motion.a>
            <motion.a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-gray-300 hover:text-blue-400 transition"
            >
              <FaFacebook />
            </motion.a>
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-gray-300 hover:text-pink-400 transition"
            >
              <FaInstagram />
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-400 tracking-wide">
        &copy; {new Date().getFullYear()} Property Wey International. All rights
        reserved.
      </div>
    </motion.footer>
  );
}
