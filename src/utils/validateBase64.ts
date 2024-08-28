export const validateBase64 = (str: string): boolean => {
    const base64Regex = /^data:image\/(png|jpeg);base64,[A-Za-z0-9+/]+={0,2}$/;
    return base64Regex.test(str);
  };
  