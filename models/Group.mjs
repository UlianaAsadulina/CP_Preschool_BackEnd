import mongoose from 'mongoose';

const childSchema = new mongoose.Schema({
    childName: {
        type: String,
        required: true },
    childDOB: {
        type: Date,
        required: true },
    parentName: {
        type: String,
        required: true },
    parentPhone: {
        type: Number,
        required: true },
    parentEmail: {
        type: String,
        required: true },
});

const teacherSchema = new mongoose.Schema( {
    teacherFirstName: {
        type: String,
        required: true },
    teacherLastName: {
        type: String,
        required: true },
    teacherRole: {
        type: String,
        required: true },
    teacherInfo: {
        type: String,
        required: true },
})

const GroupSchema = new mongoose.Schema({
    group: {
        type: String,
        required: true }, 
    kidsInGroup: {
        type: Number,
        required: true },
    teachers: [ teacherSchema ],
    morning: [childSchema],
    afternoon: [childSchema],
    full: [childSchema],
});

const Group = mongoose.model('Group', GroupSchema);

export default Group;