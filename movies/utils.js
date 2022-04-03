//ADD DELAY TO A FUNCTION
const debounce = (cb, delay = 1000) => {
  let timeoutId;
  return (...arg) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    //DO NOT FETCH WHILE TYPING. APPLY WILL COUNT HOW MANY ARGS WERE PASSED
    timeoutId = setTimeout(() => cb.apply(null, arg), delay);
  };
};

function convertToInternationalCurrencySystem(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(labelValue));
}

//https://api.themoviedb.org/3/movie/343611?api_key={api_key}
const fetchData = async (url, val) => {
  const params = {};

  params.api_key = process.env.THEMOVIEDB_API_KEY;
  if (val) {
    params.query = val;
  }

  const { data } = await axios.get(`https://api.themoviedb.org/3${url}`, {
    params,
  });
  // console.log(data);
  return data;
};
