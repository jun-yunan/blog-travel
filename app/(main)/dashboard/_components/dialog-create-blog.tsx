import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useBlogStore } from '@/hooks/useBlogStore';
import FormCreateBlog from './form-create-blog';
import { LegacyRef, useRef } from 'react';

export function DialogCreateBlog() {
  const { openCreateBlog, setOpenCreateBlog } = useBlogStore();

  return (
    <Dialog open={openCreateBlog} onOpenChange={setOpenCreateBlog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Blog</DialogTitle>
          <DialogDescription>
            Create a new blog post to share with your audience.
          </DialogDescription>
        </DialogHeader>
        <FormCreateBlog />
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
