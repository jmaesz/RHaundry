import type { User, UserProfile, Machine, Booking, Message } from "@shared/schema";

// Mock Users
export const mockUsers = [
  {
    id: 1,
    username: "koonwei",
    password: "password123",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    username: "zigoong",
    password: "password123",
    createdAt: new Date("2024-01-02"),
  },
  {
    id: 3,
    username: "current user",
    password: "password123",
    createdAt: new Date("2024-01-03"),
  },
  {
    id: 4,
    username: "bnsh_ahaskar",
    password: "password123",
    createdAt: new Date("2024-01-04"),
  },
  {
    id: 5,
    username: "ralves_paj",
    password: "password123",
    createdAt: new Date("2024-01-05"),
  },
];

// Mock User Profiles
export const mockUserProfiles = [
  {
    id: 1,
    userId: 1,
    displayName: "Koon Wei",
    email: "koonwei6767@gmail.com",
    phoneNumber: "+65 9123 4567",
    telegramHandle: "@koonwei6767",
    punctualityPoints: 67,
    block: "Block 7 & 8",
    preferences: null,
    updatedAt: new Date(),
  },
  {
    id: 2,
    userId: 2,
    displayName: "Zi Phong",
    email: "Zi Phong@raffles.edu.sg",
    phoneNumber: "+65 8765 4321",
    telegramHandle: "@ziphong",
    punctualityPoints: -10,
    block: "Block 3",
    preferences: null,
    updatedAt: new Date(),
  },
  {
    id: 3,
    userId: 3,
    displayName: "You",
    email: "you@raffles.edu.sg",
    phoneNumber: "+65 9999 8888",
    telegramHandle: "@yourhandle",
    punctualityPoints: 1,
    block: "Block 7 & 8",
    preferences: null,
    updatedAt: new Date(),
  },
  {
    id: 4,
    userId: 4,
    displayName: "Bnsh Ahaskar",
    email: "Bnsh_Ahaskar@raffles.edu.sg",
    phoneNumber: "+65 8234 5678",
    telegramHandle: "@bnsh_ahaskar_king",
    punctualityPoints: 15,
    block: "Block 2",
    preferences: null,
    updatedAt: new Date(),
  },
  {
    id: 5,
    userId: 5,
    displayName: "Ralves Paj",
    email: "ralvespaj666@raffles.edu.sg",
    phoneNumber: "+65 9876 5432",
    telegramHandle: "@ralvespaj",
    punctualityPoints: -5,
    block: "Block 6",
    preferences: null,
    updatedAt: new Date(),
  },
];

