import { Request, RequestHandler, Response } from "express";
import { Sequelize, Op } from "sequelize";
import { Property } from "../models/property.model";
import { User } from "../models/user.model";

//Get home page
const getHomePage: RequestHandler = async (req: Request, res: Response) => {
  try {
    const randproperties = await Property.findAll({
      attributes: [
        "property_id",
        "property_name",
        "property_location",
        "property_price",
        "property_image",
        "property_purpose",
        "geometry",
        "createdAt",
      ],
      limit: 8,
      order: Sequelize.literal("rand()"),
    });

    const studioapt = await Property.findAll({
      attributes: [
        "property_id",
        "property_name",
        "property_location",
        "property_price",
        "property_image",
        "property_purpose",
        "geometry",
        "createdAt",
      ],
      where: {
        property_type: "Studio Apartments",
      },
    });

    const singlerms = await Property.findAll({
      attributes: [
        "property_id",
        "property_name",
        "property_location",
        "property_price",
        "property_image",
        "property_purpose",
        "geometry",
        "createdAt",
      ],
      where: {
        property_type: "Single Rooms",
      },
    });

    const bedrooms = await Property.findAll({
      attributes: [
        "property_id",
        "property_name",
        "property_location",
        "property_price",
        "property_image",
        "property_purpose",
        "geometry",
        "createdAt",
      ],
      where: {
        property_type: "1,2,3 Bedrooms",
      },
    });

    return res.status(200).json({
      randproperties: randproperties,
      studioapt: studioapt,
      singlerms: singlerms,
      bedrooms: bedrooms,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Get bedrooms
const getBedrooms: RequestHandler = async (req: Request, res: Response) => {
  try {
    const bedrooms = await Property.findAll({
      attributes: [
        "property_id",
        "property_name",
        "property_location",
        "property_price",
        "property_image",
        "property_purpose",
        "geometry",
        "createdAt",
      ],
      where: {
        property_type: "1,2,3 Bedrooms",
      },
    });
    if (!bedrooms || bedrooms.length === 0) {
      return res.status(404).json({
        message: "Properties not found",
      });
    }
    return res.status(200).json({ bedrooms: bedrooms });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Get single rooms
const getSingleRoom: RequestHandler = async (req: Request, res: Response) => {
  try {
    const singlerms = await Property.findAll({
      attributes: [
        "property_id",
        "property_name",
        "property_location",
        "property_price",
        "property_image",
        "property_purpose",
        "geometry",
        "createdAt",
      ],
      where: {
        property_type: "Single Rooms",
      },
    });

    if (!singlerms || singlerms.length === 0) {
      return res.status(404).json({
        message: "Properties not found",
      });
    }
    return res.status(200).json({ singlerms: singlerms });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Get studio
const getStudioApartment: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const studioapt = await Property.findAll({
      attributes: [
        "property_id",
        "property_name",
        "property_location",
        "property_price",
        "property_image",
        "property_purpose",
        "geometry",
        "createdAt",
      ],
      where: {
        property_type: "Studio Apartments",
      },
    });
    if (!studioapt || studioapt.length === 0) {
      return res.status(404).render("studioapartment", {
        title: "Studio Apartments",
        studioapt: studioapt,
        message: "Properties not found",
      });
    }

    return res.status(200).json({ studioapt: studioapt });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Show property

const showProperty: RequestHandler = async (req: Request, res: Response) => {
  const property = await Property.findOne({
    attributes: [
      "property_id",
      "property_name",
      "property_location",
      "property_price",
      "property_image",
      "property_purpose",
      "geometry",
      "createdAt",
    ],
    where: {
      property_id: req.params.property_id,
    },
  });

  /*   // Define tile URL template
  const urlTemplate = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  // Create the tile layer object
  const tileLayer = L.tileLayer(urlTemplate, {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  });


  //order is long lat
  let marker = L.marker([]);
  let popup = L.popup()
    .setLatLng([])
    .setContent() */

  return res.status(200).json({ property: property });
};

//Search property
const userSearchProperty: RequestHandler = async (
  req: Request,
  res: Response
) => {
  let searchQuery = req.query.searchproperty;

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
        "createdAt",
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

    return res.status(200).json({ properties: properties });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getHomePage,
  getBedrooms,
  getSingleRoom,
  getStudioApartment,
  showProperty,
  userSearchProperty,
};
