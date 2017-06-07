export const hasCookie = (name) => {
  const pairs = document.cookie.split(";");

  for ( let i = 0; i < pairs.length; ++i ) {
    if (pairs[i].split("=")[0].trim() === name) return true;
  }
  return false;
};
