import bcrypt from "bcrypt";

async function passwordHandling(data) {
  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, 13);
    data.password = hashedPassword;
    return data;
  }

  return data;
}

export default passwordHandling;
