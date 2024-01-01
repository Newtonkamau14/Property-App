const Property = require("../models/property.model").Property;
const { Sequelize, Op } = require("sequelize");
const User = require("../models/user.model");

//Get home page
exports.getHomePage = async (req, res) => {
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

    res.render("home", {
      title: "Home",
      randproperties: randproperties,
      studioapt: studioapt,
      singlerms: singlerms,
      bedrooms: bedrooms,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get bedrooms
exports.getBedrooms = async (req, res) => {
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
      return res.status(404).json({ message: "Properties not found" });
    }
    res.render("bedrooms", {
      title: "1,2,3 Bedrooms",
      bedrooms: bedrooms,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get single rooms
exports.getSingleRoom = async (req, res) => {
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
      return res.status(404).json({ message: "Properties not found" });
    }
    res.render("singleroom", {
      title: "Single Rooms",
      singlerms: singlerms,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get studio
exports.getStudioApartment = async (req, res) => {
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
      return res.status(404).json({ message: "Properties not found" });
    }

    res.render("studioapartment", {
      title: "Studio Apartments",
      studioapt: studioapt,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Show property

exports.showProperty = async (req, res) => {
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

  res.render("showproperty", {
    title: "Show Property",
    property: property,
  });
  
};

//Search property
exports.userSearchProperty = async (req, res) => {
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

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
