export function formatDataEndoscopes(
  departments,
  endoscopes,
  kinds,
  manufacturers
) {
  return endoscopes.map((item) => ({
    ...item,
    date_start: formatDateToTimeLocal(item.date_start),
    name_kind: kinds.find((k) => k.id === item.kindId).name,
    name_manufacturer: manufacturers.find((m) => m.id === item.manufacturerId)
      .name,
    name_department: departments.find((d) => d.id === item.departmentId).name,
  }));
}

export const formatDateToTimeLocal = (dateStr, locale = "ru-Ru") => {
  const date = new Date(dateStr);
  return `${date.toLocaleDateString(locale)} ${date.toLocaleTimeString(
    locale
  )}`;
};

export function filterObjectsKeys(arr) {
  return arr.filter((obj) => {
    for (let key in obj) {
      if (Array.isArray(obj[key]) && obj[key].length === 0) {
        return false;
      }
    }
    return true;
  });
}
