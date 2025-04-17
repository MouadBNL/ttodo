"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { taskSchema, type ITask } from "@/validators";
import { DateTimePicker } from "../ui/date-time-picker";

export default function TaskForm({
  onSubmit,
  onCancel,
  task,
}: {
  onSubmit: (data: ITask) => void;
  onCancel?: () => void;
  task?: ITask;
}) {
  const form = useForm<ITask>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      task: "",
      dueDate: new Date(),
      completedAt: null,
      priority: null,
      ...task,
    },
  });

  const handleSubmit = async (data: ITask) => {
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        {/* {form.formState.errors && (
          <FormMessage>{JSON.stringify(form.formState.errors)}</FormMessage>
        )} */}
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Task</FormLabel> */}
              <FormControl>
                <Input placeholder="Enter your task" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DateTimePicker {...field} size="sm" />
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
                        <SelectTrigger size="sm">
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
          <div className="flex items-center justify-end gap-4">
            <Button
              variant="secondary"
              onClick={onCancel}
              type="button"
              size="sm"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              size="sm"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
