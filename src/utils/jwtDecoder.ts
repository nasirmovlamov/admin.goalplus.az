export const jwtDecode = (token: string): any => {
  const middlePartOfToken = token.split(".")[1];
  const base64ToString = atob(middlePartOfToken);
  const tokenData = JSON.parse(base64ToString);
  return tokenData;
};
