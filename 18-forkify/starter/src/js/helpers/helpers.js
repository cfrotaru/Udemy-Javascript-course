import { TIMEOUT_SEC } from '../config/config';
import { async } from 'regenerator-runtime';
export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
};
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    };
    const res = await Promise.race([
      fetch(url, fetchOptions),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const saveToLocalStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = function (key) {
  return JSON.parse(localStorage.getItem(key));
};
