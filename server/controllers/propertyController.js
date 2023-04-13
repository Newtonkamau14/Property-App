const Property = require("../models/property.model");
const User = require("../models/user.model");

//Get home page
exports.getHomePage = async (req, res) => {
  const property = await Property.findById(req.params.id);
  var number = await Property.count();
  const randproperties = await Property.aggregate([
    { $sample: { size: number } },
  ]);
  const studioapt = await Property.find({ property_type: "Studio Apartments" });
  const singlerms = await Property.find({ property_type: "Single Rooms" });
  const bedrooms = await Property.find({ property_type: "1,2,3 Bedrooms" });

  res.render("home", {
    title: "Home",
    randproperties: randproperties,
    studioapt: studioapt,
    singlerms: singlerms,
    bedrooms: bedrooms,
    property: property
  });
};

//Get bedrooms
exports.getBedrooms = async (req, res) => {
  const bedrooms = await Property.find({ property_type: "1,2,3 Bedrooms" });
  res.render("bedrooms", {
    title: "1,2,3 Bedrooms",
    bedrooms: bedrooms,
  });
};

//Get single rooms
exports.getSingleRoom = async (req, res) => {
  const singlerms = await Property.find({ property_type: "Single Rooms" });
  res.render("singleroom", {
    title: "Single Rooms",
    singlerms: singlerms,
  });
};

//Get studio
exports.getStudioApartment = async (req, res) => {
  const studioapt = await Property.find({ property_type: "Studio Apartments" });
  res.render("studioapartment", {
    title: "Studio Apartments",
    studioapt: studioapt,
  });
};

//Show property

exports.showProperty = async (req, res) => {
  const property = Property.findById(req.params.id);
  res.render("showproperty", {
    title: "Show Property",
    property: property,
  });
};


//Search property
exports.userSearchProperty = async (req, res) => {
  Property.find({
    $or: [
      { property_name: { $regex: req.query.search } },
      { property_location: { $regex: req.query.search } },
      { property_purpose: { $regex: req.query.search } },
      { property_type: { $regex: req.query.search } },
    ],
  })
    .then((err, properties) => {
      if (err) {
        console.log(err);
      } else {
        res.render("home", {
          title: "Home",
          randproperties: randproperties,
          studioapt: studioapt,
          singlerms: singlerms,
          bedrooms: bedrooms,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
