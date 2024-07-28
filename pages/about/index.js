// import div from '@/components/div';
import Link from "next/link";
const About = () => {
  return (
    <div title="About Us">
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-customPink">About Our Clothing Store</h1>
            <p className="text-lg mb-6">
              Our clothing store provides different categories of clothes with different varieties at suitable costs to give customers the best experience.
            </p>
            <p className="text-lg mb-6">
              You can find your best choices here and can purchase them through our site. Your favourites which were added to bag by you will be kept saved with us and you will be able to purchase them later at any time.
            </p>
            {/* <p className="text-lg mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero vitae nulla vehicula, eget consequat neque volutpat. Sed id cursus est. Maecenas sit amet nulla ac ex ultrices convallis.
            </p> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-customPink">Our Mission</h2>
                <p className="text-lg mb-4">
                  This store allows both normal customers and shop dealers to buy clothes with suitable prices.
                </p>
                <p className="text-lg mb-4">
                  If the person is logged in with special id <b>@looks</b> he will be able to see prices as a whole sale dealer to get the best clothes. No person is able to create a id with the same domain without us. To have this id you have to message us and we will provide it to you.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-customPink">Our Vision</h2>
                <p className="text-lg mb-4">
                  We have seen many whole sale dealers finding it difficult to get the clothes at sustainable prices with the best quality.
                </p>
                <p className="text-lg mb-4">
                  So, we are here to give our best to provide whole sale dealers the best materials at their suitable prices.We will be sharing different vouchers to these users to avail more benefits.
                </p>
              </div>
            </div>

            {/* <h2 className="text-2xl font-bold mt-8 mb-4">Our Team</h2>
            <p className="text-lg mb-6">
              Meet the passionate individuals behind [Your Brand Name]. Each member of our team is dedicated to bringing you the latest trends and highest quality clothing.
            </p> */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <img src="/team-member1.jpg" alt="Team Member 1" className="w-32 h-32 rounded-full mb-2" />
                <p className="font-bold">John Doe</p>
                <p className="text-sm">Co-Founder & CEO</p>
              </div>
              <div className="flex flex-col items-center">
                <img src="/team-member2.jpg" alt="Team Member 2" className="w-32 h-32 rounded-full mb-2" />
                <p className="font-bold">Jane Smith</p>
                <p className="text-sm">Fashion Designer</p>
              </div>
              <div className="flex flex-col items-center">
                <img src="/team-member3.jpg" alt="Team Member 3" className="w-32 h-32 rounded-full mb-2" />
                <p className="font-bold">David Brown</p>
                <p className="text-sm">Marketing Manager</p>
              </div>
            </div> */}

            <h2 className="text-2xl font-bold mt-8 mb-4 text-customPink" >Contact Us</h2>
            <p className="text-lg mb-4">
              Have questions or feedback? We had love to hear from you! Please <Link href="/contact" className="text-customPink hover:underline">contact us</Link> and we will get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
