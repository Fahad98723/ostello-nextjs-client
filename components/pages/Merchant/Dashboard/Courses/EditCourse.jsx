import React, { useState, useEffect } from "react";
import DropdownPP from "../../components/SidePopup/DropdownPP";
import InputFieldPP from "../../components/SidePopup/InputFieldPP";
import TextAreaPP from "../../components/SidePopup/TextAreaPP";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";

const EditCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [courseNameError, setCourseNameError] = useState("");

  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const [instructorName, setInstructorName] = useState("");
  const [instructorNameError, setInstructorNameError] = useState("");

  // const [subject, setSubject] = useState("");
  // const [subjectError, setSubjectError] = useState("");

  const [boardOfEdu, setBoardOfEdu] = useState("");
  const [boardOfEduError, setBoardOfEduError] = useState("");

  const [classOfEduError, setClassOfEduError] = useState("");
  const [classOfEdu, setClassOfEdu] = useState("");

  const [stream, setStream] = useState("");
  const [streamError, setStreamError] = useState("");

  const [domain, setDomain] = useState("");
  const [domainError, setDomainError] = useState("");

  const [exam, setExam] = useState("");
  const [examError, setExamError] = useState("");

  const [skills, setSkills] = useState("");
  const [skillsError, setSkillsError] = useState("");

  const [mode, setMode] = useState("");
  const [modeError, setModeError] = useState("");

  const [batchSize, setBatchSize] = useState("");
  const [batchSizeError, setBatchSizeError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [basePrice, setBasePrice] = useState("");
  const [basePriceError, setBasePriceError] = useState("");

  const [discount, setDiscount] = useState("");
  const [discountError, setDiscountError] = useState("");

  const [discountLimit, setDiscountLimit] = useState("");
  const [discountLimitError, setDiscountLimitError] = useState("");

  const [promoCode, setPromoCode] = useState("");
  const [promoCodeError, setPromoCodeError] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://94f8-49-207-228-21.ngrok.io/institute?id=dc584852-c741-4b9d-bb30-4dc3afbf7a55`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhN2VmNDYzLTdkNmQtNGYzZC04ZmZhLWIyMmQxMmQ3NDgwYSIsIm5hbWUiOiJ1c2VyIiwidXNlcnR5cGUiOjIsImlhdCI6MTY0NjE1MDA1MCwiZXhwIjoxNjQ2MjM2NDUwfQ.dM_gqY7YKrOczhK0hgmdftdElav-749vEFyDmml5wkc`,
          },
        }
      )
      .then((res) => console.log(res.data.message.courses))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (courseName.length <= 0) setCourseNameError("Course Name is required");
    if (category.length <= 0) setCategoryError("Category is required");
    if (instructorName.length <= 0)
      setInstructorNameError("Instructor Name is required");
    if (category === "Junior Secondary School (Class 6-10th)") {
      if (boardOfEdu.length <= 0)
        setBoardOfEduError("Board of Education is required");
      if (classOfEdu.length <= 0)
        setClassOfEduError("Class of Education is required");
    }
    if (category === "Senior Secondary School (Class 11-12th)") {
      if (stream.length <= 0) setStreamError("Stream is required");
      if (boardOfEdu.length <= 0)
        setBoardOfEduError("Board of Education is required");
    }
    if (category === "Competitive Exams") {
      if (exam.length <= 0) setExamError("Exam is required");
      if (domain.length <= 0) setDomainError("Domain is required");
    }
    if (category === "Skill Based Courses") {
      if (skills.length <= 0) setSkillsError("Skills is required");
    }
    if (mode.length <= 0) setModeError("Mode is required");
    if (batchSize.length <= 0) setBatchSizeError("Batch Size is required");
    if (description.length <= 0) setDescriptionError("Description is required");
    if (basePrice.length <= 0) setBasePriceError("Base Price is required");
    else if (!/^[0-9]+$/.test(basePrice))
      setBasePriceError("Base Price must be numeric");
    if (discount.length <= 0) setDiscountError("Discount is required");
    else if (!/^[0-9]+$/.test(discount))
      setDiscountError("Discount must be numeric");
    if (discountLimit.length <= 0)
      setDiscountLimitError("Discount Limit is required");
    else if (!/^[0-9]+$/.test(discountLimit))
      setDiscountLimitError("Discount Limit must be numeric");
  };

  const handleDiscardInfo = (e) => {
    e.preventDefault();
    setCourseName("");
    setCategory("");
    setInstructorName("");
    setBoardOfEdu("");
    setClassOfEdu("");
    setStream("");
    setDomain("");
    setExam("");
    setSkills("");
    setMode("");
    setBatchSize("");
    setDescription("");
    setBasePrice("");
    setDiscount("");
    setDiscountLimit("");
    setPromoCode("");
  };

  return (
    <React.Fragment>
      <form className="mt-6 w-full h-[calc(100vh-148px)] px-6 overflow-y-auto">
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <DropdownPP
            selectValueState={[category, setCategory]}
            placeholderText="Loading..."
            errorState={[categoryError, setCategoryError]}
            title="Category"
            options={[
              "Junior Secondary School (Class 6-10th)",
              "Senior Secondary School (Class 11-12th)",
              "Competitive Exams",
              "Skill Based Courses",
            ]}
          />
          <DropdownPP
            selectValueState={[courseName, setCourseName]}
            placeholderText="Choose Course"
            errorState={[courseNameError, setCourseNameError]}
            title={`Course Name`}
            options={["Course 1", "Course 2", "Course 3", "Course 4"]}
          />
        </div>
        {category.length > 0 && courseName.length > 0 && (
          <React.Fragment>
            <div className="flex flex-col lg:flex-row lg:space-x-4">
              <InputFieldPP
                inputState={[instructorName, setInstructorName]}
                errorState={[instructorNameError, setInstructorNameError]}
                placeholderText="Loading..."
                title={`Instructor Name`}
              />
              {category === "Skill Based Courses" && (
                <DropdownPP
                  selectValueState={[skills, setSkills]}
                  placeholderText="Loading..."
                  errorState={[skillsError, setSkillsError]}
                  title="Skills"
                  options={[]}
                />
              )}
              {/* <InputFieldPP
            inputState={[subject, setSubject]}
            errorState={[subjectError, setSubjectError]}
            placeholderText="Loading..."
            title={`Subject`}
          /> */}
            </div>
            {category === "Junior Secondary School (Class 6-10th)" && (
              <React.Fragment>
                <div className="flex flex-col lg:flex-row lg:space-x-4">
                  <DropdownPP
                    selectValueState={[classOfEdu, setClassOfEdu]}
                    placeholderText="Loading..."
                    errorState={[classOfEduError, setClassOfEduError]}
                    title="Class"
                    options={[
                      "Class 6",
                      "Class 7",
                      "Class 8",
                      "Class 9",
                      "Class 10",
                    ]}
                  />
                  <DropdownPP
                    selectValueState={[boardOfEdu, setBoardOfEdu]}
                    placeholderText="Loading..."
                    errorState={[boardOfEduError, setBoardOfEduError]}
                    title="Board of Education"
                    options={[
                      "CBSE",
                      "ICSE",
                      "NIOS",
                      "UP State Board",
                      "West Bengal State Board",
                      "Tamilnadu State Board",
                      "Maharashtra State Board",
                      "Other",
                    ]}
                  />
                </div>
              </React.Fragment>
            )}
            {category === "Senior Secondary School (Class 11-12th)" && (
              <React.Fragment>
                <div className="flex flex-col lg:flex-row lg:space-x-4">
                  <DropdownPP
                    selectValueState={[stream, setStream]}
                    placeholderText="Loading..."
                    errorState={[streamError, setStreamError]}
                    title="Stream"
                    options={[
                      "Science",
                      "Commerce",
                      "Arts/Humanities",
                      "Vocational",
                    ]}
                  />
                  <DropdownPP
                    selectValueState={[boardOfEdu, setBoardOfEdu]}
                    placeholderText="Loading..."
                    errorState={[boardOfEduError, setBoardOfEduError]}
                    title="Board of Education"
                    options={[
                      "CBSE",
                      "ICSE",
                      "NIOS",
                      "UP State Board",
                      "West Bengal State Board",
                      "Tamilnadu State Board",
                      "Maharashtra State Board",
                      "Other",
                    ]}
                  />
                </div>
              </React.Fragment>
            )}
            {category === "Competitive Exams" && (
              <React.Fragment>
                <div className="flex flex-col lg:flex-row lg:space-x-4">
                  <DropdownPP
                    selectValueState={[domain, setDomain]}
                    errorState={[domainError, setDomainError]}
                    placeholderText="Loading..."
                    title="Domain"
                    options={[]}
                  />
                  <DropdownPP
                    selectValueState={[exam, setExam]}
                    errorState={[examError, setExamError]}
                    placeholderText="Loading..."
                    title="Exam"
                    options={[]}
                  />
                </div>
              </React.Fragment>
            )}
            <div className="flex flex-col lg:flex-row lg:space-x-4">
              <InputFieldPP
                inputState={[batchSize, setBatchSize]}
                errorState={[batchSizeError, setBatchSizeError]}
                placeholderText="Loading..."
                title={`Batch Size`}
              />
              <DropdownPP
                selectValueState={[mode, setMode]}
                placeholderText="Loading..."
                errorState={[modeError, setModeError]}
                title="Available Mode"
                options={["Offline", "Online"]}
              />
            </div>
            <div className="flex flex-col lg:flex-row lg:space-x-4">
              <div className="lg:w-1/2">
                <TextAreaPP
                  inputState={[description, setDescription]}
                  errorState={[descriptionError, setDescriptionError]}
                  placeholderText="Loading..."
                  title={`Description`}
                />
              </div>
              <div className="flex flex-col items-start justify-center lg:w-1/2 space-y-4 pt-6">
                <label className="inline-block cursor-pointer">
                  <div className="flex bg-primary text-white space-x-2 rounded-lg px-4 py-2 items-center">
                    <AiOutlinePlus />
                    <p className="text-sm w-[15ch] text-left">Add Demo Video</p>
                  </div>
                  <input type="file" className="hidden" />
                </label>
                <label className="inline-block cursor-pointer">
                  <div className="flex bg-primary text-white space-x-2 rounded-lg px-4 py-2 items-center">
                    <AiOutlinePlus />
                    <p className="text-sm w-[15ch] text-left">Add Images</p>
                  </div>
                  <input type="file" className="hidden" />
                </label>
                <p className="text-xs text-ghost">
                  *Please add good quality images/videos only
                </p>
              </div>
            </div>

            <h2 className="font-medium text-gray mt-12">Price Details</h2>
            <div className="flex flex-col lg:flex-row lg:space-x-4">
              <InputFieldPP
                inputState={[basePrice, setBasePrice]}
                errorState={[basePriceError, setBasePriceError]}
                placeholderText="Loading..."
                title={`Base Price`}
              />
              <InputFieldPP
                inputState={[discount, setDiscount]}
                errorState={[discountError, setDiscountError]}
                placeholderText="Loading..."
                title={`Discount`}
              />
              <InputFieldPP
                inputState={[discountLimit, setDiscountLimit]}
                errorState={[discountLimitError, setDiscountLimitError]}
                placeholderText="Loading..."
                title={`Limit Price`}
              />
            </div>
            <div className="flex space-x-4">
              <DropdownPP
                selectValueState={[promoCode, setPromoCode]}
                placeholderText="Loading..."
                errorState={[promoCodeError, setPromoCodeError]}
                title="Promo Code"
                options={["None", "OSTELLO22"]}
              />
              <div className="flex flex-col w-fit lg:w-1/2 mt-[2rem]">
                <p className="font-bold text-slate text-sm">Effective Price</p>
                <div className="text-2xl text-green min-w-[8ch]">
                  &#8377;
                  {/^[0-9]+$/.test(discount) &&
                  /^[0-9]+$/.test(discountLimit) &&
                  /^[0-9]+$/.test(basePrice)
                    ? `${
                        (parseInt(basePrice) * parseInt(discount)) / 100 >
                        parseInt(discountLimit)
                          ? parseInt(basePrice) - parseInt(discountLimit)
                          : parseInt(basePrice) -
                            (parseInt(basePrice) * parseInt(discount)) / 100
                      }`
                    : `0`}
                  /-
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </form>
      <div className="flex space-x-4 items-center py-4 px-6">
        <button
          onClick={(e) => {
            handleDiscardInfo(e);
          }}
          className="px-4  text-sm py-2 border-primary text-primary border-2 w-1/2 rounded-lg"
        >
          Discard Information
        </button>
        <button
          onClick={(e) => handleSubmit(e)}
          className="px-4  text-sm py-2 border-primary bg-primary text-white border-2 w-1/2 rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </React.Fragment>
  );
};

export default EditCourse;
