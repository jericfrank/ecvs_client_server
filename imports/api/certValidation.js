import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Files } from './files.js';

// export const Validation = new Mongo.Collection('cert_validation');

export const Validation = new Mongo.Collection('cert_validation', {
  transform: function(doc) {
    doc.Files = Files.find({
      validationId: doc._id
    }).fetch();
    return doc;
  }
});

if (Meteor.isServer) {
  Meteor.publish('validation.owner', function() {

    var topValidationCursor = Validation.find({userId: this.userId});
    var ValidationIds = topValidationCursor.map(function(p) { return p._id });

    return [
      topValidationCursor,
      Files.find({validationId: {$in: ValidationIds}})
    ]
  });
}

Meteor.methods({
  'validation.insert'(text) {
    
    const validationId = Validation.insert({
      userId: Meteor.userId(),
      remarks: text,
      status: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const file = Files.find({userId: Meteor.userId() , active: false}).fetch();

    file.map((data)=>{
      
      Files.update(data._id, {$set: {validationId: validationId, active: true} });
    });

  },
  'validation.update'(_id){
    Validation.update(_id, {$set: {status: 4} });
  }
});