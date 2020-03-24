const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
  speaker: [{
    type: mongoose.Schema.Types.ObjestId,
    ref: 'Character',
    required: true
  }],
  body: {
    type: String,
    required: true
  }
});

quoteSchema.statics.userByMedium = function() {
  // EXAMPLE AGGREGATION
  // return this.aggregate(
  //   [
  //     {
  //       '$lookup': {
  //         'from': 'users', 
  //         'localField': '_id', 
  //         'foreignField': 'medium', 
  //         'as': 'userByMedium'
  //       }
  //     }
  //   ]
  // );
};

module.exports = mongoose.model('Quote', quoteSchema);
