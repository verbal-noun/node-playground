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

// Function to query documents
async function getCourse() {
  const courses = await Course
    // .find({ price: { $gte: 10, $lte: 20}})
    // .find({price: {$in: [10, 20, 30]}})
    // .find({
    //   author: "Kaif",
    //   isPublished: true,
    // })
    .find()
    .or([{ name: "Mosh" }, { isPublished: true }])
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });

  console.log(courses);
}

async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.author = "Ahsan";

  //   course.set({
  //     isPublished: true,
  //     author: "Ahsan",
  //   });

  const result = await course.save();
  console.log(result);
}

updateCourse("6069157d6ca43264fb5f8635");
