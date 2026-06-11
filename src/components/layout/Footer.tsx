import { Link } from 'react-router-dom';

const quickLinks = [
  { name: 'Fleet', path: '/fleet' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'FAQ', path: '/faq' },
];

const legalLinks = [
  { name: 'Terms & Conditions', path: '/terms' },
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Cancellation Policy', path: '/cancellation' },
];


export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
                <span className="text-navy font-bold text-xl">T</span>
              </div>
              <div>
                <span className="text-white font-serif text-xl">Trio Rental</span>
              </div>
            </div>
            <p className="text-white/60 text-sm mb-4">
              Premium car rentals in Washington DC, Maryland, and Virginia. Rent Easy. Drive Smart.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-gold transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.25 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-white/60 hover:text-gold transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white/60 hover:text-gold transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c5.032 0 8.035 2.48 8.035 6.59 0 4.03-2.708 5.77-5.24 5.77-1.051 0-1.802-.4-2.117-.88v-.055h-.003c-.17.45-.405.87-.708 1.24-.474.58-1.24.9-2.12.9-1.72 0-2.62-1.13-2.62-2.66.01-.85.29-1.61.7-2.18-.26-.15-.48-.38-.63-.68-.17-.35-.24-.75-.24-1.19 0-1.14.74-2.16 1.94-2.54.45-.14.97-.22 1.5-.22.63 0 1.18.12 1.61.31.41-.19.9-.31 1.4-.31zm.03 1.54c-.35 0-.65.08-.88.19-.29.14-.52.34-.66.56-.14.22-.22.46-.22.7 0 .23.07.46.2.65.15.21.38.39.68.51.37.14.79.19 1.22.19.41-.01.81-.08 1.14-.23.26-.11.44-.27.56-.46.13-.2.2-.43.2-.68 0-.25-.08-.48-.22-.68-.13-.19-.33-.36-.58-.47-.36-.16-.83-.28-1.44-.28zm-2.73 5.07c-.18 0-.36.01-.51.05-.39.1-.65.38-.65.79 0 .34.17.59.42.74.25.14.58.21.93.21.57 0 1.05-.17 1.35-.49.12-.13.2-.27.25-.42.05-.15.07-.3.07-.45v-.15c-.12-.06-.27-.11-.44-.15-.26-.06-.56-.1-.88-.1-.28 0-.54.01-.54.01z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-gold font-semibold text-sm uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold font-semibold text-sm uppercase tracking-wider mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-gold mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-white/60 text-sm">(202) 555-0123</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-gold mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-white/60 text-sm">info@triorentalllc.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-gold mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white/60 text-sm">Washington DC, MD & VA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} Trio Rental LLC. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/120px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe" className="h-6 opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
