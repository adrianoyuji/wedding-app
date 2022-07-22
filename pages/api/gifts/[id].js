import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../utils/mongodb";
import { validateToken } from "../../../utils/jwt";

const handler = async (request, response) => {
  const { method } = request;
  try {
    switch (method) {
      case "GET":
        await getGift(request, response);
        break;
      case "DELETE":
        await validateToken(request);
        await deleteGift(request, response);
        break;
      case "PUT":
        await validateToken(request);
        await updateGift(request, response);
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

const getGift = async (request, response) => {
  const { id } = request.query;
  try {
    const { db } = await connectToDatabase();
    const gift = await db.collection("gifts").findOne({ _id: ObjectId(id) });
    if (!gift) throw new Object({ statusCode: 404, message: "Gift not found" });
    response.status(200).json({ statusCode: 200, gift });
  } catch (error) {
    throw new Object({ statusCode: 404, message: "Gift not found" });
  }
};

const updateGift = async (request, response) => {
  const { id } = request.query;
  try {
    const { db } = await connectToDatabase();
    const updates = request.body;
    const updatedGift = await db
      .collection("gifts")
      .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { ...updates } });
    response
      .status(201)
      .json({ statusCode: 201, gift: { ...updatedGift.value, ...updates } });
  } catch (error) {
    throw new Object({ statusCode: 404, message: "Gift not found" });
  }
};

const deleteGift = async (request, response) => {
  const { id } = request.query;
  try {
    const { db } = await connectToDatabase();
    await db.collection("gifts").deleteOne({ _id: ObjectId(id) });
    response
      .status(204)
      .json({ statusCode: 204, message: "Succesfully deleted" });
  } catch (error) {
    throw new Object({ statusCode: 404, message: "Gift not found" });
  }
};
