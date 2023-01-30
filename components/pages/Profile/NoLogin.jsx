import React from "react";;
import image1 from "../../assets/NoLogin/undraw_wishlist_re_m7tv 1.png";
import image2 from "../../assets/NoLogin/undraw_referral_re_0aji 1.png";
import Link from 'next/link';
const NoLogin = ({ type }) => {
  return (
    <div>
      {type === "wishlist" ? (
        <div className="mb-16">
          <img src={image1.src} className="mx-auto" alt="" />

          <div className="text-center mb-5">
            <p className="text-3xl font-semibold my-5">
              {" "}
              Log In to view your Wishlist{" "}
            </p>
            <Link prefetch={false}
              href="/"
            >
              <a href="" className="px-4 py-2 bg-primary text-white text-xl rounded">Login</a>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mb-16">
          <img src={image2.src} className="mx-auto" alt="" />

          <div className="text-center mb-5">
            <p className="text-3xl font-semibold my-5">
              {" "}
              Log In to view your referral rewards
            </p>
            <Link prefetch={false}
              href="/"
            >
              <a href="" className="px-4 py-2 bg-primary text-white text-xl rounded">Login</a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoLogin;
