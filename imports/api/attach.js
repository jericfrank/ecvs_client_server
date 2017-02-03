import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Certificates } from './certificates.js';

export const Attach = new Mongo.Collection('attach_certificate', {
  transform: function(doc) {
    doc.Certificates = Certificates.findOne({
      _id: doc.certificatesId
    });
    
    return doc;
  }
});

if (Meteor.isServer) {
  Meteor.publish('attach.select', function (_id){

    return [
      Attach.find({validationId: _id}),
      Certificates.find({}),
    ]
  });

  Meteor.methods({
    'attach.update'(_id, bolean){
      
      Attach.update(_id, {$set: {active: bolean} });
    }
  });

}

