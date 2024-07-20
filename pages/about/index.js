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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero vitae nulla vehicula, eget consequat neque volutpat. Sed id cursus est. Maecenas sit amet nulla ac ex ultrices convallis.
            </p>
            <p className="text-lg mb-6">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque consectetur turpis in maximus ultrices. Curabitur nec arcu nec ligula accumsan tempor. Sed maximus justo in leo bibendum hendrerit. Nulla facilisi. Etiam porta varius arcu, at volutpat velit interdum eget.
            </p>
            <p className="text-lg mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero vitae nulla vehicula, eget consequat neque volutpat. Sed id cursus est. Maecenas sit amet nulla ac ex ultrices convallis.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-customPink">Our Mission</h2>
                <p className="text-lg mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero vitae nulla vehicula, eget consequat neque volutpat. Sed id cursus est. Maecenas sit amet nulla ac ex ultrices convallis.
                </p>
                <p className="text-lg mb-4">
                  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque consectetur turpis in maximus ultrices. Curabitur nec arcu nec ligula accumsan tempor. Sed maximus justo in leo bibendum hendrerit. Nulla facilisi. Etiam porta varius arcu, at volutpat velit interdum eget.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-customPink">Our Vision</h2>
                <p className="text-lg mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero vitae nulla vehicula, eget consequat neque volutpat. Sed id cursus est. Maecenas sit amet nulla ac ex ultrices convallis.
                </p>
                <p className="text-lg mb-4">
                  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque consectetur turpis in maximus ultrices. Curabitur nec arcu nec ligula accumsan tempor. Sed maximus justo in leo bibendum hendrerit. Nulla facilisi. Etiam porta varius arcu, at volutpat velit interdum eget.
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
