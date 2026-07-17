export interface SearchFilter {
  search?: string;
}

export interface StatusFilter<T> {
  status?: T;
}

export interface SortFilter<T> {
  sortBy?: keyof T;
  sortOrder?: "asc" | "desc";
}