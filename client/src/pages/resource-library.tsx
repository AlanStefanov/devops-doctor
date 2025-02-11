import { SidebarNav } from "@/components/sidebar-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation } from "@tanstack/react-query";
import { type Resource } from "@shared/schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/use-auth";
import { FormattedMessage } from "react-intl";
import { ResourceDialog } from "@/components/resource-dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

const categories = [
  { id: "cicd", label: "resources.category.cicd" },
  { id: "infrastructure", label: "resources.category.infrastructure" },
  { id: "monitoring", label: "resources.category.monitoring" },
  { id: "security", label: "resources.category.security" },
];

export default function ResourceLibrary() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedResource, setSelectedResource] = useState<Resource>();
  const [deleteResource, setDeleteResource] = useState<Resource>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/resources/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resources"] });
      toast({
        title: "Resource deleted",
        description: "The resource has been deleted successfully",
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

  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <SidebarNav />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <main className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              <FormattedMessage id="resources.title" />
            </h1>
            <p className="text-muted-foreground">
              <FormattedMessage id="resources.description" />
            </p>
          </div>
          {user?.isAdmin && (
            <Button onClick={() => {
              setSelectedResource(undefined);
              setDialogOpen(true);
            }}>
              <PlusCircle className="h-4 w-4 mr-2" />
              <FormattedMessage id="resources.create" />
            </Button>
          )}
        </div>

        <Tabs defaultValue={categories[0].id}>
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                <FormattedMessage id={category.label} />
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resources
                  ?.filter(
                    (resource) =>
                      resource.category.toLowerCase() === category.id &&
                      (!resource.requiresAdmin || user?.isAdmin)
                  )
                  .map((resource) => (
                    <Card key={resource.id}>
                      <CardHeader className="relative">
                        <CardTitle>{resource.title}</CardTitle>
                        {resource.requiresAdmin && (
                          <CardDescription>Admin Only</CardDescription>
                        )}
                        {user?.isAdmin && (
                          <div className="absolute top-4 right-4 flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedResource(resource);
                                setDialogOpen(true);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setDeleteResource(resource);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[200px]">
                          <pre className="text-sm">{resource.content}</pre>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <ResourceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        resource={selectedResource}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <FormattedMessage id="resources.delete.title" />
            </AlertDialogTitle>
            <AlertDialogDescription>
              <FormattedMessage id="resources.delete.description" />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <FormattedMessage id="resources.delete.cancel" />
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteResource) {
                  deleteMutation.mutate(deleteResource.id);
                  setDeleteDialogOpen(false);
                }
              }}
            >
              {deleteMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              <FormattedMessage id="resources.delete.confirm" />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}