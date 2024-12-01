'use client';

import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';

import z from 'zod';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import { Id } from '@/convex/_generated/dataModel';
import { useBlogStore } from '@/hooks/useBlogStore';

export const blogSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

type Props = {};

const FormCreateBlog = ({}: Props) => {
  const { user: clerk } = useUser();

  const [pending, setPending] = useState(false);

  const { openCreateBlog, setOpenCreateBlog } = useBlogStore();

  const user = useQuery(api.user.getUserById, { clerkId: clerk!.id });

  const createBlog = useMutation(api.blogs.createBlog);

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  // const userId =
  const onSubmit = async (values: z.infer<typeof blogSchema>) => {
    try {
      setPending(true);
      const blog = await createBlog({
        authorId: user?._id as Id<'users'>,
        ...values,
      });

      if (!blog) {
        toast.error('Error creating blog');
      }
      setOpenCreateBlog(false);
      form.reset();
      toast.success('Blog created successfully');
      console.log(blog);
    } catch (error) {
      toast.error('Error creating blog');
    } finally {
      setPending(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col justify-center"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder=" " {...field} />
              </FormControl>
              <FormDescription>
                Your blog title should be descriptive.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Write..."
                  className="h-[150px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Blog</Button>
      </form>
    </Form>
  );
};

export default FormCreateBlog;
