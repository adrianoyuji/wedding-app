import { ObjectId } from "mongodb";
import { validateToken } from "../../../../../utils/jwt";
import { connectToDatabase } from "../../../../../utils/mongodb";
const handler = async (request, response) => {
  const { method } = request;
  try {
    switch (method) {
      case "DELETE":
        await validateToken(request);
        await deleteGuest(request, response);
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

const deleteGuest = async (request, response) => {
  const { id, memberId } = request.query;
  try {
    const { db } = await connectToDatabase();
    const family = await db
      .collection("families")
      .findOne({ _id: ObjectId(id) });
    await db.collection("families").findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        $set: {
          members: family.members.filter((member) => member.id !== memberId),
        },
      }
    );
    response.status(204).end();
  } catch (error) {
    throw new Object({ statusCode: 404, message: "Family not found" });
  }
};
