const mongoose = require('mongoose')
const {Schema} = mongoose;

const roomSchema = new mongoose.Schema(
  {
    username: {
      type: String
    },
    email: {
      type: String
    },
    phone: {
      type: String,
    },
    title: {
      type: String
    },
    rent: {
      type: Number
    },
    description: {
      type: String
    },
    rules: {
      type: String
    },
    images: {
      type: [String]
    },
    preferredTenant: {
      type: String
    },
    bathroomFacility: {
      type: String
    },
    toiletFacility: {
      type: String
    },
    quantity: {
      type: Number
    },
    isPG: {
      type: Boolean
    },
    facilities: {
      wifi: {
        type: Boolean,
        default: false
      },
      airConditioning: {
        type: Boolean,
        default: false
      },
      foodFacilities: {
        type: Boolean,
        default: false
      },
      drinkingWater: {
        type: Boolean,
        default: false
      },
      cleaningFacilities: {
        type: Boolean,
        default: false
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room' , roomSchema );