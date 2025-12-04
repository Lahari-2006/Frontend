import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-blue-900 via-blue-950 to-[#020617] text-white border-t border-white/10">
      <div className="container mx-auto px-4 py-14">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* COMPANY INFO */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="
                w-12 h-12 rounded-xl 
                bg-gradient-to-br from-blue-600 to-blue-500 
                shadow-lg flex items-center justify-center
              ">
                <span className="text-white font-bold text-xl tracking-wide">
                  RB
                </span>
              </div>
              <span className="font-semibold text-lg">RB Financial</span>
            </div>

            <p className="text-sm text-blue-200/80 leading-relaxed">
              Your trusted partner for financial, taxation, and compliance solutions.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-blue-100">Quick Links</h3>
            <ul className="space-y-2">
              {[
                ["Home", "/app"],
                ["Services", "/app/services"],
                ["Blogs", "/app/blogs"],
                ["Contact", "/app/contact"],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm text-blue-300/80 hover:text-white transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-blue-100">Our Services</h3>
            <ul className="space-y-2 text-sm text-blue-300/80">
              <li>Taxation & Compliance</li>
              <li>Business Registrations</li>
              <li>Accounting Services</li>
              <li>Advisory Services</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="space-y-4">
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 text-blue-300/80">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span>rbfinancialconsultancy.otp@gmail.com</span>
              </li>

              <li className="flex items-start space-x-3 text-blue-300/80">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span>Vijayawada, Andhra Pradesh</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-sm text-blue-300/80">
            © {currentYear} RB Financial Consultancy. All Rights Reserved.
          </p>

          <a
            href="mailto:rbfinancialconsultancy.otp@gmail.com"
            className="text-blue-300/80 hover:text-white transition"
          >
          
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
