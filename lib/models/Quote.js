const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
  character: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character',
    required: true
  }],
  body: {
    type: String,
    required: true
  }
});

quoteSchema.statics.aNameForTheAggregation = function() {
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
