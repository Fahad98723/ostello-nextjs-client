export const titleToUrl = (title) =>
  title
    ?.trim()
    .toLowerCase()
    .replaceAll(" ", "-")
    .replace(/&/g, "and")
    .replaceAll("/", "-or-");
export const urlToTitle = (title) =>
  capitalizeFirstLetter(title).replaceAll("-", " ");
export const randomShuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
export const hasMin8 = (value) => value.length >= 8;

export const capitalize = str => 
str.replace(/\b([a-zÁ-ú]{3,})/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));

export const hasUppercase = (value) => /[A-Z]/.test(value);
export const hasSpecialChar = (value) =>
  // eslint-disable-next-line no-useless-escape
  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
export const hasNumber = (value) => /[0-9]/.test(value);

export const isEmptyObj = (obj) => Object?.keys(obj)?.length === 0;

export const phoneNumberToNumber = (phoneNumber) =>
  parseInt(phoneNumber.replace(/\s/g, ""));
let navigator;

if (typeof window !== "undefined") {
  navigator = window.navigator;
}

export const capitalizeFirstLetter = (
  [first, ...rest],
  locale = navigator?.language
) => first?.toLocaleUpperCase(locale) + rest.join("");

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("ACCESS_TOKEN");
  }
  return null;
};

export const headers = {
  "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${getAccessToken()}`,
};

export const isEmpty = (value) => {
  if (typeof value === "number" && value !== 0) {
    return false;
  }
  return (
    value === null ||
    value === "" ||
    value === undefined ||
    value === 0 ||
    value?.length === 0 ||
    isEmptyObj(value)
  );
};

export const FilterImagesAndVideos = ({ filesArray, setImages, setVideos }) => {
  Object.values(filesArray).forEach((item) => {
    if (item.type.toLowerCase().includes("video")) {
      console.log("Its a video");
      setVideos((prev) => (!isEmpty(prev) ? [...prev, item] : [item]));
    }
    if (item.type.toLowerCase().includes("image")) {
      console.log("its an image");
      setImages((prev) => (!isEmpty(prev) ? [...prev, item] : [item]));
    }
  });
};
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const downloadPdfDocument = (rootElementId, fileName) => {
  const input = document.getElementById(rootElementId);
  html2canvas(input)
    .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save(`${fileName}.pdf`);
    })
}
export const extractISOString = (string) => {
  const d = new Date(string?.slice(0, -1));
  const [day, month, date, year, time] = [
    d.getDay(),
    d.getMonth(),
    d.getDate(),
    d.getFullYear(),
    d.getTime(),
  ];
  return {
    day,
    month,
    date,
    year,
    time,
    formatted: d,
  };
};

import { useState } from "react";
import SHA256 from "crypto-js/sha256";
import { socket } from "./socket";

// blog reading time
export function readingTime(text) {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
}

// date format
export function makeDateFormat(timestamp) {
  const date = new Date(timestamp);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const blogDate =
    date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();
  return blogDate;
}

// get video duration
export function getVideoDuration(useRef) {
  const video = useRef.current;
  if (!video) return;
  return Math.ceil(secToMinConvert(video.duration));
}

// sec to min convert
export function secToMinConvert(sec) {
  const minutes = (1 / 60) * sec;
  return minutes;
}

export const ReadMoreComponent = ({
  text,
  percentOfLessShow = 50,
  className = "",
  toggleClass,
}) => {
  const [show, setShow] = useState(false);
  const lengthOfText = text?.length;
  const lessShowCharactersCount = Math.round(
    (lengthOfText * percentOfLessShow) / 100
  );

  return (
    <>
      <div className={className}>
        <p>
          {" "}
          {show ? text : text.slice(0, lessShowCharactersCount)}{" "}
          <span className={toggleClass} onClick={() => setShow(!show)}>
            {show ? "Read Less" : "Read More"}
          </span>{" "}
        </p>
      </div>
    </>
  );
};

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export const isJsonParsable = (string) => {
  if (isEmpty(string)) {
    return false;
  } else {
    try {
      JSON.parse(string);
      return true;
    } catch (err) {
      return false;
    }
  }
};

export const SafelyParseJSON = async () => {
  let parsedJSON;
  try {
    parsedJSON = await JSON.parse(string);
  } catch (err) {
    parsedJSON = null;
  }
  return parsedJSON;
};

const CHUNK_SIZE = 1e6;

function uploadChunk(id, file, i, chunkCount) {
  const BEGINNING_OF_CHUNK = CHUNK_SIZE * i;
  const ENDING_OF_CHUNK = BEGINNING_OF_CHUNK + CHUNK_SIZE;

  const chunk = file.slice(BEGINNING_OF_CHUNK, ENDING_OF_CHUNK);
  const checksum = SHA256(chunk).toString();
  const progressPercentage = Math.round((i / chunkCount) * 100);

  return new Promise((resolve, reject) => {
    socket.emit("send_file_chunk", {
      id,
      chunk,
      checksum,
      counter: i,
      progressPercentage,
    });

    socket
      .off("ack_send_file_chunk")
      .on("ack_send_file_chunk", async ({ id, counter, chunkRecieved }) => {
        if (!chunkRecieved) {
          console.log("Chunk failed at " + counter);
          reject({ error: "Failed!" });
        } else resolve({ message: "Success!" });
      });
  });
}

function handleFile(file) {
  console.log(file);
  const chunkCount =
    file.size % CHUNK_SIZE === 0
      ? file.size / CHUNK_SIZE
      : Math.floor(file.size / CHUNK_SIZE) + 1;

  console.log(chunkCount, "chunkCount");
  console.log(file, "file");

  return new Promise((resolve, reject) => {
    const nameParts = file?.name?.split(".");

    if (socket) {
      socket.emit("create_file", {
        name: `${Date.now().toString()}.${nameParts[nameParts.length - 1]}`,
        type: file.type,
        size: file.size,
        chunklength: chunkCount,
      });

      socket
        .off("ack_create_file")
        .on("ack_create_file", async ({ id, status, message }) => {
          let i = 0;

          while (i < chunkCount) {
            const { message, error } = await uploadChunk(
              id,
              file,
              i,
              chunkCount
            );

            if (error) continue;
            else {
              console.log(message);
              i++;
            }
          }

          socket.emit("file_sent", {
            id,
          });
        });

      // Recieving End
      socket.off("file_received").on("file_received", (data) => {
        console.log(data);
      });

      socket.off("file_written").on("file_written", (data) => {
        console.log(data);
      });

      socket.off("file_compressed").on("file_compressed", (data) => {
        console.log(data);
        resolve(data);
      });

      socket.off("error").on("error", (err) => {
        console.error(err);
        reject(err);
      });
    }
  });
}

export const SocketFileUploader = async (filesArray = []) => {
  return new Promise(async (resolve, reject) => {
    const resultArray = [];

    try {
      for (let i = 0; i < filesArray.length; i++) {
        const res = await handleFile(filesArray[i]);
        console.log(res, "res");
        resultArray.push(res.message);
      }

      resolve(resultArray);
    } catch (err) {
      reject(err);
    }
  });
};

export const isEqual = (a, b) => {
  let A = JSON.stringify(a);
  let B = JSON.stringify(b);
  return A === B;
};

export const Console = (title, ...rest) => {
  return console.log(`%c ${title} --> `, rest, "color:blue; font-size:20px");
};
