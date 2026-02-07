import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { registerChatRoutes } from "./replit_integrations/chat";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // 1. Setup Auth
  await setupAuth(app);
  registerAuthRoutes(app);

  // 2. Setup Chat (for the Singlish bot)
  registerChatRoutes(app);

  // 3. API Routes

  // Machines
  app.get(api.machines.list.path, async (req, res) => {
    const machines = await storage.getMachines();
    res.json(machines);
  });

  app.get(api.machines.get.path, async (req, res) => {
    const machine = await storage.getMachine(Number(req.params.id));
    if (!machine) return res.status(404).json({ message: "Machine not found" });
    res.json(machine);
  });

  // Bookings
  app.get(api.bookings.list.path, async (req, res) => {
    const bookings = await storage.getBookings();
    res.json(bookings);
  });

  app.post(api.bookings.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      // Force userId from session
      const userId = (req.user as any).claims.sub;
      const bookingData = api.bookings.create.input.parse({ ...req.body, userId });
      
      const machine = await storage.getMachine(bookingData.machineId);
      if (!machine) return res.status(404).json({ message: "Machine not found" });
      if (machine.status !== "available") return res.status(400).json({ message: "Machine is currently in use" });

      const booking = await storage.createBooking({ ...bookingData, userId });
      res.status(201).json(booking);
    } catch (error) {
       if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors[0].message, field: error.errors[0].path.join('.') });
      } else {
        console.error("Booking error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Complete booking (Mock logic for points: +1 if within 5 mins of end time, -1 if late)
  app.post(api.bookings.complete.path, async (req, res) => {
    const bookingId = Number(req.params.id);
    const booking = await storage.completeBooking(bookingId); // This sets completed=true and machine=available
    
    if (booking) {
      // Simple logic: Always +1 for manual completion for now (MVP)
      // In a real app we'd compare Date.now() with booking.startTime + duration
      await storage.updatePoints(booking.userId, 1);
      res.json(booking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  });

  // Leaderboard
  app.get(api.leaderboard.list.path, async (req, res) => {
    const leaderboard = await storage.getLeaderboard();
    // Add rank
    const ranked = leaderboard.map((entry, index) => ({
      userId: entry.userId,
      username: entry.username || "Anonymous",
      points: entry.points,
      rank: index + 1
    }));
    res.json(ranked);
  });

  // Profile
  app.get(api.profile.get.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const userId = (req.user as any).claims.sub;
    
    const profile = await storage.getUserProfile(userId);
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  });

  app.put(api.profile.update.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const userId = (req.user as any).claims.sub;

    try {
      const input = api.profile.update.input.parse(req.body);
      const profile = await storage.upsertUserProfile({ ...input, userId });
      res.json(profile);
    } catch (error) {
       if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });

  // SEED DATA
  await seedMachines();

  return httpServer;
}

async function seedMachines() {
  const existing = await storage.getMachines();
  if (existing.length === 0) {
    console.log("Seeding machines...");
    const blocks = ["Block 4", "Block 5"];
    const types = ["washer", "dryer"];
    
    for (const block of blocks) {
      for (let i = 1; i <= 5; i++) {
        await storage.createMachine({
          block,
          type: i <= 3 ? "washer" : "dryer",
          machineNumber: i,
          status: "available"
        });
      }
    }
    console.log("Machines seeded.");
  }
}