// Mock Machines - Blocks 2, 3, 4, 5, 6, 7&8, Comm Hall
// For blocks 2-6: 4 washers per level × 4 levels = 16 washers each + 16 dryers each
export const mockMachines: Machine[] = [
  // Block 2 - 4 washers per level, 4 levels = 16 washers total
  // Level 1 Washers
  { id: 1, machineNumber: "Level 1-W1", type: "washer", status: "available", block: "Block 2", location: "Level 1", createdAt: new Date() },
  { id: 2, machineNumber: "Level 1-W2", type: "washer", status: "in_use", block: "Block 2", location: "Level 1", createdAt: new Date() },
  { id: 3, machineNumber: "Level 1-W3", type: "washer", status: "available", block: "Block 2", location: "Level 1", createdAt: new Date() },
  { id: 4, machineNumber: "Level 1-W4", type: "washer", status: "available", block: "Block 2", location: "Level 1", createdAt: new Date() },
  // Level 2 Washers
  { id: 5, machineNumber: "Level 2-W1", type: "washer", status: "available", block: "Block 2", location: "Level 2", createdAt: new Date() },
  { id: 6, machineNumber: "Level 2-W2", type: "washer", status: "available", block: "Block 2", location: "Level 2", createdAt: new Date() },
  { id: 7, machineNumber: "Level 2-W3", type: "washer", status: "available", block: "Block 2", location: "Level 2", createdAt: new Date() },
  { id: 8, machineNumber: "Level 2-W4", type: "washer", status: "available", block: "Block 2", location: "Level 2", createdAt: new Date() },
  // Level 3 Washers
  { id: 9, machineNumber: "Level 3-W1", type: "washer", status: "available", block: "Block 2", location: "Level 3", createdAt: new Date() },
  { id: 10, machineNumber: "Level 3-W2", type: "washer", status: "available", block: "Block 2", location: "Level 3", createdAt: new Date() },
  { id: 11, machineNumber: "Level 3-W3", type: "washer", status: "available", block: "Block 2", location: "Level 3", createdAt: new Date() },
  { id: 12, machineNumber: "Level 3-W4", type: "washer", status: "available", block: "Block 2", location: "Level 3", createdAt: new Date() },
  // Level 4 Washers
  { id: 13, machineNumber: "Level 4-W1", type: "washer", status: "available", block: "Block 2", location: "Level 4", createdAt: new Date() },
  { id: 14, machineNumber: "Level 4-W2", type: "washer", status: "available", block: "Block 2", location: "Level 4", createdAt: new Date() },
  { id: 15, machineNumber: "Level 4-W3", type: "washer", status: "available", block: "Block 2", location: "Level 4", createdAt: new Date() },
  { id: 16, machineNumber: "Level 4-W4", type: "washer", status: "available", block: "Block 2", location: "Level 4", createdAt: new Date() },
  // Level 1 Dryers
  { id: 17, machineNumber: "Level 1-D1", type: "dryer", status: "in_use", block: "Block 2", location: "Level 1", createdAt: new Date() },
  { id: 18, machineNumber: "Level 1-D2", type: "dryer", status: "available", block: "Block 2", location: "Level 1", createdAt: new Date() },
  { id: 19, machineNumber: "Level 1-D3", type: "dryer", status: "available", block: "Block 2", location: "Level 1", createdAt: new Date() },
  { id: 20, machineNumber: "Level 1-D4", type: "dryer", status: "available", block: "Block 2", location: "Level 1", createdAt: new Date() },
  // Level 2 Dryers
  { id: 21, machineNumber: "Level 2-D1", type: "dryer", status: "available", block: "Block 2", location: "Level 2", createdAt: new Date() },
  { id: 22, machineNumber: "Level 2-D2", type: "dryer", status: "available", block: "Block 2", location: "Level 2", createdAt: new Date() },
  { id: 23, machineNumber: "Level 2-D3", type: "dryer", status: "available", block: "Block 2", location: "Level 2", createdAt: new Date() },
  { id: 24, machineNumber: "Level 2-D4", type: "dryer", status: "available", block: "Block 2", location: "Level 2", createdAt: new Date() },
  // Level 3 Dryers
  { id: 25, machineNumber: "Level 3-D1", type: "dryer", status: "available", block: "Block 2", location: "Level 3", createdAt: new Date() },
  { id: 26, machineNumber: "Level 3-D2", type: "dryer", status: "available", block: "Block 2", location: "Level 3", createdAt: new Date() },
  { id: 27, machineNumber: "Level 3-D3", type: "dryer", status: "available", block: "Block 2", location: "Level 3", createdAt: new Date() },
  { id: 28, machineNumber: "Level 3-D4", type: "dryer", status: "in_use", block: "Block 2", location: "Level 3", createdAt: new Date() },
  // Level 4 Dryers
  { id: 29, machineNumber: "Level 4-D1", type: "dryer", status: "available", block: "Block 2", location: "Level 4", createdAt: new Date() },
  { id: 30, machineNumber: "Level 4-D2", type: "dryer", status: "available", block: "Block 2", location: "Level 4", createdAt: new Date() },
  { id: 31, machineNumber: "Level 4-D3", type: "dryer", status: "available", block: "Block 2", location: "Level 4", createdAt: new Date() },
  { id: 32, machineNumber: "Level 4-D4", type: "dryer", status: "available", block: "Block 2", location: "Level 4", createdAt: new Date() },

  // Block 3 - 4 washers per level, 4 levels = 16 washers total
  // Level 1 Washers
  { id: 33, machineNumber: "Level 1-W1", type: "washer", status: "available", block: "Block 3", location: "Level 1", createdAt: new Date() },
  { id: 34, machineNumber: "Level 1-W2", type: "washer", status: "available", block: "Block 3", location: "Level 1", createdAt: new Date() },
  { id: 35, machineNumber: "Level 1-W3", type: "washer", status: "available", block: "Block 3", location: "Level 1", createdAt: new Date() },
  { id: 36, machineNumber: "Level 1-W4", type: "washer", status: "available", block: "Block 3", location: "Level 1", createdAt: new Date() },
  // Level 2 Washers
  { id: 37, machineNumber: "Level 2-W1", type: "washer", status: "available", block: "Block 3", location: "Level 2", createdAt: new Date() },
  { id: 38, machineNumber: "Level 2-W2", type: "washer", status: "available", block: "Block 3", location: "Level 2", createdAt: new Date() },
  { id: 39, machineNumber: "Level 2-W3", type: "washer", status: "available", block: "Block 3", location: "Level 2", createdAt: new Date() },
  { id: 40, machineNumber: "Level 2-W4", type: "washer", status: "available", block: "Block 3", location: "Level 2", createdAt: new Date() },
  // Level 3 Washers
  { id: 41, machineNumber: "Level 3-W1", type: "washer", status: "available", block: "Block 3", location: "Level 3", createdAt: new Date() },
  { id: 42, machineNumber: "Level 3-W2", type: "washer", status: "available", block: "Block 3", location: "Level 3", createdAt: new Date() },
  { id: 43, machineNumber: "Level 3-W3", type: "washer", status: "available", block: "Block 3", location: "Level 3", createdAt: new Date() },
  { id: 44, machineNumber: "Level 3-W4", type: "washer", status: "available", block: "Block 3", location: "Level 3", createdAt: new Date() },
  // Level 4 Washers
  { id: 45, machineNumber: "Level 4-W1", type: "washer", status: "available", block: "Block 3", location: "Level 4", createdAt: new Date() },
  { id: 46, machineNumber: "Level 4-W2", type: "washer", status: "available", block: "Block 3", location: "Level 4", createdAt: new Date() },
  { id: 47, machineNumber: "Level 4-W3", type: "washer", status: "available", block: "Block 3", location: "Level 4", createdAt: new Date() },
  { id: 48, machineNumber: "Level 4-W4", type: "washer", status: "available", block: "Block 3", location: "Level 4", createdAt: new Date() },
  // Level 1 Dryers
  { id: 49, machineNumber: "Level 1-D1", type: "dryer", status: "available", block: "Block 3", location: "Level 1", createdAt: new Date() },
  { id: 50, machineNumber: "Level 1-D2", type: "dryer", status: "available", block: "Block 3", location: "Level 1", createdAt: new Date() },
  { id: 51, machineNumber: "Level 1-D3", type: "dryer", status: "available", block: "Block 3", location: "Level 1", createdAt: new Date() },
  { id: 52, machineNumber: "Level 1-D4", type: "dryer", status: "available", block: "Block 3", location: "Level 1", createdAt: new Date() },
  // Level 2 Dryers
  { id: 53, machineNumber: "Level 2-D1", type: "dryer", status: "available", block: "Block 3", location: "Level 2", createdAt: new Date() },
  { id: 54, machineNumber: "Level 2-D2", type: "dryer", status: "available", block: "Block 3", location: "Level 2", createdAt: new Date() },
  { id: 55, machineNumber: "Level 2-D3", type: "dryer", status: "available", block: "Block 3", location: "Level 2", createdAt: new Date() },
  { id: 56, machineNumber: "Level 2-D4", type: "dryer", status: "available", block: "Block 3", location: "Level 2", createdAt: new Date() },
  // Level 3 Dryers
  { id: 57, machineNumber: "Level 3-D1", type: "dryer", status: "available", block: "Block 3", location: "Level 3", createdAt: new Date() },
  { id: 58, machineNumber: "Level 3-D2", type: "dryer", status: "available", block: "Block 3", location: "Level 3", createdAt: new Date() },
  { id: 59, machineNumber: "Level 3-D3", type: "dryer", status: "available", block: "Block 3", location: "Level 3", createdAt: new Date() },
  { id: 60, machineNumber: "Level 3-D4", type: "dryer", status: "available", block: "Block 3", location: "Level 3", createdAt: new Date() },
  // Level 4 Dryers
  { id: 61, machineNumber: "Level 4-D1", type: "dryer", status: "available", block: "Block 3", location: "Level 4", createdAt: new Date() },
  { id: 62, machineNumber: "Level 4-D2", type: "dryer", status: "available", block: "Block 3", location: "Level 4", createdAt: new Date() },
  { id: 63, machineNumber: "Level 4-D3", type: "dryer", status: "in_use", block: "Block 3", location: "Level 4", createdAt: new Date() },
  { id: 64, machineNumber: "Level 4-D4", type: "dryer", status: "available", block: "Block 3", location: "Level 4", createdAt: new Date() },

  // Block 4 - 4 washers per level, 4 levels = 16 washers total
  // Level 1 Washers
  { id: 65, machineNumber: "Level 1-W1", type: "washer", status: "available", block: "Block 4", location: "Level 1", createdAt: new Date() },
  { id: 66, machineNumber: "Level 1-W2", type: "washer", status: "available", block: "Block 4", location: "Level 1", createdAt: new Date() },
  { id: 67, machineNumber: "Level 1-W3", type: "washer", status: "available", block: "Block 4", location: "Level 1", createdAt: new Date() },
  { id: 68, machineNumber: "Level 1-W4", type: "washer", status: "available", block: "Block 4", location: "Level 1", createdAt: new Date() },
  // Level 2 Washers
  { id: 69, machineNumber: "Level 2-W1", type: "washer", status: "available", block: "Block 4", location: "Level 2", createdAt: new Date() },
  { id: 70, machineNumber: "Level 2-W2", type: "washer", status: "available", block: "Block 4", location: "Level 2", createdAt: new Date() },
  { id: 71, machineNumber: "Level 2-W3", type: "washer", status: "available", block: "Block 4", location: "Level 2", createdAt: new Date() },
  { id: 72, machineNumber: "Level 2-W4", type: "washer", status: "available", block: "Block 4", location: "Level 2", createdAt: new Date() },
  // Level 3 Washers
  { id: 73, machineNumber: "Level 3-W1", type: "washer", status: "available", block: "Block 4", location: "Level 3", createdAt: new Date() },
  { id: 74, machineNumber: "Level 3-W2", type: "washer", status: "available", block: "Block 4", location: "Level 3", createdAt: new Date() },
  { id: 75, machineNumber: "Level 3-W3", type: "washer", status: "available", block: "Block 4", location: "Level 3", createdAt: new Date() },
  { id: 76, machineNumber: "Level 3-W4", type: "washer", status: "available", block: "Block 4", location: "Level 3", createdAt: new Date() },
  // Level 4 Washers
  { id: 77, machineNumber: "Level 4-W1", type: "washer", status: "available", block: "Block 4", location: "Level 4", createdAt: new Date() },
  { id: 78, machineNumber: "Level 4-W2", type: "washer", status: "available", block: "Block 4", location: "Level 4", createdAt: new Date() },
  { id: 79, machineNumber: "Level 4-W3", type: "washer", status: "available", block: "Block 4", location: "Level 4", createdAt: new Date() },
  { id: 80, machineNumber: "Level 4-W4", type: "washer", status: "available", block: "Block 4", location: "Level 4", createdAt: new Date() },
  // Level 1 Dryers
  { id: 81, machineNumber: "Level 1-D1", type: "dryer", status: "available", block: "Block 4", location: "Level 1", createdAt: new Date() },
  { id: 82, machineNumber: "Level 1-D2", type: "dryer", status: "available", block: "Block 4", location: "Level 1", createdAt: new Date() },
  { id: 83, machineNumber: "Level 1-D3", type: "dryer", status: "available", block: "Block 4", location: "Level 1", createdAt: new Date() },
  { id: 84, machineNumber: "Level 1-D4", type: "dryer", status: "available", block: "Block 4", location: "Level 1", createdAt: new Date() },
  // Level 2 Dryers
  { id: 85, machineNumber: "Level 2-D1", type: "dryer", status: "available", block: "Block 4", location: "Level 2", createdAt: new Date() },
  { id: 86, machineNumber: "Level 2-D2", type: "dryer", status: "available", block: "Block 4", location: "Level 2", createdAt: new Date() },
  { id: 87, machineNumber: "Level 2-D3", type: "dryer", status: "available", block: "Block 4", location: "Level 2", createdAt: new Date() },
  { id: 88, machineNumber: "Level 2-D4", type: "dryer", status: "available", block: "Block 4", location: "Level 2", createdAt: new Date() },
  // Level 3 Dryers
  { id: 89, machineNumber: "Level 3-D1", type: "dryer", status: "available", block: "Block 4", location: "Level 3", createdAt: new Date() },
  { id: 90, machineNumber: "Level 3-D2", type: "dryer", status: "available", block: "Block 4", location: "Level 3", createdAt: new Date() },
  { id: 91, machineNumber: "Level 3-D3", type: "dryer", status: "available", block: "Block 4", location: "Level 3", createdAt: new Date() },
  { id: 92, machineNumber: "Level 3-D4", type: "dryer", status: "available", block: "Block 4", location: "Level 3", createdAt: new Date() },
  // Level 4 Dryers
  { id: 93, machineNumber: "Level 4-D1", type: "dryer", status: "available", block: "Block 4", location: "Level 4", createdAt: new Date() },
  { id: 94, machineNumber: "Level 4-D2", type: "dryer", status: "available", block: "Block 4", location: "Level 4", createdAt: new Date() },
  { id: 95, machineNumber: "Level 4-D3", type: "dryer", status: "available", block: "Block 4", location: "Level 4", createdAt: new Date() },
  { id: 96, machineNumber: "Level 4-D4", type: "dryer", status: "available", block: "Block 4", location: "Level 4", createdAt: new Date() },

  // Block 5 - 4 washers per level, 4 levels = 16 washers total
  // Level 1 Washers
  { id: 97, machineNumber: "Level 1-W1", type: "washer", status: "available", block: "Block 5", location: "Level 1", createdAt: new Date() },
  { id: 98, machineNumber: "Level 1-W2", type: "washer", status: "available", block: "Block 5", location: "Level 1", createdAt: new Date() },
  { id: 99, machineNumber: "Level 1-W3", type: "washer", status: "in_use", block: "Block 5", location: "Level 1", createdAt: new Date() },
  { id: 100, machineNumber: "Level 1-W4", type: "washer", status: "available", block: "Block 5", location: "Level 1", createdAt: new Date() },
  // Level 2 Washers
  { id: 101, machineNumber: "Level 2-W1", type: "washer", status: "available", block: "Block 5", location: "Level 2", createdAt: new Date() },
  { id: 102, machineNumber: "Level 2-W2", type: "washer", status: "available", block: "Block 5", location: "Level 2", createdAt: new Date() },
  { id: 103, machineNumber: "Level 2-W3", type: "washer", status: "available", block: "Block 5", location: "Level 2", createdAt: new Date() },
  { id: 104, machineNumber: "Level 2-W4", type: "washer", status: "available", block: "Block 5", location: "Level 2", createdAt: new Date() },
  // Level 3 Washers
  { id: 105, machineNumber: "Level 3-W1", type: "washer", status: "available", block: "Block 5", location: "Level 3", createdAt: new Date() },
  { id: 106, machineNumber: "Level 3-W2", type: "washer", status: "available", block: "Block 5", location: "Level 3", createdAt: new Date() },
  { id: 107, machineNumber: "Level 3-W3", type: "washer", status: "available", block: "Block 5", location: "Level 3", createdAt: new Date() },
  { id: 108, machineNumber: "Level 3-W4", type: "washer", status: "available", block: "Block 5", location: "Level 3", createdAt: new Date() },
  // Level 4 Washers
  { id: 109, machineNumber: "Level 4-W1", type: "washer", status: "available", block: "Block 5", location: "Level 4", createdAt: new Date() },
  { id: 110, machineNumber: "Level 4-W2", type: "washer", status: "available", block: "Block 5", location: "Level 4", createdAt: new Date() },
  { id: 111, machineNumber: "Level 4-W3", type: "washer", status: "available", block: "Block 5", location: "Level 4", createdAt: new Date() },
  { id: 112, machineNumber: "Level 4-W4", type: "washer", status: "in_use", block: "Block 5", location: "Level 4", createdAt: new Date() },
  // Level 1 Dryers
  { id: 113, machineNumber: "Level 1-D1", type: "dryer", status: "available", block: "Block 5", location: "Level 1", createdAt: new Date() },
  { id: 114, machineNumber: "Level 1-D2", type: "dryer", status: "available", block: "Block 5", location: "Level 1", createdAt: new Date() },
  { id: 115, machineNumber: "Level 1-D3", type: "dryer", status: "available", block: "Block 5", location: "Level 1", createdAt: new Date() },
  { id: 116, machineNumber: "Level 1-D4", type: "dryer", status: "available", block: "Block 5", location: "Level 1", createdAt: new Date() },
  // Level 2 Dryers
  { id: 117, machineNumber: "Level 2-D1", type: "dryer", status: "available", block: "Block 5", location: "Level 2", createdAt: new Date() },
  { id: 118, machineNumber: "Level 2-D2", type: "dryer", status: "in_use", block: "Block 5", location: "Level 2", createdAt: new Date() },
  { id: 119, machineNumber: "Level 2-D3", type: "dryer", status: "available", block: "Block 5", location: "Level 2", createdAt: new Date() },
  { id: 120, machineNumber: "Level 2-D4", type: "dryer", status: "available", block: "Block 5", location: "Level 2", createdAt: new Date() },
  // Level 3 Dryers
  { id: 121, machineNumber: "Level 3-D1", type: "dryer", status: "available", block: "Block 5", location: "Level 3", createdAt: new Date() },
  { id: 122, machineNumber: "Level 3-D2", type: "dryer", status: "available", block: "Block 5", location: "Level 3", createdAt: new Date() },
  { id: 123, machineNumber: "Level 3-D3", type: "dryer", status: "available", block: "Block 5", location: "Level 3", createdAt: new Date() },
  { id: 124, machineNumber: "Level 3-D4", type: "dryer", status: "available", block: "Block 5", location: "Level 3", createdAt: new Date() },
  // Level 4 Dryers
  { id: 125, machineNumber: "Level 4-D1", type: "dryer", status: "available", block: "Block 5", location: "Level 4", createdAt: new Date() },
  { id: 126, machineNumber: "Level 4-D2", type: "dryer", status: "available", block: "Block 5", location: "Level 4", createdAt: new Date() },
  { id: 127, machineNumber: "Level 4-D3", type: "dryer", status: "available", block: "Block 5", location: "Level 4", createdAt: new Date() },
  { id: 128, machineNumber: "Level 4-D4", type: "dryer", status: "available", block: "Block 5", location: "Level 4", createdAt: new Date() },

  // Block 6 - 4 washers per level, 4 levels = 16 washers total
  // Level 1 Washers
  { id: 129, machineNumber: "Level 1-W1", type: "washer", status: "available", block: "Block 6", location: "Level 1", createdAt: new Date() },
  { id: 130, machineNumber: "Level 1-W2", type: "washer", status: "available", block: "Block 6", location: "Level 1", createdAt: new Date() },
  { id: 131, machineNumber: "Level 1-W3", type: "washer", status: "available", block: "Block 6", location: "Level 1", createdAt: new Date() },
  { id: 132, machineNumber: "Level 1-W4", type: "washer", status: "available", block: "Block 6", location: "Level 1", createdAt: new Date() },
  // Level 2 Washers
  { id: 133, machineNumber: "Level 2-W1", type: "washer", status: "available", block: "Block 6", location: "Level 2", createdAt: new Date() },
  { id: 134, machineNumber: "Level 2-W2", type: "washer", status: "available", block: "Block 6", location: "Level 2", createdAt: new Date() },
  { id: 135, machineNumber: "Level 2-W3", type: "washer", status: "available", block: "Block 6", location: "Level 2", createdAt: new Date() },
  { id: 136, machineNumber: "Level 2-W4", type: "washer", status: "available", block: "Block 6", location: "Level 2", createdAt: new Date() },
  // Level 3 Washers
  { id: 137, machineNumber: "Level 3-W1", type: "washer", status: "available", block: "Block 6", location: "Level 3", createdAt: new Date() },
  { id: 138, machineNumber: "Level 3-W2", type: "washer", status: "available", block: "Block 6", location: "Level 3", createdAt: new Date() },
  { id: 139, machineNumber: "Level 3-W3", type: "washer", status: "available", block: "Block 6", location: "Level 3", createdAt: new Date() },
  { id: 140, machineNumber: "Level 3-W4", type: "washer", status: "available", block: "Block 6", location: "Level 3", createdAt: new Date() },
  // Level 4 Washers
  { id: 141, machineNumber: "Level 4-W1", type: "washer", status: "available", block: "Block 6", location: "Level 4", createdAt: new Date() },
  { id: 142, machineNumber: "Level 4-W2", type: "washer", status: "available", block: "Block 6", location: "Level 4", createdAt: new Date() },
  { id: 143, machineNumber: "Level 4-W3", type: "washer", status: "available", block: "Block 6", location: "Level 4", createdAt: new Date() },
  { id: 144, machineNumber: "Level 4-W4", type: "washer", status: "available", block: "Block 6", location: "Level 4", createdAt: new Date() },
  // Level 1 Dryers
  { id: 145, machineNumber: "Level 1-D1", type: "dryer", status: "available", block: "Block 6", location: "Level 1", createdAt: new Date() },
  { id: 146, machineNumber: "Level 1-D2", type: "dryer", status: "available", block: "Block 6", location: "Level 1", createdAt: new Date() },
  { id: 147, machineNumber: "Level 1-D3", type: "dryer", status: "available", block: "Block 6", location: "Level 1", createdAt: new Date() },
  { id: 148, machineNumber: "Level 1-D4", type: "dryer", status: "available", block: "Block 6", location: "Level 1", createdAt: new Date() },
  // Level 2 Dryers
  { id: 149, machineNumber: "Level 2-D1", type: "dryer", status: "available", block: "Block 6", location: "Level 2", createdAt: new Date() },
  { id: 150, machineNumber: "Level 2-D2", type: "dryer", status: "available", block: "Block 6", location: "Level 2", createdAt: new Date() },
  { id: 151, machineNumber: "Level 2-D3", type: "dryer", status: "in_use", block: "Block 6", location: "Level 2", createdAt: new Date() },
  { id: 152, machineNumber: "Level 2-D4", type: "dryer", status: "available", block: "Block 6", location: "Level 2", createdAt: new Date() },
  // Level 3 Dryers
  { id: 153, machineNumber: "Level 3-D1", type: "dryer", status: "available", block: "Block 6", location: "Level 3", createdAt: new Date() },
  { id: 154, machineNumber: "Level 3-D2", type: "dryer", status: "available", block: "Block 6", location: "Level 3", createdAt: new Date() },
  { id: 155, machineNumber: "Level 3-D3", type: "dryer", status: "available", block: "Block 6", location: "Level 3", createdAt: new Date() },
  { id: 156, machineNumber: "Level 3-D4", type: "dryer", status: "available", block: "Block 6", location: "Level 3", createdAt: new Date() },
  // Level 4 Dryers
  { id: 157, machineNumber: "Level 4-D1", type: "dryer", status: "available", block: "Block 6", location: "Level 4", createdAt: new Date() },
  { id: 158, machineNumber: "Level 4-D2", type: "dryer", status: "available", block: "Block 6", location: "Level 4", createdAt: new Date() },
  { id: 159, machineNumber: "Level 4-D3", type: "dryer", status: "available", block: "Block 6", location: "Level 4", createdAt: new Date() },
  { id: 160, machineNumber: "Level 4-D4", type: "dryer", status: "available", block: "Block 6", location: "Level 4", createdAt: new Date() },

  // Block 7 & 8 (Joined) - Washers LHS
  { id: 161, machineNumber: "W-LHS-1", type: "washer", status: "available", block: "Block 7 & 8", location: "LHS from entry", createdAt: new Date() },
  { id: 162, machineNumber: "W-LHS-2", type: "washer", status: "available", block: "Block 7 & 8", location: "LHS from entry", createdAt: new Date() },
  { id: 163, machineNumber: "W-LHS-3", type: "washer", status: "available", block: "Block 7 & 8", location: "LHS from entry", createdAt: new Date() },
  { id: 164, machineNumber: "W-LHS-4", type: "washer", status: "available", block: "Block 7 & 8", location: "LHS from entry", createdAt: new Date() },

  // Block 7 & 8 - Washers RHS
  { id: 165, machineNumber: "W-RHS-1", type: "washer", status: "available", block: "Block 7 & 8", location: "RHS from entry", createdAt: new Date() },
  { id: 166, machineNumber: "W-RHS-2", type: "washer", status: "available", block: "Block 7 & 8", location: "RHS from entry", createdAt: new Date() },
  { id: 167, machineNumber: "W-RHS-3", type: "washer", status: "available", block: "Block 7 & 8", location: "RHS from entry", createdAt: new Date() },
  { id: 168, machineNumber: "W-RHS-4", type: "washer", status: "available", block: "Block 7 & 8", location: "RHS from entry", createdAt: new Date() },

  // Block 7 & 8 - Dryers LHS
  { id: 169, machineNumber: "D-LHS-1", type: "dryer", status: "available", block: "Block 7 & 8", location: "LHS from entry", createdAt: new Date() },
  { id: 170, machineNumber: "D-LHS-2", type: "dryer", status: "available", block: "Block 7 & 8", location: "LHS from entry", createdAt: new Date() },
  { id: 171, machineNumber: "D-LHS-3", type: "dryer", status: "available", block: "Block 7 & 8", location: "LHS from entry", createdAt: new Date() },
  { id: 172, machineNumber: "D-LHS-4", type: "dryer", status: "available", block: "Block 7 & 8", location: "LHS from entry", createdAt: new Date() },

  // Block 7 & 8 - Dryers RHS
  { id: 173, machineNumber: "D-RHS-1", type: "dryer", status: "available", block: "Block 7 & 8", location: "RHS from entry", createdAt: new Date() },
  { id: 174, machineNumber: "D-RHS-2", type: "dryer", status: "available", block: "Block 7 & 8", location: "RHS from entry", createdAt: new Date() },
  { id: 175, machineNumber: "D-RHS-3", type: "dryer", status: "available", block: "Block 7 & 8", location: "RHS from entry", createdAt: new Date() },
  { id: 176, machineNumber: "D-RHS-4", type: "dryer", status: "in_use", block: "Block 7 & 8", location: "RHS from entry", createdAt: new Date() },

  // Comm Hall - 3 Washers and 3 Dryers
  { id: 177, machineNumber: "W1", type: "washer", status: "available", block: "Comm Hall", location: "Common Area", createdAt: new Date() },
  { id: 178, machineNumber: "W2", type: "washer", status: "in_use", block: "Comm Hall", location: "Common Area", createdAt: new Date() },
  { id: 179, machineNumber: "W3", type: "washer", status: "available", block: "Comm Hall", location: "Common Area", createdAt: new Date() },
  { id: 180, machineNumber: "D1", type: "dryer", status: "available", block: "Comm Hall", location: "Common Area", createdAt: new Date() },
  { id: 181, machineNumber: "D2", type: "dryer", status: "available", block: "Comm Hall", location: "Common Area", createdAt: new Date() },
  { id: 182, machineNumber: "D3", type: "dryer", status: "available", block: "Comm Hall", location: "Common Area", createdAt: new Date() },
];

