'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useBlogStore } from '@/hooks/useBlogStore';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { toast } from 'sonner';

type Props = {
  blogId: Id<'blogs'>;
};

const AlertDeleteBlog = ({ blogId }: Props) => {
  const { openDeleteBlog, setOpenDeleteBlog } = useBlogStore();
  const [isPending, setIsPending] = React.useState(false);
  const deleteBlog = useMutation(api.blogs.deleteBlog);
  const handleDeleteBlog = async () => {
    console.log(blogId);

    setIsPending(true);
    await deleteBlog({ id: blogId })
      .then((response) => {
        toast.success('Blog deleted successfully');
      })
      .catch((error) => {
        toast.error('Error deleting blog');
      })
      .finally(() => setIsPending(false));
  };
  return (
    <AlertDialog open={openDeleteBlog} onOpenChange={setOpenDeleteBlog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteBlog}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDeleteBlog;
