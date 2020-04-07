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

quoteSchema.statics.randomQuote = function() {
  //  returns a random quote with character object attached
  //  to quote for easy reference
  return this.aggregate(
    [
      {
        '$sample': {
          'size': 1
        }
      }, {
        '$lookup': {
          'from': 'characters', 
          'localField': 'character', 
          'foreignField': '_id', 
          'as': 'spokenBy'
        }
      }
    ]
  );
};

module.exports = mongoose.model('Quote', quoteSchema);
