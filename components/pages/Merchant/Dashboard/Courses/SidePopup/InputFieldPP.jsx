import React from "react";

const InputFieldPP = ({
  inputState,
  placeholderText,
  className = "",
  errorState,
  title,
}) => {
  const [error, setError] = errorState;
  const [inputValue, setInputValue] = inputState;

  //   useEffect(() => {
  //       setError("afdsfs")
  //   }, [])

  return (
    <div className="flex-col flex w-full my-4 transition-all">
      <h2 className="font-medium mb-2 text-sm">{title}</h2>
      <div
        className={`${className}  px-4 py-2 w-full rounded-lg text-base font-normal text-slate bg-cloud bg-clip-padding bg-no-repeat border-2 border-solid ${
          error.length !== 0 ? "border-red" : "border-cloud"
        } first-letter:transition ease-in-out m-0`}
      >
        <input
          type="text"
          className="text-slate text-sm bg-transparent placeholder-ghost w-full focus:outline-none"
          value={inputValue}
          onChange={(e) => {
            e.preventDefault();
            setInputValue(e.target.value);
            setError("");
          }}
          placeholder={placeholderText}
        />
      </div>
      {error.length > 0 && (
        <p className="w-full mt-1 text-xs text-right text-[#FF0000]">{error}</p>
      )}
    </div>
  );
};

export default InputFieldPP;
