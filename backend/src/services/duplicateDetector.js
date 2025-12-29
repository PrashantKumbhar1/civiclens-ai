import Complaint from "../models/Complaint.js";

export const findDuplicateGroup = async (issueType, lat, lng) => {
  const radius = 0.01; // approx 1 km

  const duplicates = await Complaint.find({
    issueType,
    "location.lat": { $gte: lat - radius, $lte: lat + radius },
    "location.lng": { $gte: lng - radius, $lte: lng + radius },
  });

  return duplicates;
};