// Mock Bookings (for machines currently in use)
export const mockBookings: Booking[] = [
  {
    id: 1,
    userId: 1, // Koon Wei
    machineId: 2, // Block 2 Level 1-W2 (in_use)
    startTime: new Date(Date.now() - 20 * 60 * 1000),
    durationMinutes: 60,
    status: "active",
    notes: "Claiming soon!",
    telegramHandle: "@koonwei6767",
    notificationSent: false,
    pickupTime: null,
    createdAt: new Date(Date.now() - 20 * 60 * 1000),
  },
  
  {
    id: 6,
    userId: 1, // Koon Wei
    machineId: 17, // Block 2 Level 1-D1
    startTime: new Date(Date.now() - 20 * 60 * 1000),
    durationMinutes: 60,
    status: "active",
    notes: "Almost done",
    telegramHandle: "@koonwei6767",
    notificationSent: false,
    pickupTime: null,
    createdAt: new Date(Date.now() - 20 * 60 * 1000),
  },
  {
    id: 7,
    userId: 2, // Zi Phong
    machineId: 28, // Block 2 Level 3-D4
    startTime: new Date(Date.now() - 50 * 60 * 1000),
    durationMinutes: 45,
    status: "active",
    notes: "Sorry running late",
    telegramHandle: "@ziphong",
    notificationSent: false,
    pickupTime: null,
    createdAt: new Date(Date.now() - 50 * 60 * 1000),
  },
  {
    id: 8,
    userId: 4, // Bnsh Ahaskar
    machineId: 63, // Block 3 Level 4-D3
    startTime: new Date(Date.now() - 15 * 60 * 1000),
    durationMinutes: 40,
    status: "active",
    notes: null,
    telegramHandle: "@bnsh_ahaskar_king",
    notificationSent: false,
    pickupTime: null,
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: 9,
    userId: 5, // Ralves Paj
    machineId: 118, // Block 5 Level 2-D2
    startTime: new Date(Date.now() - 5 * 60 * 1000),
    durationMinutes: 30,
    status: "active",
    notes: null,
    telegramHandle: "@ralvespaj",
    notificationSent: false,
    pickupTime: null,
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: 10,
    userId: 3, // Current user
    machineId: 151, // Block 6 Level 2-D3
    startTime: new Date(Date.now() - 25 * 60 * 1000),
    durationMinutes: 30,
    status: "active",
    notes: "Be right back",
    telegramHandle: "@yourhandle",
    notificationSent: false,
    pickupTime: null,
    createdAt: new Date(Date.now() - 25 * 60 * 1000),
  },
  {
    id: 11,
    userId: 2, // Zi Phong
    machineId: 176, // Block 7 & 8 D-RHS-4
    startTime: new Date(Date.now() - 12 * 60 * 1000),
    durationMinutes: 30,
    status: "active",
    notes: "Using now",
    telegramHandle: "@ziphong",
    notificationSent: false,
    pickupTime: null,
    createdAt: new Date(Date.now() - 12 * 60 * 1000),
  },
  {
    id: 2,
    userId: 2, // Zi Phong
    machineId: 99, // Block 5 Level 1-W3 (in_use) - LATE
    startTime: new Date(Date.now() - 35 * 60 * 1000),
    durationMinutes: 30,
    status: "active",
    notes: "Coming back soon",
    telegramHandle: "@ziphong",
    notificationSent: false,
    pickupTime: null,
    createdAt: new Date(Date.now() - 35 * 60 * 1000),
  },
  {
    id: 3,
    userId: 4, // Bnsh Ahaskar
    machineId: 112, // Block 5 Level 4-W4 (in_use)
    startTime: new Date(Date.now() - 18 * 60 * 1000),
    durationMinutes: 45,
    status: "active",
    notes: null,
    telegramHandle: "@bnsh_ahaskar_king",
    notificationSent: false,
    pickupTime: null,
    createdAt: new Date(Date.now() - 18 * 60 * 1000),
  },
  {
    id: 4,
    userId: 5, // Ralves Paj
    machineId: 178, // Comm Hall W2 (in_use)
    startTime: new Date(Date.now() - 12 * 60 * 1000),
    durationMinutes: 30,
    status: "active",
    notes: null,
    telegramHandle: "@ralvespaj",
    notificationSent: false,
    pickupTime: null,
    createdAt: new Date(Date.now() - 12 * 60 * 1000),
  },
];

