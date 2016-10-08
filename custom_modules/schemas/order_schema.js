var Mongoose    = require('mongoose');

var order_schema = new Mongoose.Schema({
  //example attributes:
  //===================
  /*
  name:           {type: String,  required: true },
  createdAt:      {type: Date,    required: false, default: Date.now},
  active:         {type: Boolean, required: false, default: true},
  group:          {type: Number,  required: false, default: 0},
  */
});

exports.schema = order_schema;