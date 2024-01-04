const { Op } = require("sequelize");
const Property = require("../models/property.model").Property;
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const { format } = require("util");

const gc = new Storage({
  projectId: "property-app-382708",
  keyFilename: path.join(
    __dirname,
    "../../config/property-app-382708-b32d8467c05c.json"
  ),
});

const propertyAppBucket = gc.bucket("property_app");

//Get Admin page
const getAdminPanel = async (req, res) => {
  try {
    const properties = await Property.findAll();

    // if (!properties || properties.length === 0) {
    //   return res.status(404).json({ message: "Properties not found" });
    // }
    res.render("adminpanel", {
      layout: "layouts/adminlayout",
      title: "Admin Panel",
      properties: properties,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get Add property page
const getAddPropertyPage = async (req, res) => {
  res.render("addproperty", {
    layout: "layouts/adminlayout",
    title: "Add Property",
  });
};

//Get bedrooms
const getBedroomAdmin = async (req, res) => {
  try {
    const bedrooms = await Property.findAll({
      where: {
        property_type: "1,2,3 Bedrooms",
      },
    });
    if (!bedrooms || bedrooms.length === 0) {
      return res.status(404).json({ message: "Properties not found" });
    }
    res.render("adminbedrooms", {
      layout: "layouts/adminlayout",
      title: "1,2,3 Bedrooms",
      bedrooms: bedrooms,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get studio apartments
const getStudioAdmin = async (req, res) => {
  try {
    const studioapt = await Property.findAll({
      where: {
        property_type: "Studio Apartments",
      },
    });
    if (!studioapt || studioapt.length === 0) {
      return res.status(404).json({ message: "Properties not found" });
    }

    res.render("adminstudioapartments", {
      layout: "layouts/adminlayout",
      title: "Studio Apartments",
      studioapt: studioapt,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get single rooms
const getSingleAdmin = async (req, res) => {
  try {
    const singlerms = await Property.findAll({
      where: {
        property_type: "Single Rooms",
      },
    });

    if (!singlerms || singlerms.length === 0) {
      return res.status(404).json({ message: "Properties not found" });
    }
    res.render("adminsingleroom", {
      layout: "layouts/adminlayout",
      title: "Single Rooms",
      singlerms: singlerms,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Add Property
const addProperty = async (req, res, next) => {
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
          user_id: req.user.user_id,
        });

        res.status(201).redirect("/admin");
      } catch (error) {
        console.error("Error creating property:", error);
        next(error);
      }
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).render("addproperty", {
      layout: "layouts/adminlayout",
      title: "Add Property",
    });
  }
};

//Get Edit Page
const getEditPropertyPage = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.property_id);
    res.render("editproperty", {
      layout: "layouts/adminlayout",
      title: "Edit Property",
      property: property,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Edit Property
const editProperty = async (req, res) => {
  try {
    const updatedProperty = await Property.update(
      {
        property_name: req.body.property_name,
        property_price: req.body.property_price,
        property_image: req.body.property_image,
        property_purpose: req.body.property_purpose,
      },
      {
        where: {
          property_id: req.params.property_id,
        },
      }
    );

    if (updatedProperty === 0) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).redirect("/admin");
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Delete Property
const deleteProperty = async (req, res) => {
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
    res.status(200).redirect("/admin");
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Search property
const searchProperty = async (req, res) => {
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

    res.render("adminpanel", {
      layout: "layouts/adminlayout",
      title: "Admin Panel",
      properties: properties,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  gc,
  propertyAppBucket,
  getAdminPanel,
  getAddPropertyPage,
  getBedroomAdmin,
  getStudioAdmin,
  getSingleAdmin,
  addProperty,
  getEditPropertyPage,
  editProperty,
  deleteProperty,
  searchProperty,
};
