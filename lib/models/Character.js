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
  //  Returns a single character (as an object) with all their
  //  quotes (as an array in the object) - takes character id as param
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


characterSchema.statics.randomCharacter = function() {
  //returns 1 random character
  return this.aggregate(
    [
      {
        '$sample': {
          'size': 1
        }
      }
    ]
  );
};

characterSchema.statics.quotes = function() {
  //returns all characters (as array of objects) with all quotes
  // for each character (as an array in each character object)
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
