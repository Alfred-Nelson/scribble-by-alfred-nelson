const setToLocalStorage = ({ authToken, site }) => {
  if (authToken !== undefined) {
    sessionStorage.setItem("authToken", JSON.stringify(authToken));
  }

  if (site !== undefined) {
    sessionStorage.setItem("site", JSON.stringify(site));
  }
};

const getFromLocalStorage = key => {
  let storedValue = null;
  try {
    storedValue = JSON.parse(sessionStorage.getItem(key));
  } catch (error) {
    sessionStorage.setItem(key, JSON.stringify(null));
    logger.error(error);
  }
  return storedValue;
};

export { setToLocalStorage, getFromLocalStorage };
