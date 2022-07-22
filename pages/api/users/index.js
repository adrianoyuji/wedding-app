import bcrypt from "bcrypt";
import { connectToDatabase } from "../../../utils/mongodb";
import User from "../../../models/User";
const handler = async (request, response) => {
  const { method } = request;

  try {
    switch (method) {
      case "POST":
        await createUser(request, response);
        break;
      default:
        response
          .status(400)
          .json({ statusCode: 400, message: "invalid method" });
        break;
    }
  } catch (err) {
    response
      .status(err.statusCode || 500)
      .json({ statusCode: err.statusCode || 500, message: err.message });
  }
};

export default handler;

const createUser = async (request, response) => {
  const { name, email, password } = request.body;
  const { db } = await connectToDatabase();
  const checkUserExists = await db.collection("users").findOne({ email });
  if (checkUserExists) {
    throw new Object({ statusCode: 409, message: "Usuário já cadastrado" });
  }
  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ name, email, password: hashedPassword });
  console.log(newUser);
  await db.collection("users").insertOne(newUser);

  response.status(201).json({ statusCode: 201, data: { newUser } });
};
