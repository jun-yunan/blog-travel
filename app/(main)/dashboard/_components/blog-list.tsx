'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { api } from '@/convex/_generated/api';
import { useBlogStore } from '@/hooks/useBlogStore';
import { useQuery } from 'convex/react';
import { MoreVertical, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AlertDeleteBlog from './alert-delete-blog';
import { DialogCreateBlog } from './dialog-create-blog';

type Props = {};

const BlogList = (props: Props) => {
  const {
    openMoreOptions,
    setOpenMoreOptions,
    openDeleteBlog,
    setOpenDeleteBlog,
    openCreateBlog,
    setOpenCreateBlog,
  } = useBlogStore();
  const blogs = useQuery(api.blogs.get);

  return (
    <>
      <DialogCreateBlog />
      <div className="w-full h-full flex flex-col items-center justify-center p-12">
        <Button className="mb-6">
          <p onClick={() => setOpenCreateBlog(true)}>Create Blogs</p>
          <Pencil />
        </Button>
        {blogs ? (
          <div className="flex flex-row gap-8 flex-wrap">
            {blogs.map((blog) => (
              <Card key={blog._id} className="w-[450px] h-[300px]">
                <AlertDeleteBlog blogId={blog._id} />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <p>{blog.title}</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button
                          variant="ghost"
                          asChild
                          onClick={() => setOpenMoreOptions(true)}
                        >
                          <MoreVertical className="w-[50px] h-[50px]" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions Blog</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Details</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setOpenDeleteBlog(true)}
                        >
                          <div className="flex items-center gap-x-2 text-rose-700">
                            <Trash size={18} />
                            <p>Delete</p>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <Link key={blog._id} href={`/blogs/detail/${blog._id}`}>
                  <CardContent>{blog.content}</CardContent>
                </Link>
                <CardFooter></CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div>
            <p>No blogs found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogList;
