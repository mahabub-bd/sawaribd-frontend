"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { User } from "@/types";
import { patchData } from "@/utils/apiServices";
import { serverRevalidate } from "@/utils/revalidatePath";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const placeholders: Record<string, string> = {
  name: "Enter User Name",
  email: "Enter Email Address",
  password: "Enter New Password",
};

const userEditSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .optional()
    .or(z.literal("")),
  role: z.enum(["user", "admin", "moderator"], {
    required_error: "Role is required.",
  }),
});

interface UserEditFormProps {
  id: string;
  user: User;
  isOpen: (value: boolean) => void;
}

export default function UserEditForm({ user, isOpen, id }: UserEditFormProps) {
  const form = useForm<z.infer<typeof userEditSchema>>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: "",
      role: user.role as "user" | "admin" | "moderator",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof userEditSchema>> = async (
    values
  ) => {
    try {
      // Only include password in the update if it's not empty
      const updatedData = {
        ...values,
        id: id,
        // If password is empty, remove it from the payload
        ...(values.password === "" && { password: undefined }),
      };

      await patchData("users", id, updatedData);
      toast.success("User updated successfully");
      serverRevalidate("/admin-dashboard/users");
      isOpen(false);
    } catch (error) {
      toast.error("Failed to update user. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder={placeholders.name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={placeholders.email}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={placeholders.password}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-muted-foreground">
                Leave blank to keep the current password
              </p>
            </FormItem>
          )}
        />

        {/* Role Field */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select User Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>User Role</SelectLabel>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <Button onClick={() => isOpen(false)} type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Update User</Button>
        </div>
      </form>
    </Form>
  );
}
