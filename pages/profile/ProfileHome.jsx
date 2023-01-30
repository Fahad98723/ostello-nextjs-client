import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Dropdown from "../../components/Dropdown";
import { authSelector, getUser } from "../../redux/slices/authSlice";
import { host } from "../../utils/constant";
import { isEmpty } from "../../utils/utils";

const ProfileHome = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(authSelector);
  const [copied, setCopied] = useState(false);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [studyingAt, setStudyingAt] = useState("");
  const [finished, setFinished] = useState(false);
  const [city, setCity] = useState();
  const [area, setArea] = useState("");
  const [areaError, setAreaError] = useState("");
  const [areaOptions, setAreaOptions] = useState([]);
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  const infoGenRef = useRef(null);

  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);

  console.log(userData);

  useEffect(() => {
    if (!isEmpty(userData)) {
      setUserName(userData?.name);
      setPhoneNumber(userData?.phonenumber);
      setUserEmail(userData?.email);
      setStudyingAt(userData?.schoolname);
      setState(userData?.location?.state);
      setArea(userData?.location?.area);
      setCity(userData?.location?.city);
      setPincode(userData?.location?.pincode);
    }
  }, [userData]);

  const handleGenerateFromPincode = (pinCode) => {
    if (pinCode?.length !== 6) {
      setPincodeError("Enter a valid pincode");
      setAreaOptions([]);
      setArea("");
      setCity("");
      setState("");
      setCountry("");
      return;
    }
    setIsLoading(true);

    axios
      .get(`https://api.postalpincode.in/pincode/${pinCode}`)
      .then((res) => {
        setAreaOptions([]);
        res.data.map((item) =>
          item.PostOffice.forEach((po) => {
            setAreaOptions((prev) => {
              if (prev.indexOf(po.Name) === -1) {
                return [...prev, po.Name];
              }
              return prev;
            });
          })
        );
        console.log(res.data[0].PostOffice[0]);
        setCity(res.data[0].PostOffice[0].District);
        setState(res.data[0].PostOffice[0].State);
        setCountry(res.data[0].PostOffice[0].Country);
        setIsLoading(false);
        setPincodeError("");
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = async () => {
    const updateData = {
      id: userData.id,
      updates: {
        name: userName,
        phonenumber: phoneNumber,
        email: userEmail,
        location: {
          state: state,
          city: city,
          area: area,
          pincode: pincode,
        },
        schoolname: studyingAt,
      },
    };
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      };
      console.log(config);
      const { data } = await axios.patch(`${host}/users/`, updateData, config);

      Swal.fire({
        icon: "success",
        title: "User data updated",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      dispatch(getUser());
      setFinished(true);
    } catch (err) {
      console.log("hello");
      Swal.fire({
        icon: "error",
        title: "Something went wrong try again later",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  console.log(userData);

  const [isDisable, setIsDisable] = useState(true);

  return (
    <div className="p-5 mb-16 md:max-w-[1000px]">
      <div className="heading my-2 ">
        <div className="flex justify-between">
          <p className="text-2xl ">Profile Section</p>

          <div>
            {isDisable ? (
              <button
                className="  text-white w-20 rounded-full p-1  ml-auto"
                style={{ background: "#4C4C4C" }}
                onClick={() => {
                  setIsDisable(false);
                  setFinished(false);
                  handleGenerateFromPincode(pincode);
                }}
              >
                {" "}
                Edit{" "}
              </button>
            ) : (
              <>
                <button
                  className="  text-white w-20 rounded-full p-1  ml-auto"
                  style={{ background: "#4C4C4C" }}
                  onClick={() => {
                    setIsDisable(true);
                    handleUpdate();
                  }}
                >
                  {" "}
                  Save{" "}
                </button>
                <button
                  className="  text-white w-20 rounded-full p-1 ml-2  "
                  style={{ background: "#4C4C4C" }}
                  onClick={() => {
                    setIsDisable(true);
                  }}
                >
                  {" "}
                  Cancel{" "}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="space-y-2">
          <div
            className={` shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
              !userName && !isDisable && "border-red"
            }`}
          >
            <h2 className=" mb-1" style={{ fontSize: "15px" }}>
              User Name
            </h2>

            <input
              type="text"
              placeholder={userName}
              autoFocus
              className="text-xl bg-white  focus:outline-none w-full"
              defaultValue={userName || ""}
              disabled={isDisable}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>

          <div
            className={` shrink w-full px-6 py-2 shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
              !phoneNumber && !isDisable && "border-red"
            }`}
          >
            <h2 className=" mb-1" style={{ fontSize: "15px" }}>
              User Contact No.
            </h2>

            <input
              type="text"
              placeholder={phoneNumber}
              autoFocus
              className="text-xl bg-white  focus:outline-none w-full"
              defaultValue={phoneNumber || ""}
              disabled={isDisable}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col space-y-10  lg:flex-row lg:space-x-10">
            <div
              className={` shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
                !userEmail?.length && !isDisable && "border-red"
              }`}
            >
              <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                User Email
              </h2>

              <input
                type="text"
                placeholder={userEmail}
                autoFocus
                className="text-xl bg-white  focus:outline-none w-full"
                defaultValue={userEmail || ""}
                disabled={isDisable}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-10  lg:flex-row lg:space-x-10">
            <div
              className={` shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
                !studyingAt?.length && !isDisable && "border-red"
              }`}
            >
              <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                School / College
              </h2>

              <input
                type="text"
                placeholder={studyingAt}
                autoFocus
                className="text-xl bg-white  focus:outline-none w-full"
                value={studyingAt || ""}
                disabled={isDisable}
                onChange={(e) => {
                  setStudyingAt(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

       

        <div
          className={`shrink px-6 py-2 md:w-1/4 w-2/4 shadow-md rounded-xl font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 focus:outline-none text-xl mt-2 flex`}
        >
          <input
            type="text"
            autoFocus
            className="text-xl bg-white  focus:outline-none w-full"
            name="pincode"
            placeholder="Pincode"
            onChange={(e) => handleChange(e, setPincode)}
            value={pincode}
            disabled={isDisable}
          />
          <button
            ref={infoGenRef}
            disabled={isDisable}
            onClick={(e) => {
              e.preventDefault();
              handleGenerateFromPincode(pincode);
            }}
            className="text-xs p-1 bg-primary text-white m-1 rounded-md"
          >
            Generate
          </button>
        </div>
        <div className="flex justify-between">
          <div className="shrink px-2 py-2 w-3/4 shadow-md rounded-xl font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 focus:outline-none text-xl mt-2 mr-2">
            <input
              type="text"
              autoFocus
              className="text-xl bg-white px-5 focus:outline-none w-full"
              disabled={isDisable ? true : false}
              name="state"
              placeholder="State"
              onChange={(e) => handleChange(e, setState)}
              value={state}
            />
          </div>
          <div className="shrink px-2 py-2 w-3/4 shadow-md rounded-xl font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 focus:outline-none text-xl mt-2 ">
            <input
              type="text"
              autoFocus
              className="text-xl bg-white px-5  focus:outline-none w-full"
              disabled={isDisable ? true : false}
              name="city"
              placeholder="City"
              onChange={(e) => handleChange(e, setCity)}
              value={city}
            />
          </div>
        </div>
        {!isDisable ? (
          <div className="">
            <div className="shrink px-2 py-2 w-3/4 shadow-md rounded-xl font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 focus:outline-none text-xl mt-2 ">
              <input
                list="area-option-list"
                id="area-choice"
                name="area-choice"
                type="text"
                autoFocus
                className="text-xl bg-white px-5  focus:outline-none w-full"
                placeholder="Area"
                onChange={(e) => handleChange(e, setArea)}
                value={area}
              />

              <datalist id="area-option-list">
                {areaOptions.map((category, idx) => {
                  return (
                    <option
                      key={idx}
                      value={category}
                      className="w-full text-[14px] font-normal text-black rounded-[10px] cursor-pointer"
                    />
                  );
                })}
              </datalist>
            </div>
          </div>
        ) : (
          <div className="shrink px-2 py-2 w-3/4 shadow-md rounded-xl font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 focus:outline-none text-xl mt-2 ">
            <input
              type="text"
              autoFocus
              className="text-xl bg-white px-5  focus:outline-none w-full"
              disabled={isDisable ? true : false}
              name="area"
              placeholder="Area"
              // onChange={(e) => handleChange(e, setCity)}
              value={area}
            />
          </div>
        )}

        {userData?.formsreferralcode ? (
          <div className="bg-primary/20 p-2 my-3 flex justify-between items-center border-dashed border-2 border-white rounded">
            <p className="text-lg mr-2 ">
              Your Entrance Exam Referral Code :{" "}
              <span>{userData?.formsreferralcode}</span>
            </p>
            <button
              className="bg-primary/80 p-1 text-white rounded flex items-center text-lg"
              onClick={() => {
                navigator.clipboard.writeText(userData?.formsreferralcode);
                if (
                  navigator.clipboard.writeText(userData?.formsreferralcode)
                ) {
                  setCopied(true);
                }
              }}
            >
              <MdContentCopy className="mr-1" />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProfileHome;
