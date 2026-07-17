import { PaginationMeta } from "./pagination.types";

export function buildPagination(
  page: number,
  pageSize: number,
  total: number
): PaginationMeta {

  return {

    page,

    pageSize,

    total,

    totalPages: Math.ceil(total / pageSize),

  };

}