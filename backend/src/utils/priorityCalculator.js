export const calculatePriority = (severity, reportCount) => {
  let severityWeight = 1;

  if (severity === "Medium") severityWeight = 2;
  if (severity === "High") severityWeight = 3;

  return severityWeight * reportCount;
};
