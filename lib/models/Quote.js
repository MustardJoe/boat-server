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
}, { 
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  }
});

// quoteSchema.statics.aNameForTheAggregation = function() {
//   EXAMPLE AGGREGATION
//   return this.aggregate(
//     [
//       {
//         '$lookup': {
//           'from': 'users', 
//           'localField': '_id', 
//           'foreignField': 'medium', 
//           'as': 'userByMedium'
//         }
//       }
//     ]
//   );
// };

quoteSchema.statics.quotesByChar = function(char) {
  return this.aggregate(
    [
      {
        '$match': {
          'name': char
        }
      }, {
        '$lookup': {
          'from': 'quotes', 
          'localField': '_id', 
          'foreignField': 'character', 
          'as': 'quotesByCharacter'
        }
      }
    ]
  );
};


module.exports = mongoose.model('Quote', quoteSchema);
