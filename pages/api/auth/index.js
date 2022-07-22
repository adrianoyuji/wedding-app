import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { connectToDatabase } from "../../../utils/mongodb";
import { ObjectId } from "mongodb";

const handler = async (request, response) => {
  const { method } = request;

  try {
    switch (method) {
      case "POST":
        await login(request, response);
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

const login = async (request, response) => {
  const { db } = await connectToDatabase();
  const { email, password } = request.body;

  if (!email || !password) {
    throw new Object({ statusCode: 400, message: "Insira email e/ou senha" });
  }

  const user = await db.collection("users").findOne({ email });

  if (!user) {
    throw new Object({ statusCode: 400, message: "Email ou senha inválidos" });
  }

  const passwordMatched = await bcrypt.compare(password, user.password);

  if (!passwordMatched) {
    throw new Object({ statusCode: 400, message: "Email ou senha inválidos" });
  }

  const token = sign({ id: user.id }, process.env.JWT_SECRET || "", {
    subject: user._id.toString(),
    expiresIn: "4h",
  });

  delete user["password"];

  response.status(200).json({
    statusCode: 200,
    user,
    token,
  });
};