// Leaderboard Data
export const mockLeaderboard = [
  {
    userId: 1,
    username: "Koon Wei",
    displayName: "Koon Wei",
    email: "koonwei6767@gmail.com",
    telegramHandle: "@koonwei6767",
    points: 67,
    rank: 1,
    isCurrentUser: false,
  },
  {
    userId: 2,
    username: "Zi Goong",
    displayName: "Zi Phong",
    email: "ziphong@raffles.edu.sg",
    telegramHandle: "@ziphongbigbuttock",
    points: -10,
    rank: 2,
    isCurrentUser: false,
  },

  {
    userId: 4,
    username: "Bnsh_Ahaskar",
    displayName: "Bnsh Ahaskar",
    email: "Bnsh_Ahaskar@raffles.edu.sg",
    telegramHandle: "@bnsh_ahaskar_king",
    points: 15,
    rank: 4,
    isCurrentUser: false,
  },
  {
    userId: 5,
    username: "Ralves_Paj",
    displayName: "Ralves Paj",
    email: "ralvespaj666@raffles.edu.sg",
    telegramHandle: "@ralvespaj",
    points: -5,
    rank: 5,
    isCurrentUser: false,
  },
];

// Singapore Singlish Bot Responses
export const singlishResponses = [
  "Aiyo, your laundry done liao! Better go collect now before kena complaint ah.",
  "Eh bro/sis, machine free already. Don't say I never tell you hor.",
  "Wah lau, you still haven't collect ah? Later people complain then you know.",
  "Can lah can lah, take your time. But hor, if kena penalty don't blame me.",
  "Paiseh to rush you, but your clothes waiting for you already leh.",
  "Steady lah! Your timing on point. Keep it up!",
  "Oi! The MacRHine has CompleRHted its JoRHb! Come take your clothes now!",
  "Wah, you very fast ah! Sibei efficient! Here got plus one point for you!",
  "Alamak, late again ah? This one I need to minus point liao lor.",
  "Eh hello, your laundry not going to fold themselves you know!",
  "Chop chop! People waiting to use the machine leh!",
  "Good job sia, you came back on time! Not bad not bad!",
  "Haiyah, why you always last minute one? Later your clothes become wrinkly then you know.",
  "Swee la! Everything done already. Can go collect now!",
  "Boss, your washing done already. Please collect within 5 minutes can?",
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 1,
    fromUserId: 3, // Current user
    toUserId: 2, // Zi Goong
    message: "Hi! Are you collecting your laundry soon?",
    read: true,
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: 2,
    fromUserId: 2, // Zi Goong
    toUserId: 3, // Current user
    message: "Yes! Coming in 10 minutes, paiseh for taking so long!",
    read: true,
    createdAt: new Date(Date.now() - 25 * 60 * 1000),
  },
  {
    id: 3,
    fromUserId: 1, // Koon Wei
    toUserId: 3, // Current user
    message: "Thanks for the heads up about the machine!",
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
  },
];

