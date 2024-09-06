import { Op, Sequelize } from "sequelize";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { Property } from "../models/property.model";
import { Storage } from "@google-cloud/storage";
import path from "path";
import { format } from "util";

const gc = new Storage({
  projectId: "property-app-382708",
  keyFilename: path.join(
    __dirname,
    "../config/property-app-382708-b32d8467c05c.json"
  ),
});

const propertyAppBucket = gc.bucket("property_app");

//Get Admin page
const getAdminPanel: RequestHandler = async (req: Request, res: Response) => {
  try {
    const properties = await Property.findAll({
      attributes: [
        "property_name",
        "property_location",
        "property_price",
        "property_image",
        "property_type",
        "property_purpose",
        "availability",
        "geometry",
      ],
      order: Sequelize.fn("RAND"),
    });

    if (!properties || properties.length === 0) {
      return res.status(404).json({
        message: "Properties not found",
      });
    }
    return res.status(200).json({
      properties: properties,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Get bedrooms
const getBedroomAdmin: RequestHandler = async (req: Request, res: Response) => {
  try {
    const bedrooms = await Property.findAll({
      where: {
        property_type: "1,2,3 Bedrooms",
      },
    });
    if (!bedrooms || bedrooms.length === 0) {
      return res.status(404).json({
        message: "Properties not found",
      });
    }
    return res.status(200).json({
      bedrooms: bedrooms,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Get studio apartments
const getStudioAdmin: RequestHandler = async (req: Request, res: Response) => {
  try {
    const studioapt = await Property.findAll({
      where: {
        property_type: "Studio Apartments",
      },
    });
    if (!studioapt || studioapt.length === 0) {
      return res.status(404).json({
        message: "Properties not found",
      });
    }

    return res.status(200).json({
      studioapt: studioapt,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Get single rooms
const getSingleAdmin: RequestHandler = async (req: Request, res: Response) => {
  try {
    const singlerms = await Property.findAll({
      where: {
        property_type: "Single Rooms",
      },
    });

    if (!singlerms || singlerms.length === 0) {
      return res.status(404).json({
        message: "Properties not found",
      });
    }
    return res.status(200).json({
      singlerms: singlerms,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Add Property
const addProperty: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate property fields if empty
    if (
      !req.body.property_name ||
      !req.body.property_location ||
      !req.body.property_type ||
      !req.body.property_purpose ||
      !req.file
    ) {
      return res
        .status(400)
        .json({ message: "Missing required fields in the form" });
    }

    const blob = propertyAppBucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
      next(err);
    });

    blobStream.on("finish", async () => {
      try {
        const publicUrl = format(
          `https://storage.googleapis.com/${propertyAppBucket.name}/${blob.name}`
        );

        let formattedPrice = req.body.property_price;
        let KeShilling = new Intl.NumberFormat("en-UK", {
          style: "currency",
          currency: "KES",
        });

        KeShilling.format(formattedPrice);

        const point = {
          type: "Point",
          coordinates: [
            parseFloat(req.body.longitude),
            parseFloat(req.body.latitude),
          ],
        };

        // Check if property exists
        const property = await Property.findOne({
          where: {
            property_name: req.body.property_name,
          },
        });

        if (property) {
          return res.status(400).json({ message: "Property already exists." });
        }

        // Create the property
        const newProperty = await Property.create({
          property_name: req.body.property_name,
          property_location: req.body.property_location,
          property_price: formattedPrice,
          property_image: publicUrl,
          property_type: req.body.property_type,
          property_purpose: req.body.property_purpose,
          geometry: point,
          user_id: req.user?.user_id,
        });

        return res.status(201).json({ message: "Property added successfully" });
      } catch (error) {
        console.error("Error creating property:", error);
        next(error);
      }
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error("Error during file upload:", error);
    return res.status(500).json({
      message: "Failed to add property",
    });
  }
};

const editProperty: RequestHandler = async (req: Request, res: Response) => {
  const {
    property_name,
    property_location,
    property_price,
    property_type,
    property_purpose,
  } = req.body;
  const property_id = req.params.property_id;

  try {
    // Find the property by primary key (assuming `property_id` is the primary key)
    const existingProperty = await Property.findOne({
      where: { property_id: property_id },
    });

    if (!existingProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    const priceRegex = /^-?\d+(\.\d+)?$/;

    if (property_price !== undefined) {
      if (!priceRegex.test(property_price)) {
        return res.status(400).json({ message: "Please enter a valid price." });
      } else {
        // Format the price for display purposes
        let formattedPrice = parseFloat(property_price);
        let KeShilling = new Intl.NumberFormat("en-UK", {
          style: "currency",
          currency: "KES",
        });
        existingProperty.property_price = formattedPrice; // Store the numeric price
      }
    }

    if (property_name !== undefined) {
      existingProperty.property_name = property_name;
    }
    if (property_location !== undefined) {
      existingProperty.property_location = property_location;
    }
    if (property_type !== undefined) {
      existingProperty.property_type = property_type;
    }
    if (property_purpose !== undefined) {
      existingProperty.property_purpose = property_purpose;
    }

    await existingProperty.save();
    return res.status(200).redirect("/admin");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Delete Property
const deleteProperty: RequestHandler = async (req: Request, res: Response) => {
  try {
    const deletedCount = await Property.destroy({
      where: {
        property_id: req.params.property_id,
      },
    });

    // Check if the property was deleted
    if (deletedCount === 0) {
      return res.status(404).json({ message: "Property not found" });
    }
    return res.status(200).json({ message: "Property was deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Search property
const searchProperty: RequestHandler = async (req: Request, res: Response) => {
  let searchQuery = req.query.search;

  try {
    //validate search field is empty
    if (!searchQuery) {
      res.status(400).json({ message: "Missing required fields in the form" });
      return;
    }

    const properties = await Property.findAll({
      attributes: [
        "property_id",
        "property_name",
        "property_location",
        "property_price",
        "property_image",
        "property_purpose",
        "geometry",
      ],
      where: {
        [Op.or]: [
          {
            property_name: {
              [Op.like]: `%${searchQuery}%`,
            },
          },
          {
            property_location: {
              [Op.like]: `%${searchQuery}%`,
            },
          },
          {
            property_purpose: {
              [Op.like]: `%${searchQuery}%`,
            },
          },
          {
            property_type: {
              [Op.like]: `%${searchQuery}%`,
            },
          },
        ],
      },
    });

    if (!properties || properties.length === 0) {
      return res
        .status(404)
        .json({ message: "No properties found matching your search" });
    }

    return res.status(200).json({
      properties: properties,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getAdminPanel,
  getBedroomAdmin,
  getStudioAdmin,
  getSingleAdmin,
  addProperty,
  editProperty,
  deleteProperty,
  searchProperty,
};
