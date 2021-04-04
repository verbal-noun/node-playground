const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB...."))
  .catch((err) => console.log("Failed to connect to MongoDB...", err));

// Create a schema for our courses
const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  data: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// Create a model
const Course = mongoose.model("Course", courseSchema);

// Async function for creating a course into database
async function createCourse() {
  const course = new Course({
    name: "React course",
    author: "Kaif",
    tags: ["react", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

createCourse();
