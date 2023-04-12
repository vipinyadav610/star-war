// for serializing the object to query string
const serialize = (obj = {}) => {
  return Object.keys(obj).length
    ? "?" +
        Object.keys(obj)
          .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
          .join("&")
    : "";
};

// this will convert object to form data
const getFormData = (object = {}) => {
  const formData = new FormData();
  Object.entries(object).forEach(([key, value]) => formData.append(key, value));
  return formData;
};

// this method return stringify payload
const postBody = (data = {}) => {
  const dataNew = data || {};
  Object.keys(dataNew).forEach((key) => {
    if (dataNew[key] === undefined) {
      delete dataNew[key];
    }
  });

  return JSON.stringify(dataNew);
};

export const get = (url, options = {}, data) => {
  return fetch(url + serialize(data), {
    method: "GET",
    ...options,
  })
    .then((response) => response.json())
    .then((res) => res);
};

export const post = (url, data, type) => {
  return fetch(url, {
    method: "POST",
    body: type === "form" ? getFormData(data) : postBody(data),
  }).then((response) => response.json());
};
