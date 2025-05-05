export const calculateOffset = ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const current_page = Math.max(page, 1);
  const skip = (current_page - 1) * limit;

  return { current_page: current_page, skip: skip, take: limit };
};
