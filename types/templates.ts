import { z } from "zod";

// Dashboard Card Schema
export const DashboardCardSchema = z.object({
  title: z.string(),
  metrics: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      trend: z.enum(["up", "down", "neutral"]).optional(),
      change: z.string().optional(),
    })
  ),
  lastUpdated: z.string().optional(),
});

// Chart Schema
export const ChartSchema = z.object({
  title: z.string(),
  type: z.enum(["line", "bar", "pie", "area"]),
  data: z.array(
    z.object({
      label: z.string(),
      value: z.number(),
    })
  ),
  unit: z.string().optional(),
});

// Action Card Schema
export const ActionCardSchema = z.object({
  title: z.string(),
  description: z.string(),
  actions: z.array(
    z.object({
      label: z.string(),
      type: z.enum(["primary", "secondary", "danger"]),
      action: z.string(),
    })
  ),
});

export type DashboardCardProps = z.infer<typeof DashboardCardSchema>;
export type ChartProps = z.infer<typeof ChartSchema>;
export type ActionCardProps = z.infer<typeof ActionCardSchema>;