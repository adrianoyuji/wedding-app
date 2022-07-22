import { verify } from "jsonwebtoken";

const validateToken = async (request) => {
  try {
    const token = request.headers["authorization"];

    if (!token) {
      throw new Object({ statusCode: 401, message: "Token Inválido." });
    }
    const verified = verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET || ""
    );
    if (verified) {
      return true;
    } else {
      throw new Object({ statusCode: 401, message: "Sessão expirada." });
    }
  } catch (error) {
    throw new Object({ statusCode: error.statusCode, message: error.message });
  }
};

export { validateToken };
