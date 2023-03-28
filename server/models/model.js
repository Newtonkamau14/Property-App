'use strict';
const { sequelize } = require('../../config/database');
const { DataTypes } = require('sequelize');
const uuid = require('uuid')



const Admin = sequelize.define('Admin',{
    admin_id: {
        primaryKey: true,
        allowNull: false,
        isUnique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID
    },
    admin_username: {
        type: DataTypes.STRING,
        allowNull: false,  
    },
    admin_email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin_password: {
        type: DataTypes.STRING,
        allowNull: false
    }

});


const Property = sequelize.define('Property',{
    property_id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID,
        isUnique: true
    },
    property_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    property_location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    property_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    property_image: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    property_listed_day: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now()
    },
    property_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    property_purpose : {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    other_property_images: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    admin_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID,
        references: {
            model: 'admins',
            key: 'admin_id'
        }
    }
});

const User = sequelize.define('User',{
    user_id: {
        primaryKey: true,
        allowNull: false,
        isUnique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,  
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }

});


Admin.hasMany(Property);
sequelize.sync({ force: true });


module.exports = { Admin, Property, User }