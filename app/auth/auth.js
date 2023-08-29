"use client";
const CryptoJS = require("crypto-js");
export function checkHostProperty() {
  const userData = localStorage.getItem("userData");
  const encryptionKey = "user";

  const decryptedData = CryptoJS.AES.decrypt(userData, encryptionKey).toString(
    CryptoJS.enc.Utf8
  );

  const decryptedObject = JSON.parse(decryptedData);
  console.log(decryptedObject);
  console.log(userData);
  console.log(decryptedData);

  if (decryptedObject.role === "ADMIN") {
    return true;
  }

  return false;
}

export function checkHostPropertyAnf() {
  const userData = localStorage.getItem("userData");
  const encryptionKey = "user";
  const decryptedData = CryptoJS.AES.decrypt(userData, encryptionKey).toString(
    CryptoJS.enc.Utf8
  );
  const decryptedObject = JSON.parse(decryptedData);
  console.log(decryptedObject);
  console.log(userData);
  console.log(decryptedData);
  if (decryptedObject.role === "ANFITRION") {
    return true;
  }

  return false;
}

export function getUser() {
  const userData = localStorage.getItem("userData");

  if (!userData) {
    return {};
  }

  const user = JSON.parse(userData);
  console.log(user);

  return user;
}