// Helper function to get random Singlish response
export function getRandomSinglishResponse(): string {
  return singlishResponses[Math.floor(Math.random() * singlishResponses.length)];
}

// Helper function to get user by ID
export function getMockUserById(id: number) {
  const user = mockUsers.find(u => u.id === id);
  const profile = mockUserProfiles.find(p => p.userId === id);
  if (!user || !profile) return null;
  return {
    ...user,
    ...profile,
  };
}

// Helper function to get machine by ID
export function getMockMachineById(id: number) {
  return mockMachines.find(m => m.id === id);
}

// Helper function to get booking for a machine
export function getMockBookingForMachine(machineId: number) {
  // Check localStorage for active bookings first
  const bookingsJson = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  if (bookingsJson) {
    try {
      const storageBookings = JSON.parse(bookingsJson);
      const activeBooking = storageBookings.find((b: any) => b.machineId === machineId && b.status === "active");
      if (activeBooking) {
        return activeBooking;
      }
    } catch (e) {
      console.error("Failed to parse bookings from localStorage", e);
    }
  }
  // Fall back to mock bookings
  return mockBookings.find(b => b.machineId === machineId && b.status === "active");
}

// Helper function to create a booking in localStorage
export function createMockBooking(data: any): any {
  const currentUserJson = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  const currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;

  if (!currentUser) {
    throw new Error("User not logged in");
  }

  const bookingsJson = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  let bookings = bookingsJson ? JSON.parse(bookingsJson) : [];

  const newBooking = {
    id: Date.now(),
    userId: currentUser.id,
    machineId: data.machineId,
    startTime: new Date(),
    durationMinutes: data.durationMinutes || 60,
    status: "active",
    notes: data.notes || null,
    telegramHandle: currentUser.telegramHandle || null,
    notificationSent: false,
    pickupTime: null,
    createdAt: new Date(),
  };

  bookings.push(newBooking);
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

  return newBooking;
}

