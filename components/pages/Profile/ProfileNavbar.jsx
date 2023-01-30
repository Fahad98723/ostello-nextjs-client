import { WalletOutlined } from "@ant-design/icons";
import { Container } from "@mui/material";
import { Progress } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiOutlineCreditCard,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineQuestionCircle,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMessageDots, BiUserPlus } from "react-icons/bi";
import { BsBag } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { FiLogOut, FiUser } from "react-icons/fi";
import { MdDashboard, MdOutlineInsertChart } from "react-icons/md";
import { RiCalendarEventFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  getInstituteDetails,
  getUser,
} from "../../../redux/slices/authSlice";
import LogAndDeleteModal from "./LogAndDeleteModal";
import ProfileImageModal from "./ProfileImageModal";

const ProfileNavbar = ({ handleActive }) => {
  const [open, setOpen] = React.useState(false);
  const [modalType, setModalType] = useState("");
  const [finished, setFinished] = useState(false);

  const [deleteAndLogopen, seDeleteAndLogOpen] = React.useState(false);
  const [selectImage, setSelectedImage] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleDeleteAndLogOpen = (type) => {
    seDeleteAndLogOpen(true);
    setModalType(type);
  };

  const imageUpload = () => {
    handleOpen();
    setSelectedImage(true);
    setFinished(false);
  };

  const imageHandleChange = (e) => {
    console.log(e.target.files);
  };

  const dispatch = useDispatch();
  const {
    instituteDetails,
    addUserData,
    userData,
    profileProgress,
    loading,
    message,
  } = useSelector(authSelector);
  const router = useRouter();
  const currentRoute = router.pathname;
  useEffect(() => {
    dispatch(getInstituteDetails());
  }, [dispatch, finished]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (message?.length) {
      toast.error(message);
    }
  }, [message]);

  const handleWallet = async () => {
    if (profileProgress !== 100) {
      toast.error("Complete your profile to active wallet !");
    } else {
      router.push("/profile/wallet");
    }
  };

  return (
    <div className="md:max-w-[400px]">
      <Container className="mb-5 relative">
        <div className="userImage mb-5">
          <div className="relative">
            <div>
              {userData?.avatar?.url ? (
                <img
                  src={`https://cdn.ostello.co.in/${userData?.avatar?.key}`}
                  className="mx-auto "
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "50%",
                  }}
                  alt=""
                />
              ) : (
                <>
                  <div className="bg-primary h-[200px] w-[200px] mx-auto text-8xl rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                    {userData?.name?.slice(0, 1).toUpperCase()}
                  </div>
                </>
              )}
              <FaRegEdit
                className="text-4xl shadow-lg text-[#7D23E0] bg-white rounded-full p-2 mb-auto"
                style={{
                  position: "absolute",
                  transform: "translate(-50%,-50%)",
                  top: "20%",
                  left: "75%",
                }}
                onClick={imageUpload}
              />
            </div>
          </div>
          <p className="text-3xl text-center font-medium mt-4">
            {instituteDetails?.owner?.name}
          </p>
          <Progress percent={Math.round(profileProgress)} />
        </div>
        <div className="menu profile justify-start mt-10">
          <div>
            <p
              className="mt-5 mb-2"
              style={{
                paddingLeft: "20px",
                letterSpacing: "5px",
                textTransform: "uppercase",
              }}
            >
              Activity
            </p>
            <Link prefetch={false} href="/profile">
              <a
                href=""
                activeClass="active"
                className={`menu-item flex items-center gap-3`}
              >
                {" "}
                <FiUser></FiUser> Profile{" "}
              </a>
            </Link>
            <div onClick={handleWallet}>
              <>
                <p
                  href=""
                  activeClass="active"
                  className={`menu-item flex items-center gap-3`}
                >
                  <WalletOutlined /> Wallet
                </p>
              </>
            </div>
            <Link prefetch={false} href="/profile/reviews">
              <a
                href=""
                activeClass="active"
                className="menu-item flex items-center gap-3"
              >
                {" "}
                <AiOutlineStar></AiOutlineStar> Review{" "}
              </a>
            </Link>
            <Link prefetch={false} href="/profile/wishlist">
              <a
                href=""
                activeClass="active"
                className="menu-item flex items-center gap-3"
              >
                <AiOutlineHeart></AiOutlineHeart> Wishlist{" "}
              </a>
            </Link>
            <Link prefetch={false} href="/profile/invite&earns">
              <a
                href=""
                activeClass="active"
                className="menu-item flex items-center gap-3"
              >
                <BiUserPlus></BiUserPlus> Invite & Earns{" "}
              </a>
            </Link>
          </div>
          <hr className="my-3 text-ghost/60" />
          <div>
            <p
              className="mt-5 mb-2"
              style={{
                paddingLeft: "20px",
                letterSpacing: "5px",
                textTransform: "uppercase",
              }}
            >
              Courses
            </p>
            <Link prefetch={false} href="/profile/recentlyViewed/">
              <a
                href=""
                activeClass="active"
                className="menu-item flex items-center gap-3"
              >
                {" "}
                <AiOutlineEye></AiOutlineEye> Recently Viewed{" "}
              </a>
            </Link>
            <Link prefetch={false} href="/profile/purchaseCourse">
              <a
                href=""
                activeClass="active"
                className="menu-item flex items-center gap-3"
              >
                {" "}
                <BsBag></BsBag> Purchase Courses{" "}
              </a>
            </Link>
            <Link prefetch={false} href="/profile/ongoingCourse">
              <a
                href=""
                activeClass="active"
                className="menu-item flex items-center gap-3"
              >
                <MdOutlineInsertChart></MdOutlineInsertChart> Ongoing Courses{" "}
              </a>
            </Link>
          </div>

          <hr className="my-3 text-ghost/60" />

          <div>
            <p
              className="mt-5 mb-2"
              style={{
                paddingLeft: "20px",
                letterSpacing: "5px",
                textTransform: "uppercase",
              }}
            >
              Payment
            </p>
            <Link prefetch={false} href="/profile/manageCards">
              <a
                href=""
                activeClass="active"
                className="menu-item flex items-center gap-3"
              >
                {" "}
                <AiOutlineCreditCard></AiOutlineCreditCard> Manage Cards{" "}
              </a>
            </Link>
          </div>

          <hr className="my-3 text-ghost/60 " />

          <div>
            <p
              className="mt-5 mb-2"
              style={{
                paddingLeft: "20px",
                letterSpacing: "5px",
                textTransform: "uppercase",
              }}
            >
              Others
            </p>

            <Link prefetch={false} href="/blogs">
              <a
                href=""
                activeClass="active"
                className="menu-item flex items-center gap-3"
              >
                {" "}
                <MdDashboard></MdDashboard> Blogs{" "}
              </a>
            </Link>
            <Link prefetch={false} href="/events">
              <a
                href=""
                activeClass="active"
                className="menu-item flex items-center gap-3"
              >
                {" "}
                <RiCalendarEventFill></RiCalendarEventFill> Events{" "}
              </a>
            </Link>
            <Link prefetch={false} href="/faq">
              <a
                href=""
                activeClass="active"
                className="menu-item flex items-center gap-3"
              >
                {" "}
                <AiOutlineQuestionCircle></AiOutlineQuestionCircle> FAQs{" "}
              </a>
            </Link>
            <Link prefetch={false} href="/contact-us">
              <a
                href=""
                activeClass="active"
                className="menu-item flex items-center gap-3"
              >
                <BiMessageDots></BiMessageDots> Need Help?{" "}
              </a>
            </Link>
          </div>

          <hr className="my-3 text-ghost/60 " />

          {/* <h3
            onClick={() => handleDeleteAndLogOpen('delete')}
            className="menu-item flex items-center gap-3 "
          >
            {" "}
            Delete Account{" "}
          </h3> */}
          <h3
            onClick={() => handleDeleteAndLogOpen("logout")}
            className="menu-item flex items-center gap-3 text-[#FF0000]/80"
          >
            {" "}
            <FiLogOut></FiLogOut> Log Out{" "}
          </h3>
        </div>

        <ProfileImageModal
          open={open}
          handleOpen={handleOpen}
          setOpen={setOpen}
          setSelectedImage={setSelectedImage}
          selectImage={selectImage}
          image={userData?.avatar?.key}
          name={userData?.name}
          setFinished={setFinished}
        />

        <LogAndDeleteModal
          open={deleteAndLogopen}
          handleOpen={handleDeleteAndLogOpen}
          setOpen={seDeleteAndLogOpen}
          modalType={modalType}
        />
      </Container>
    </div>
  );
};

export default ProfileNavbar;
