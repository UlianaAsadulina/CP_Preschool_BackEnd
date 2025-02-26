import mongoose from 'mongoose';

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
};

const childSchema = new mongoose.Schema({
    childName: {
        type: String,
        required: [true, "Name required"] },
    childDOB: {
        type: Date,
        required: [true, "Date of birth required"] },
    attendTime: {
        type: String,
        enum: [ "full", "morning", "afternoon" ],
        default: "full",
        required: [ true, "Attend morning, afternoon or full"]
    },    
    parentName: {
        type: String,
        required: [true, "Name required"] },
    parentPhone: {
        type: Number,
        required: [true, "Phone number required"], 
        min: 1000000000,
        max: 9999999999},
    parentEmail: {
        type: String,
        required: [true, "Email required"],
    },
});

childName.index({ childName: 1} );

const teacherSchema = new mongoose.Schema( {
    teacherFirstName: {
        type: String,
        required: [true, "Name required"] },
    teacherLastName: {
        type: String,
        required: [true, "Last name required"] },
    teacherRole: {
        type: String,
        enum: [ "Lead", "Aid"],
        default: "Lead",
        required: true },
    teacherInfo: {type: String,},
})

teacherSchema.index({ teacherFirstName: 1, teacherLastName: 1 }); // schema level


const GroupSchema = new mongoose.Schema({
    group: {
        type: String,        
        enum: [
            "Infants (6wks-12months)",
            "Infants (12wks-18months)",
            "Toddlers (18m-30m)",
            "Toddlers (30m-3yrs)",
            "Preschool (3yrs-4yrs)",
            "Preschool (4yrs-5yrs)",
        ],
        default: "Preschool (4yrs-5yrs)",
        message: "${VALUE} is not valid group/age name",
        required: true,
    }, 
    kidsInGroup: {
        type: Number,
        enum: [10, 12, 14, 16, 24, 28],
        default: 28,
        required: true,
        message: "Value must corresponds Section 5104.033 | Staff to child ratios" },
    teachers: [ teacherSchema ],
    kids: [childSchema],
  
});

GroupSchema.index({ group: 1 }); 

const Group = mongoose.model('Group', GroupSchema);

export default Group;