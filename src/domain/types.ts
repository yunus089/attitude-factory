import type { StatusBadge } from "@/src/domain/utility-types";

export type WarRoomSummary = {
  title: string;
  briefing: string;
  progress: number;
  currentWinner: string;
  weakestLane: string;
  videoPolicy: string;
  nextDecision: string;
  stats: Array<{
    label: string;
    value: string;
  }>;
};

export type MetricStripItem = {
  label: string;
  value: string;
  color: string;
};

export type QueueItem = {
  id: string;
  title: string;
  persona: string;
  personaColor: string;
  status: StatusBadge;
  owner: string;
  due: string;
  nextAction: string;
};

export type DecisionItem = {
  id: string;
  signal: string;
  tone: StatusBadge["tone"];
  title: string;
  persona: string;
  reason: string;
  action: string;
  color: string;
};

export type PersonaSummary = {
  name: string;
  lane: string;
  status: string;
  color: string;
  image?: string;
  nextAction: string;
  scores: Array<{
    label: string;
    value: number;
  }>;
};

export type SignalRadarRow = {
  id: string;
  label: string;
  persona: string;
  days: Array<{
    day: number;
    label: string;
    color: string;
  }>;
};
