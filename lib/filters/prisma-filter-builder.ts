interface BuildSearchFilterOptions {
  search?: string;
  fields: string[];
}

export function buildSearchFilter({
  search,
  fields,
}: BuildSearchFilterOptions) {
  if (!search) return {};

  return {
    OR: fields.map(field => ({
      [field]: {
        contains: search,
        mode: "insensitive",
      },
    })),
  };
}