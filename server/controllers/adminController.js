const Property = require("../models/property.model");
const passport = require("passport");
require("../../config/passport.config");

//Get Admin page
exports.getAdminPanel = async (req, res) => {
  let user = req.body.user;  
  const properties = await Property.find({user:req.user.id});
  res.render("adminpanel", {
    title: "Admin Panel",
    properties: properties,
  });
};

//Get Add property page
exports.getAddPropertyPage = async (req, res) => {
  res.render("addproperty", {
    title: "Add Property",
  });
};

//Get bedrooms
exports.getBedroomAdmin = async (req, res) => {
    let user = req.body.user;    
    const bedrooms = await Property.find({ property_type: "1,2,3 Bedrooms"}).where({user:req.user.id});
    res.render("adminbedrooms", {
        title: "1,2,3 Bedrooms",
        bedrooms: bedrooms,
    });
};

//Get studio apartments
exports.getStudioAdmin = async (req, res) => {
    let user = req.body.user;    
    const studioapt = await Property.find({ property_type: "Studio Apartments" }).where({user:req.user.id});
    res.render("adminstudioapartments", {
        title: "Studio Apartments",
        studioapt: studioapt,
    });
};

//Get single rooms
exports.getSingleAdmin = async (req, res) => {
    let user = req.body.user;    
    const singlerms = await Property.find({ property_type: "Single Rooms"}).where({user:req.user.id});
    res.render("adminsingleroom", {
        title: "Single Rooms",
        singlerms: singlerms,
    });
};

//Add Property
exports.addProperty = async (req, res) => {
  let property = new Property({
    property_name: req.body.property_name,
    property_location: req.body.property_location,
    property_price: req.body.property_price,
    property_image: req.file.filename,
    property_type: req.body.property_type,
    property_purpose: req.body.property_purpose,
    admin: req.user.id,
  });

  try {
    property = property.save();
    res.redirect("/admin");
  } catch (error) {
    res.render("addproperty", {
      title: "Add Property",
    });
  }
};

//Get Edit Page
exports.getEditPropertyPage = async (req, res) => {
  const property = await Property.findById(req.params.id);
  res.render("editproperty", {
    title: "Edit Property",
    property: property,
  });
};

//Edit Property
exports.editProperty = async (req, res) => {
  let property;

  try {
    property = await Property.findById(req.params.id);
    property.property_name = req.body.property_name;
    property.property_price = req.body.property_price;
    property.property_image = req.body.property_image;
    property.property_purpose = req.body.property_purpose;

    if ((req.body.user = req.user.id)) {
      await property.save();
      res.redirect("/admin");
    }
  } catch (error) {
    if (property == null) {
      res.redirect("/admin/addproperty");
    } else {
      res.render("editproperty", {
        title: "Edit Property",
        property: property,
      });
    }
  }
};

//Delete Property
exports.deleteProperty = async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
};

//Search property
exports.searchProperty = async (req, res) => {
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
        res.render("adminpanel", {
          title: "Admin Panel",
          properties: properties,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
