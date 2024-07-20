import Image from "next/image";
import Div1 from "@/components/Div1";
import Div2 from "@/components/Div2";
import Div3 from "@/components/Div3";
import CustomerViews from "@/components/Customer";
import CircleComponent from "@/components/try";
import Category from '@/components/Category';

export default function Home() {
  return (
    <>
      {/* <CircleComponent/> */}
      <div className="w-full px-4 md:px-20">
        <Div1 />
      </div>
      <div className="w-full px-4 md:px-20">
        <Div2 />
      </div>
      <div className="w-full px-4 md:px-20">
        <Div3 />
      </div>
      <div className="w-full flex justify-center my-20">
        <h1 className="text-5xl text-customPink font-bold">ORDER NOW!</h1>
      </div>
      <div className="w-full px-4 md:px-20">
        <Category />
      </div>
      <div className="w-full px-4 md:px-20">
        <CustomerViews />
      </div>
    </>
  );
}
