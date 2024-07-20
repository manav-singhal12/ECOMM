// import { useSession } from 'next-auth/react';
// import { useEffect, useState } from 'react';

// const dashboard = () => {
//   const { data: session } = useSession();
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     if (session) {
//       fetchUserData(session.user.email);
//   console.log(session)
//   console.log(session.user.email)
//   console.log(session.user.shopname)


//     }
//   }, [session]);

//   const fetchUserData = async (email) => {
//     try {
//       const res = await fetch(`/api/getUser?email=${email}`);
//       if (res.ok) {
//         const data = await res.json();
//         setUserData(data);
//       } else {
//         console.error('Failed to fetch user data');
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   if (!session) {
//     return <div>Please log in</div>;
//   }
//   console.log(session)

//   return (
//     <div>
//       {userData && (
//        <div className="bg-pink-200 py-6 flex flex-col items-center">
//        <div className="text-center mb-4">
//       {/* <h1 className="font-bold text-3xl py-2">Welcome, {session.user.name}</h1> */}
//          <h1 className="font-bold text-3xl py-2">Dashboard</h1>
//        </div>
//        <div className="container max-w-md w-full p-4">
//          <form  className="flex flex-col gap-6">
//            <input
//              type="text"
//              placeholder="Enter your name"
//              name="name"
//              value={session.user.name}
//             //  onChange={(e) => setName(e.target.value)}
//              className="border-2 rounded-xl p-1 text-black px-2 bg-none border-customPink focus:border-customPink focus:outline-customPink"
//            />
//            <input
//              type="text"
//              placeholder="Enter your email"
//              name="email"
//              value={session.user.email}
//             //  onChange={(e) => setEmail(e.target.value)}
//              className="border-2 rounded-xl p-1 text-black px-2 bg-none border-customPink focus:border-customPink focus:outline-customPink"
//            />
           
//            <input
//              type="text"
//              placeholder="Enter your shop name"
//              name="shopname"
//              value={session.user.shopname}
//             //  onChange={(e) => setShopname(e.target.value)}
//              className="border-2 rounded-xl p-1 text-black px-2 bg-none border-customPink focus:border-customPink focus:outline-customPink"
//            />
//            <input
//              type="tel"
//              placeholder="Enter your phone number"
//              name="phoneno"
//              value={session.user.phoneno}
//             //  onChange={(e) => setPhoneno(e.target.value)}
//              className="border-2 rounded-xl p-1 text-black px-2 bg-none border-customPink focus:border-customPink focus:outline-customPink"
//            />
//            <input
//              type="text"
//              placeholder="Enter your address"
//              name="address"
//              value={session.user.address}
//             //  onChange={(e) => setAddress(e.target.value)}
//              className="border-2 rounded-xl p-1 text-black px-2 bg-none border-customPink focus:border-customPink focus:outline-customPink"
//            />
//            <input
//              type="submit"
//              className="border-pink-400 border-2 mb-4 p-2 font-semibold text-lg text-white cursor-pointer bg-customPink rounded-xl"
//            />
//          </form>
         
//        </div>
//        {/* Additional UI elements */}
//      </div>
//       )}
//     </div>
//   );
// };

// export default dashboard;