// Helper function to get user profile by user ID
export function getUserProfile(userId: number) {
  return mockUserProfiles.find(p => p.userId === userId);
}

// Helper function to calculate booking status (time remaining or time late)
export function calculateBookingStatus(booking: Booking) {
  const now = new Date();
  const endTime = new Date(new Date(booking.startTime).getTime() + booking.durationMinutes * 60000);
  const diff = endTime.getTime() - now.getTime();

  if (diff > 0) {
    const minutesRemaining = Math.floor(diff / 60000);
    const secondsRemaining = Math.floor((diff % 60000) / 1000);
    return {
      isLate: false,
      minutes: minutesRemaining,
      seconds: secondsRemaining,
      message: `${minutesRemaining}m ${secondsRemaining}s remaining`,
    };
  } else {
    const minutesLate = Math.floor(Math.abs(diff) / 60000);
    const secondsLate = Math.floor((Math.abs(diff) % 60000) / 1000);
    return {
      isLate: true,
      minutes: minutesLate,
      seconds: secondsLate,
      message: `${minutesLate}m ${secondsLate}s late`,
    };
  }
}

// Helper function to get all unique blocks
export function getAllBlocks(): string[] {
  const blocks = Array.from(new Set(mockMachines.map(m => m.block)));
  // Custom sort: Block 2, 3, 4, 5, 6, 7 & 8, then Comm Hall
  return blocks.sort((a, b) => {
    if (a === "Comm Hall") return 1;
    if (b === "Comm Hall") return -1;
    return a.localeCompare(b);
  });
}

// LocalStorage keys
export const STORAGE_KEYS = {
  CURRENT_USER: "rhaundry_current_user",
  BOOKINGS: "rhaundry_bookings",
  MESSAGES: "rhaundry_messages",
  USER_PROFILES: "rhaundry_user_profiles",
};
