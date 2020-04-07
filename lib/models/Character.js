const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
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

// Example aggregation
//
// characterSchema.statics.getRandomCharacter = function(count) {
//   return this.aggregate([
//     { $sample: { size: count } }, 
//     { $project: { __v: false } }
//   ]);
// };

characterSchema.statics.characterWithQuotes = function(id) {
  return this.aggregate(
    [
      {
        '$match': {
          '_id': mongoose.Types.ObjectId(id)
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

characterSchema.statics.quotes = function() {
  return this.aggregate(
    [
      {
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


const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
