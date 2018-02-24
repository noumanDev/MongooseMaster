var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberValidator = [function (val) {
    return val.length>0 && val.toLocaleLowerCase()!='none';
}, 'Select a valid member name'];

var requiredStringValidator =[(val)=>{
    return val.trim().length>0
},'{PATH} cannot be empty'];

var standupSchema = new Schema({
    memberName: { type: String, required: true,validate:memberValidator },
    project: { type: String, required: true ,validate : requiredStringValidator  },
    workYesterday: { type: String, required: true ,validate : requiredStringValidator},
    workToday: { type: String, required: true ,validate : requiredStringValidator},
    impediment: { type: String, required: true ,validate : requiredStringValidator},
    createdOn: { type: Date, default: Date.now }
});

//export model
module.exports = mongoose.model('Standup', standupSchema);

// //disabled_id
// var noIdSchema = new Schema(
//     { name: String },
//     { _id: false }
// );

// //example of using schema.add
// var includeMiddleName = true;

// var exampleSchema = new Schema;
// if (includeMiddleName) {
//     exampleSchema.add({
//         memberName: {
//             first: String,
//             middle: String,
//             last: String
//         }
//     });
// }
// else {
//     exampleSchema.add({
//         memberName: {
//             first: String,
//             last: String
//         }
//     });
// }

// exampleSchema.add({
//     workYesterday: String,
//     workToday: String,
//     impediment: String,
//     createdOn: { type: Date, default: Date.now }

// })