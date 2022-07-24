import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../../utils/mongodb";
import { validateToken } from "../../../../../utils/jwt";
import { v4 as uuidv4 } from "uuid";
const handler = async (request, response) => {
  const { method } = request;
  try {
    switch (method) {
      case "POST":
        await validateToken(request);
        await createGuest(request, response);
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

const createGuest = async (request, response) => {
  const id = request.query;
  try {
    const { db } = await connectToDatabase();
    const newMember = { ...request.body.member, id: uuidv4() };

    const foundFamily = await db
      .collection("families")
      .findOne({ _id: ObjectId(id) });

    const updatedMemberList = { members: [...foundFamily.members, newMember] };

    const updatedFamily = await db
      .collection("families")
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { ...updatedMemberList } },
        { new: true }
      );
    response.status(201).json({
      statusCode: 201,
      family: { ...updatedFamily.value, ...updatedMemberList },
    });
  } catch (error) {
    throw new Object({ statusCode: 404, message: "Family not found" });
  }
};
