import React, { useRef, useState } from "react";
import Modal from "../../../../UI/Modal/Modal";
import { useRouter } from "next/router";
import SignInDefault from "./SignInDefault";
import SignInNumber from "./SignInNumber";
import SignInOTP from "./SignInOTP";
import SignUpDefault from "./SignUpDefault";
import SignUpNumber from "./SignUpNumber";
import SignUpOTP from "./SignUpOTP";
import SignUpComplete from "./SignUpComplete";
import { useSelector, useDispatch } from "react-redux";
import {
  addAccessToken,
  addRefreshToken,
  authSelector,
  setAuthModalState,
} from "../../../../../redux/slices/authSlice";
import axios from "axios";
import { host } from "../../../../../utils/constant";
import { useGoogleLogin } from "@react-oauth/google";
import { addRegisterData } from "../../../../../redux/slices/signUpSlice";
import ProfileAndPin from "./ProfileAndPin";

export default function AuthModal({ handleClose, open, handleOpen }) {
  const [mobilenumber, setmobilenumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("default");
  const { isAuthenticated, authModalState } = useSelector(authSelector);
  const [referral, setReferral] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const handleOtpSent = () => {
    setOtpSent(true);
  };

  const handleLoading = () => {
    setLoading(!loading);
  };

  const handleMobileNumber = (val) => {
    setmobilenumber(val);
  };
  const handleActive = (val) => {
    setActive(val);
  };

  const serverLogin = async (postBody) => {
    console.log(JSON.stringify(postBody));
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      const response = await axios.post(
        `${host}/auth/google`,
        {
          access_token: JSON.stringify(postBody),
        },
        config
      );
      const email = response?.data?.user?.email;
      typeof window !== "undefined" && window.localStorage.clear();

      // getting the user data.. and saving it to localStorage ..
      axios
        .get(`${host}/users?email=${email}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((userRes) => {
          const tokens = axios.post(
            `${host}/users/login/google`,
            {
              access_token: JSON.stringify(postBody),
              email: email,
            },
            config
          );
          const { access_token, refresh_token } = tokens.message;
          dispatch(addAccessToken(access_token));
          dispatch(addRefreshToken(refresh_token));

          const { usertype, institute } = userRes.data.message;
          typeof window !== "undefined" &&
            window.localStorage.setItem("OWNER_ID", userRes.data.message.id);

          // redirecting user after successfully logged in...
          if (usertype === 1) router.push("/admin-dashboard/overview");
          else if (usertype === 2) {
            if (institute === null) router.push("/merchant/details");
            else {
              typeof window !== "undefined" &&
                window.localStorage.setItem("INSTITUTE_ID", institute.id);
              typeof window !== "undefined" &&
                window.localStorage.setItem(
                  "OWNER_PHONE",
                  institute.phonenumber
                );

              router.push("/merchant/dashboard");
            }
          } else {
            router.push({
              pathname: router.pathname,
              query: { ...router.query },
            });
          }
        })
        .catch((err) => {
          dispatch(addRegisterData({ email: email }));

          dispatch(setAuthModalState(7));
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleGoogleSignIn = useGoogleLogin({
    flow: "implicit",

    onSuccess: (response) => {
      // console.log("Google response: ", response);
      // setOpen(true);
      // dispatch(googleLoginSuccess(response.tokenObj));
      serverLogin(response.access_token);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <div className=" bg-white rounded-[10px] md:max-md:w-[370px] w-[300px]">
      <Modal closeOnOutsideClick={false} onClose={handleClose} open={open}>
        {authModalState === 1 ? (
          <SignInDefault {...{ handleClose, handleGoogleSignIn }} />
        ) : authModalState === 2 ? (
          <SignInNumber
            {...{
              handleActive,
              handleClose,
              handleNumber: handleMobileNumber,
              handleGoogleSignIn,
              loading,
              handleLoading,
              handleOtpSent,
              otpSent,
            }}
          />
        ) : authModalState === 3 ? (
          <SignInOTP
            {...{
              handleActive,
              handleOtpSent,
              otpSent,
              handleClose,
              mobilenumber,
              loading,
              handleLoading,
            }}
          />
        ) : authModalState === 4 ? (
          <SignUpDefault {...{ handleClose, handleGoogleSignIn }} />
        ) : authModalState === 5 ? (
          <SignUpNumber
            {...{
              referral,
              setReferral,
              handleActive,
              handleClose,
              handleNumber: handleMobileNumber,
              handleGoogleSignIn,
              loading,
              handleLoading,
              mobilenumber,
              handleOtpSent,
              otpSent,
            }}
          />
        ) : authModalState === 6 ? (
          <SignUpOTP
            {...{
              handleActive,
              handleClose,
              handleOtpSent,
              otpSent,
              mobilenumber,
              loading,
              handleLoading,
            }}
          />
        ) : authModalState === 7 ? (
          <SignUpComplete
            {...{
              handleClose,
              mobilenumber,
              loading,
              handleLoading,
              referral,
              handleOpen,
            }}
          />
        ) : authModalState === 8 ? (
          <ProfileAndPin
            {...{
              handleClose,
            }}
          />
        ) : null}
      </Modal>
    </div>
  );
}
