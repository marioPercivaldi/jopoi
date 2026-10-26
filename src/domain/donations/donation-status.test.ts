import { describe, expect, it } from "vitest";

import {
  DONATION_STATUSES,
  canTransition,
  isFinal,
  transition,
} from "@/domain/donations/donation-status";

describe("donation status machine", () => {
  it("follows the home pickup path to delivered", () => {
    const path = [
      "pending",
      "accepted",
      "in_route",
      "collected",
      "received",
      "allocated",
      "delivered",
    ] as const;
    for (let i = 1; i < path.length; i++) {
      expect(canTransition(path[i - 1], path[i])).toBe(true);
    }
  });

  it("goes through a transfer when dropped off at a drop-off point", () => {
    expect(canTransition("accepted", "collected")).toBe(true);
    expect(canTransition("collected", "in_transfer")).toBe(true);
    expect(canTransition("in_transfer", "received")).toBe(true);
  });

  it("lets a failed pickup be rescheduled", () => {
    expect(canTransition("in_route", "not_collected")).toBe(true);
    expect(canTransition("not_collected", "accepted")).toBe(true);
  });

  it("rejects skipping steps with an explicit error", () => {
    expect(transition("pending", "delivered")).toEqual({
      ok: false,
      error: { code: "invalid_transition", from: "pending", to: "delivered" },
    });
  });

  it("does not allow cancelling once the donation is on its way", () => {
    expect(canTransition("in_route", "cancelled")).toBe(false);
  });

  it("treats delivered, rejected and cancelled as final", () => {
    const finals = DONATION_STATUSES.filter(isFinal);
    expect(finals.sort()).toEqual(["cancelled", "delivered", "rejected"]);
  });
});
