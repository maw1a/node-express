const EntitySchema = require("typeorm").EntitySchema;
const User = require("../models/User").User;

exports.userSchema = new EntitySchema({
  name: "User",
  target: User,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    email: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
    verified: {
      type: "boolean",
      default: false,
    },
  },
});
