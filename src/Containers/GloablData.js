function currentUserInfo() {
  const selecteduserString = localStorage.getItem("userDetails");
  console.log("userString", selecteduserString);
  return selecteduserString;
}

export default currentUserInfo;
