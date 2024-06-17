import mongoose from "mongoose";

export const conectMongo = async () => {
  const con = await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connected"))
    .catch((error) => console.log(error));
};
