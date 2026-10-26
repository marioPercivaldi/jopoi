import { err, ok, type Result } from "@/domain/shared/result";

export const DONATION_STATUSES = [
  "pending",
  "accepted",
  "rejected",
  "cancelled",
  "in_route",
  "not_collected",
  "collected",
  "in_transfer",
  "received",
  "allocated",
  "delivered",
] as const;

export type DonationStatus = (typeof DONATION_STATUSES)[number];

/**
 * Allowed transitions. Anything not listed here is rejected.
 * - Home pickup: accepted -> in_route -> collected (or not_collected -> accepted when rescheduled).
 * - Drop-off point: accepted -> collected when the drop-off point receives it, then in_transfer.
 * - Final center: received -> allocated (recipient chosen) -> delivered.
 */
const TRANSITIONS: Record<DonationStatus, readonly DonationStatus[]> = {
  pending: ["accepted", "rejected", "cancelled"],
  accepted: ["in_route", "collected", "cancelled"],
  rejected: [],
  cancelled: [],
  in_route: ["collected", "not_collected"],
  not_collected: ["accepted"],
  collected: ["in_transfer", "received"],
  in_transfer: ["received"],
  received: ["allocated"],
  allocated: ["delivered"],
  delivered: [],
};

export type InvalidTransition = {
  code: "invalid_transition";
  from: DonationStatus;
  to: DonationStatus;
};

export function canTransition(from: DonationStatus, to: DonationStatus): boolean {
  return TRANSITIONS[from].includes(to);
}

export function transition(
  from: DonationStatus,
  to: DonationStatus,
): Result<DonationStatus, InvalidTransition> {
  return canTransition(from, to) ? ok(to) : err({ code: "invalid_transition", from, to });
}

export function isFinal(status: DonationStatus): boolean {
  return TRANSITIONS[status].length === 0;
}
