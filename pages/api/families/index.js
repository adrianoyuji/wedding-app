import Family from "../../../models/Family";
import { connectToDatabase } from "../../../utils/mongodb";
import createFamilySchema from "../../../schemas/FamilySchema";

const handler = async (request, response) => {
  const { method } = request;
  try {
    switch (method) {
      case "GET":
        await getFamily(response);
        break;
      case "POST":
        await createFamily(request, response);
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

const getFamily = async (response) => {
  const { db } = await connectToDatabase();
  const families = await db.collection("families").find().toArray();

  response.status(200).json({ statusCode: 200, families });
};

const createFamily = async (request, response) => {
  const { db } = await connectToDatabase();

  try {
    const validFamily = createFamilySchema.validate(request.body);
    const family = new Family({ ...validFamily.value });
    await db.collection("families").insertOne(family);
    response.status(201).json({ statusCode: 201, family });
  } catch (error) {
    throw new Object({ statusCode: 400, message: error.details[0].message });
  }
};
