import { create } from 'zustand';

type BlogStore = {
  openMoreOptions: boolean;
  setOpenMoreOptions: (value: boolean) => void;
  openDeleteBlog: boolean;
  setOpenDeleteBlog: (value: boolean) => void;
  openCreateBlog: boolean;
  setOpenCreateBlog: (value: boolean) => void;
};

export const useBlogStore = create<BlogStore>((set) => ({
  openMoreOptions: false,
  setOpenMoreOptions: (value) => set({ openMoreOptions: value }),
  openDeleteBlog: false,
  setOpenDeleteBlog: (value) => set({ openDeleteBlog: value }),
  openCreateBlog: false,
  setOpenCreateBlog: (value) => set({ openCreateBlog: value }),
}));
