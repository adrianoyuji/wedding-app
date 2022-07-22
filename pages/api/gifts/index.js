import Gift from "../../../models/Gift";
import { connectToDatabase } from "../../../utils/mongodb";
import createGiftSchema from "../../../schemas/GiftSchema";
import { validateToken } from "../../../utils/jwt";

const handler = async (request, response) => {
  const { method } = request;
  try {
    switch (method) {
      case "GET":
        await getGifts(response);
        break;
      case "POST":
        await validateToken(request);
        await createGift(request, response);
        break;
      default:
        response
          .status(400)
          .json({ statusCode: 400, message: "invalid method" });
        break;
    }
  } catch (err) {
    console.log(err);
    response
      .status(err.statusCode || 500)
      .json({ statusCode: err.statusCode || 500, message: err.message });
  }
};

export default handler;

const getGifts = async (response) => {
  const { db } = await connectToDatabase();
  const gifts = await db.collection("gifts").find().toArray();

  response.status(200).json({ statusCode: 200, gifts });
};

const createGift = async (request, response) => {
  const { db } = await connectToDatabase();

  try {
    const validGift = createGiftSchema.validate(request.body);
    const gift = new Gift({ ...validGift.value });
    await db.collection("gifts").insertOne(gift);
    response.status(201).json({ statusCode: 201, gift });
  } catch (error) {
    throw new Object({ statusCode: 400, message: error.details[0].message });
  }
};
