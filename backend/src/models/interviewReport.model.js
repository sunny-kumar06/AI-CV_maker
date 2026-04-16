

// /**
//  * job description schema
//  * resume text
//  * self discription
//  * 
//  * 
//  * technical questions:[]
//  * behavioral questions:[]
//  * skill gaps:[]
//  * prepration tips:[{},{}]
//  */
// const mongoose = require("mongoose");

// const technicalQuestionSchema = new mongoose.Schema(
//     {
//         question: {
//             type: String,
//             required: [true, "Question is required"]
//         },
//         intention: {
//             type: String,
//             required: [true, "Intention is required"]
//         },
//         answer: {
//             type: String,
//             required: [true, "Answer is required"]
//         }
//     },
//     {
//         _id: false
//     }
// );



// const behavioralQuestionSchema = new mongoose.Schema(
//     {
//         question: {
//             type: String,
//             required: [true, "Question is required"]
//         },
//         intention: {
//             type: String,
//             required: [true, "Intention is required"]
//         },
//         answer: {
//             type: String,
//             required: [true, "Answer is required"]
//         }
//     },
//     {
//         _id: false
//     }
// );


// const skillGapSchema = new mongoose.Schema(
//     {
//         skill: String,
//         severity: {
//             type: String,
//             enum: ["low", "medium", "high"]
//         }
//     },
//     {
//         _id: false
//     }
// );


// const preparationPlanSchema = new mongoose.Schema({
//     day: {
//         type: Number,
//         required: [true, "Day is required"]
//     },
//     focus: {
//         type: String,
//         required: true
//     },
//     tasks: [{
//         type: String,
//         required: true
//     }]
// });



// const interviewReportSchema = new mongoose.Schema({
//     jobDescription: {
//         type: String,
//         required: [true, "Job description is required"]
//     },
//     resume: {
//         type: String
//     },
//     selfDescription: {
//         type: String
//     },
//     matchScore: {
//         type: Number,
//         min: 0,
//         max: 100
//     },
//     technicalQuestionSchema: [technicalQuestionSchema],
//     behavioralQuestionSchema: [behavioralQuestionSchema],
//     skillGapSchema: [skillGapSchema],
//     preparationPlanSchema: [preparationPlanSchema],
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "users"
//     }

// }, {
//     timestamps: true
// });

// const InterviewReport = mongoose.model("InterviewReport", interviewReportSchema);

// module.exports = InterviewReport;

const mongoose = require("mongoose");

const technicalQuestionSchema = new mongoose.Schema({
    question: String,
    intention: String,
    answer: String
}, { _id: false });

const behavioralQuestionSchema = new mongoose.Schema({
    question: String,
    intention: String,
    answer: String
}, { _id: false });

const skillGapSchema = new mongoose.Schema({
    skill: String,
    severity: {
        type: String,
        enum: ["low", "medium", "high"]
    }
}, { _id: false });

const preparationPlanSchema = new mongoose.Schema({
    day: Number,
    focus: String,
    tasks: [String]
}, { _id: false });

const interviewReportSchema = new mongoose.Schema({
    jobDescription: String,
    resume: String,
    selfDescription: String,
    matchScore: Number,

    // 🔥 IMPORTANT (yehi fix hai)
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }

}, { timestamps: true });

module.exports = mongoose.model("InterviewReport", interviewReportSchema);