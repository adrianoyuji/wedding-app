import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../utils/mongodb";
const handler = async (request, response) => {
  const { method } = request;
  try {
    switch (method) {
      case "PUT":
        await confirmMembers(request, response);
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

const confirmMembers = async (request, response) => {
  const { id } = request.query;
  try {
    const { db } = await connectToDatabase();
    const members = [...request.body.members];
    await db
      .collection("families")
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { members } },
        { new: true }
      );
    response.status(201).end();
  } catch (error) {
    throw new Object({ statusCode: 404, message: "Family not found" });
  }
};
