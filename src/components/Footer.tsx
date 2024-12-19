export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          {/* Logo */}
          <div className="text-2xl font-bold">
            Explore<span className="text-gray-400">Tik</span>
          </div>

          {/* Navigation Links */}
          <div className="mt-4 flex space-x-6 md:mt-0">
            <a href="#" className="hover:text-gray-400">
              About Us
            </a>
            <a href="#" className="hover:text-gray-400">
              Services
            </a>
            <a href="#" className="hover:text-gray-400">
              Contact
            </a>
            <a href="#" className="hover:text-gray-400">
              Privacy Policy
            </a>
          </div>

          {/* Social Media Links */}
          <div className="mt-4 flex space-x-4 md:mt-0">
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-500">
          © 2024 EventManage. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
