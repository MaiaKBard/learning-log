import mongoose from "mongoose"

const resourceSchema = new mongoose.Schema({
  url: { type: String, required: true},
  title: { type: String, required: true},
  summary: { type: String, required: true},
  breakdown: { type: String, required: true},
  deeperDive: { type: String, required: true}
})

const Resource = mongoose.model('resource', resourceSchema)
export default Resource

