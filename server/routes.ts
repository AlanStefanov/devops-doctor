import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  app.get("/api/resources", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const resources = await storage.getResources();
    res.json(resources);
  });

  app.get("/api/resources/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const resource = await storage.getResource(parseInt(req.params.id));
    if (!resource) return res.sendStatus(404);

    if (resource.requiresAdmin && !req.user?.isAdmin) {
      return res.sendStatus(403);
    }

    res.json(resource);
  });

  app.post("/api/resources", async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.sendStatus(403);
    }

    const resource = await storage.createResource(req.body);
    res.status(201).json(resource);
  });

  app.patch("/api/resources/:id", async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.sendStatus(403);
    }

    const resource = await storage.updateResource(parseInt(req.params.id), req.body);
    if (!resource) return res.sendStatus(404);

    res.json(resource);
  });

  app.delete("/api/resources/:id", async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.sendStatus(403);
    }

    const success = await storage.deleteResource(parseInt(req.params.id));
    if (!success) return res.sendStatus(404);

    res.sendStatus(204);
  });

  // User management endpoints (admin only)
  app.get("/api/users", async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.sendStatus(403);
    }

    const users = await storage.getUsers();
    res.json(users);
  });

  app.patch("/api/users/:id", async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.sendStatus(403);
    }

    const user = await storage.updateUser(parseInt(req.params.id), req.body);
    if (!user) return res.sendStatus(404);

    res.json(user);
  });

  app.delete("/api/users/:id", async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.sendStatus(403);
    }

    if (req.user.id === parseInt(req.params.id)) {
      return res.status(400).send("Cannot delete your own account");
    }

    const success = await storage.deleteUser(parseInt(req.params.id));
    if (!success) return res.sendStatus(404);

    res.sendStatus(204);
  });

  const httpServer = createServer(app);
  return httpServer;
}