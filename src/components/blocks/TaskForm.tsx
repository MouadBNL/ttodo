"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DeleteIcon, XIcon } from "lucide-react";
import { taskSchema } from "@/validators";
import { DateTimePicker } from "../ui/date-time-picker";

type FormValues = z.infer<typeof taskSchema>;

export default function TaskForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      task: "",
      dueDate: new Date(), // Set default date to today
    },
  });

  const aa = form.getFieldState("dueDate");

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Input placeholder="Enter your task" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DateTimePicker {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      key={field.value}
                      defaultValue={field.value ?? undefined}
                      onValueChange={field.onChange}
                    >
                      <span className="relative">
                        <SelectTrigger>
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        {field.value && (
                          <button
                            className="absolute top-1/2 right-4 z-50 -translate-y-1/2 cursor-pointer bg-white"
                            onClick={() => field.onChange(null)}
                          >
                            <XIcon size={12} />
                          </button>
                        )}
                      </span>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
