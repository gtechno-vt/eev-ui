export const  isValidEmail = (email) =>  {
    return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email);
}
export const  isValidMobile = (phoneNumber) =>  {
    return /^[0-9]+$/.test(phoneNumber);
}