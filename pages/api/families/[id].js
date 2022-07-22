import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../utils/mongodb";
import { validateToken } from "../../../utils/jwt";

const handler = async (request, response) => {
  const { method } = request;
  try {
    switch (method) {
      case "GET":
        await getFamily(request, response);
        break;
      case "DELETE":
        await validateToken(request);
        await deleteFamily(request, response);
        break;
      case "PUT":
        await validateToken(request);
        await updateFamily(request, response);
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

const getFamily = async (request, response) => {
  const { id } = request.query;
  try {
    const { db } = await connectToDatabase();
    const family = await db
      .collection("families")
      .findOne({ _id: ObjectId(id) });
    if (!family)
      throw new Object({ statusCode: 404, message: "Family not found" });
    response.status(200).json({ statusCode: 200, family });
  } catch (error) {
    throw new Object({ statusCode: 404, message: "Family not found" });
  }
};

const updateFamily = async (request, response) => {
  const { id } = request.query;
  try {
    const { db } = await connectToDatabase();
    const updates = request.body;
    const updatedGift = await db
      .collection("families")
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { ...updates } },
        { new: true }
      );
    response
      .status(201)
      .json({ statusCode: 201, family: { ...updatedGift.value, ...updates } });
  } catch (error) {
    throw new Object({ statusCode: 404, message: "Family not found" });
  }
};

const deleteFamily = async (request, response) => {
  const { id } = request.query;
  try {
    const { db } = await connectToDatabase();
    await db.collection("families").deleteOne({ _id: ObjectId(id) });
    response
      .status(204)
      .json({ statusCode: 204, message: "Succesfully deleted" });
  } catch (error) {
    throw new Object({ statusCode: 404, message: "Family not found" });
  }
};
