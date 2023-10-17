export default function groupObjectsByField<T>(
  data: T[],
  field: keyof T,
): Record<string, T[]> {
  const groupedData: Record<string, T[]> = {};

  data.forEach((item) => {
    const key = item[field] as string;
    if (!groupedData[key]) {
      groupedData[key] = [];
    }
    groupedData[key].push(item);
  });

  return groupedData;
}
