import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useBlogStore } from '@/hooks/useBlogStore';
import React from 'react';

type Props = {};

const DialogOptionsBlog = (props: Props) => {
  const { openMoreOptions, setOpenMoreOptions } = useBlogStore();
  return (
    <Dialog open={openMoreOptions} onOpenChange={setOpenMoreOptions}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogOptionsBlog;
