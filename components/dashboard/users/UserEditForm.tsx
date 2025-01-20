import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { User } from "@/types";
import { patchData } from "@/utils/apiServices";
import { serverRevalidate } from "@/utils/revalidatePath";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const placeholders: Record<string, string> = {
  name: "Enter User Name",
  email: "Enter Email Address",
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

      role: undefined,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof userEditSchema>> = async (
    values
  ) => {
    try {
      const updatedData = { ...values, id: id };
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

        {/* Role Field */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value} // Ensure proper handling of the value
                >
                  <SelectTrigger>
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
        <div className="flex justify-between gap-10">
          <Button
            onClick={() => isOpen(false)}
            type="button"
            className="w-1/2 bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-1/2 bg-primary text-white hover:bg-primary-dark"
          >
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
}
