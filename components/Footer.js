import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-sky-200 text-customPink py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-4">
            <h3 className="text-xl font-bold mb-3">Company</h3>
            <ul>
              <li><Link href="/about"><div className="text-black hover:text-customPink">About Us</div></Link></li>
              <li><Link href="/contact"><div className="text-black hover:text-customPink">Contact Us</div></Link></li>
              {/* <li><Link href="/faq"><div className="text-black hover:text-customPink">FAQs</div></Link></li> */}
              {/* Add more links as needed */}
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-4">
            <h3 className="text-xl font-bold mb-3">Categories</h3>
            <ul>
              <li><Link href="/product/Men"><div className="text-black hover:text-customPink">Men</div></Link></li>
              <li><Link href="/product/Women"><div className="text-black hover:text-customPink">Women</div></Link></li>
              <li><Link href="/product/Accessories"><div className="text-black hover:text-customPink">Accessories</div></Link></li>

              <li><Link href="/product/Shoes"><div className="text-black hover:text-customPink">Shoes</div></Link></li>
              <li><Link href="/product/Clothing"><div className="text-black hover:text-customPink">Clothing</div></Link></li>
              {/* Add more categories or subcategories */}
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-4 text-black">
            <h3 className="text-xl font-bold mb-3 ">Connect with Us</h3>
            <ul>
              <li>Email: info@yourwebsite.com</li>
              <li>Phone: +1234567890</li>
              <li>
                <div className="flex mt-2">
                  <div href="#" className="text-black hover:text-customPink mr-2">
                    <i className="fab fa-facebook"></i>
                  </div>
                  <div href="#" className="text-black hover:text-customPink mr-2">
                    <i className="fab fa-twitter"></i>
                  </div>
                  <div href="#" className="text-black hover:text-customPink mr-2">
                    <i className="fab fa-instagram"></i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-4 text-black">
            <h3 className="text-xl font-bold mb-3">Newsletter</h3>
            <p>Subscribe to our newsletter for updates and promotions.</p>
            <form className="mt-4">
              <input type="email" placeholder="Your Email" className="bg-gray-700 text-white px-4 py-2 w-full rounded-xl focus:outline-none focus:bg-gray-600" />
              <button type="submit" className="mt-2 hover:bg-customPink hover:text-white px-4 py-2 rounded-xl bg-white border-2 border-customPink text-customPink font-bold focus:outline-none">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-6 pt-4 text-center">
          <p>&copy; 2024 Your Clothing Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
