export type paginationType = {
  fetchProducts: (e?: number) => Promise<void>;
  pagination: {
    category: string;
    has_pre: boolean;
    has_next: boolean;
    total_pages: number;
    current_page: number;
  };
};
