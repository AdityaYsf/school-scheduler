export function getStatusClasses(status) {
  if (status === "Active")   return "bg-[#ECFDF5] text-[#047857]";
  if (status === "Inactive") return "bg-[#FEF2F2] text-[#B91C1C]";
  if (status === "On Leave") return "bg-[#FEF7C3] text-[#92400E]";
  return "bg-[#E5E7EB] text-[#6B7280]";
}