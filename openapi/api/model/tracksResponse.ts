/**
 * Generated by orval v6.22.1 🍺
 * Do not edit manually.
 * BackendEntryPoint
 * API for managing users, tracks, and projects for a code evaluation platform.
 * OpenAPI spec version: 1.0.0
 */
import type { Track } from './track';

export interface TracksResponse {
  sub?: string;
  tracks?: Track[];
}