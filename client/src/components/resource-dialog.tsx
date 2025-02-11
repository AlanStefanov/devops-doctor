import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { insertResourceSchema, type InsertResource } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { FormattedMessage } from "react-intl";

type ResourceDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resource?: {
    id: number;
  } & InsertResource;
};

export function ResourceDialog({ open, onOpenChange, resource }: ResourceDialogProps) {
  const { toast } = useToast();
  const form = useForm<InsertResource>({
    resolver: zodResolver(insertResourceSchema),
    defaultValues: resource ?? {
      title: "",
      category: "cicd",
      content: "",
      requiresAdmin: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertResource) => {
      if (resource?.id) {
        await apiRequest("PATCH", `/api/resources/${resource.id}`, data);
      } else {
        await apiRequest("POST", "/api/resources", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resources"] });
      onOpenChange(false);
      toast({
        title: resource ? "Resource updated" : "Resource created",
        description: resource
          ? "The resource has been updated successfully"
          : "The resource has been created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {resource ? (
              <FormattedMessage id="resources.edit.title" />
            ) : (
              <FormattedMessage id="resources.create.title" />
            )}
          </DialogTitle>
          <DialogDescription>
            {resource ? (
              <FormattedMessage id="resources.edit.description" />
            ) : (
              <FormattedMessage id="resources.create.description" />
            )}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <FormattedMessage id="resources.form.title" />
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <FormattedMessage id="resources.form.category" />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cicd">CI/CD</SelectItem>
                      <SelectItem value="infrastructure">
                        Infrastructure
                      </SelectItem>
                      <SelectItem value="monitoring">Monitoring</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <FormattedMessage id="resources.form.content" />
                  </FormLabel>
                  <FormControl>
                    <Textarea className="font-mono" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requiresAdmin"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      <FormattedMessage id="resources.form.requiresAdmin" />
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {resource ? (
                  <FormattedMessage id="resources.edit.submit" />
                ) : (
                  <FormattedMessage id="resources.create.submit" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
