// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../phin
//   ../events
//   ../ws

import type { IJSONResponseOptions } from "phin";
import type { EventEmitter } from "events";
import type WebSocket from "ws";

export enum NodeStatus {
  /**
   * The websocket is currently connected to the node.
   */
  CONNECTED = 0,
  /**
   * The websocket is connecting to the node.
   */
  CONNECTING = 1,
  /**
   * The websocket is currently disconnected from the node.
   */
  DISCONNECTED = 2,
  /**
   * The websocket is currently trying to reconnect.
   */
  RECONNECTING = 3
}

export class Node {
  /**
   * The identifier for this node.
   */
  readonly id: string | number;
  /**
   * Whether to use wss/https
   */
  readonly secure: boolean;
  /**
   * The configured port of the andesite instance.
   */
  readonly port?: number;
  /**
   * The reconnection options for this node.
   */
  readonly reconnection: Required<ReconnectionOptions>;
  /**
   * The current reconnection try this node is on, or 0 if this player hasn't closed.
   */
  currentReconnect: number;
  /**
   * The resume id for this node.
   */
  connectionId?: number;
  /**
   * When a connection is closed, events will be buffered for up to the timeout specified here.
   */
  eventBuffer?: number;
  /**
   * The metadata of the andesite-instance.
   */
  meta?: NodeMetadata;
  /**
   * The stats of the andesite-instance.
   */
  stats?: NodeStats;

  /**
   * @param manager The manager instance.
   * @param options The options for this node.
   */
  constructor(manager: PlayerManager, options: Required<NodeOptions>);

  /**
   * The rest manager for this node.
   */
  get rest(): REST;

  /**
   * The active players for this node.
   */
  get players(): Map<string, Player>;

  /**
   * The host of this andesite instance.
   */
  get host(): string;

  /**
   * The authorization for this andesite instance.
   */
  get auth(): string | undefined;

  /**
   * The current status of this node.
   */
  get status(): NodeStatus;

  /**
   * The manager instance.
   */
  get manager(): PlayerManager;

  /**
   * Penalties of this node. The higher the return number, the larger load the andesite instance is handling.
   */
  get penalties(): number;

  /**
   * Whether the websocket is open / connected.
   */
  get connected(): boolean;

  /**
   * Creates a new player with the provided guildId and transport.
   *
   * @param guildId The guild id.
   * @param transport The transport to use.
   */
  createPlayer(guildId: string, transport?: PlayerTransport): Player;

  /**
   * Destroys a player that is assigned the provided guild id.
   *
   * @param guildId Guild ID of the player to destroy.
   */
  destroyPlayer(guildId: string): Promise<boolean>;

  /**
   * Send a packet to the andesite instance.
   * @param data The packet data
   * @param prioritize Whether to prioritize this packet.
   */
  sendWs(data: {
    op: string;
  } & Dictionary, prioritize?: boolean): Promise<void>;

  /**
   * Configure the event buffer for this session.
   * @param timeout Timeout for event buffering, in milliseconds
   */
  configureEventBuffer(timeout: number): Promise<number>;

  /**
   * Closes the websocket connection.
   * @returns {Promise<void>}
   */
  close(reason?: string): Promise<void>;

  /**
   * Connect this node to the andesite instance.
   */
  connect(userId: string): Promise<this>;

  /**
   * Reconnects to the andesite instance.
   */
  reconnect(): Promise<void>;

  /**
   * Emits a debug message.
   * @param message The debug message.
   * @private
   */
  debug(message: string): void;

  /**
   * Processes all of the queued payloads.
   * @private
   */
  protected processQueue(): Promise<void>;

  /**
   * Cleans up the websocket listeners.
   * @since 1.0.0
   * @private
   */
  protected cleanUp(): void;

  /**
   * queues a reconnect.
   * @protected
   */
  protected queueReconnect(): NodeJS.Timeout;
}

export class REST extends EventEmitter {
  /**
   * The node instance.
   */
  readonly node: Node;
  /**
   * Request analytics.
   */
  requests: {
    successful: number;
    failed: number;
  };

  /**
   * @param node The node this rest manager belongs to.
   */
  constructor(node: Node);

  /**
   * The base url for all requests.
   */
  get baseUrl(): string;

  /**
   * Returns stats about the andesite instance.
   */
  getStats(): Promise<NodeStats>;

  /**
   * Loads tracks with the provided identifier..
   * @param identifier The search identifier.
   */
  loadTracks(identifier: string): Promise<LoadTracksResponse>;

  /**
   * Returns metadata for the provided track.
   *
   * @param track The track to decode.
   */
  decodeTracks(track: string): Promise<TrackInfo>;
  /**
   * Returns metadata for the provided tracks.
   *
   * @param track The tracks to decode.
   */
  decodeTracks(track: string[]): Promise<TrackInfo[]>;

  /**
   * @param event
   * @param args
   */
  emit(event: string, ...args: any[]): boolean;

  /**
   * Makes a request to the andesite instance.
   *
   * @param endpoint The endpoint to make a request to.
   * @param options Additional request options
   */
  make<T>(endpoint: string, options?: RequestOptions): Promise<T>;
}

export type RequestOptions = Omit<IJSONResponseOptions, "url" | "parse"> & {
  data?: {
    toString(): string;
  };
  headers?: Dictionary<string>;
};

export abstract class Player extends EventEmitter {
  /**
   * The ID of the guild this player is for.
   */
  readonly guildId: string;
  /**
   * The ID of the channel this player is connected to.
   */
  channelId: string | null;
  /**
   * Whether this player is connected to a voice channel or not.
   */
  connected: boolean;
  /**
   * The state of this player.
   */
  state: PlayerState | null;
  /**
   * Whether this player is playing or not.
   */
  playing: boolean;
  /**
   * The current track that is playing.
   */
  track: string | null;
  /**
   * The timestamp in which this player started playing.
   */
  timestamp: number | null;

  /**
   * @param node The node instance.
   * @param guildId The guild id instance.
   */
  protected constructor(node: Node, guildId: string);

  /**
   * Creates a player.
   * @param transport The transport to use. Either "websocket" or "rest".
   * @param node The node.
   * @param guildId The guild id.
   */
  static create(transport: PlayerTransport, node: Node, guildId: string): Player;

  /**
   * The node this player is hosted on.
   */
  get node(): Node;

  /**
   * The player manager.
   */
  get manager(): PlayerManager;

  /**
   * The current filters that are applied.
   */
  get filters(): FilterChain;

  /**
   */
  on<E extends keyof PlayerEvents>(event: E, listener: (args: PlayerEvents[E]) => void): this;

  /**
   */
  once<E extends keyof PlayerEvents>(event: E, listener: (args: PlayerEvents[E]) => void): this;

  /**
   */
  off<E extends keyof PlayerEvents>(event: E, listener: (args: PlayerEvents[E]) => void): any;

  /**
   */
  emit<E extends keyof PlayerEvents>(event: E, ...args: PlayerEvents[E]): boolean;

  /**
   * Connects this player to a voice channel.
   * @param channel A voice channel object or id.
   * @param options Options for self deafening or muting.
   */
  connect(channel: string | {
    id: string;
  } | null, options?: ConnectOptions): Player;

  /**
   * Disconnects this player from the voice channel.
   */
  disconnect(): Player;

  /**
   * Fetches the player state from the andesite instance.
   */
  fetchState(): Promise<PlayerState>;

  /**
   * Handles an event sent by the andesite instance.
   * @param event The received event
   */
  handleEvent(event: Event): Promise<boolean>;

  /**
   * Handles a voice server or state update.
   * @param update The voice server or state update.
   */
  handleVoiceUpdate(update: DiscordVoiceServer | DiscordVoiceState): Promise<Player>;

  /**
   * Resumes this player.
   */
  resume(): Promise<Player>;

  /**
   * Plays a track on the guild.
   * @param track Base64 encoded lavaplayer track. If null, the player is stopped. Only use null for mixer players, for regular players use stop instead.
   * @param options
   * @returns {Promise<Player>}
   */
  abstract playTrack(track: string | {
    track: string;
  }, options?: PlayOptions): Promise<Player>;

  /**
   * Stops playing audio on the guild.
   */
  abstract stop(): Promise<Player>;

  /**
   * Update the pause state of this player.
   * @param state Whether or not to pause the player
   */
  abstract setPaused(state?: boolean): Promise<Player>;

  /**
   * Update the track position.
   * @param pos Timestamp to set the current track to, in milliseconds
   */
  abstract seekTo(pos: number): Promise<Player>;

  /**
   * Update the volume of this player.
   * @param volume Volume to set on the player
   */
  abstract setVolume(volume?: number): Promise<Player>;

  /**
   * Configures the audio filters for the guild
   * @param filters The filter map.
   */
  abstract setFilters(filters: FilterMap | FilterChain): Promise<Player>;

  /**
   * Update the player.
   * @param payload The player update data.
   */
  abstract update(payload: UpdatePlayer): Promise<Player>;

  /**
   * Destroys this player.
   */
  abstract destroy(): Promise<Player>;

  /**
   * Provides a voice server update event to the andesite instance..
   * @param update The voice update payload.
   */
  protected abstract sendVoiceServerUpdate(update: VoiceServerUpdate): Promise<Player>;

  /**
   * Used for general debugging.
   * @param message The debug message.
   * @protected
   */
  protected debug(message: string): void;
}

interface PlayerEvents {
  trackStart: [ TrackStartEvent ];
  trackStuck: [ TrackStuckEvent ];
  trackEnd: [ TrackEndEvent ];
  trackException: [ TrackExceptionEvent ];
  webSocketClosed: [ WebSocketClosedEvent ];
  move: [ string ];
}

export class FilterChain {

  /**
   * @param player The player instance.
   * @param base
   */
  constructor(player: Player, base?: FilterMap);

  /**
   * Runs several checks on a timescale filter.
   * @param timescale
   */
  static validateTimescale(timescale: Timescale): void;

  /**
   * Runs several checks on a tremolo filter.
   * @param tremolo
   */
  static validateTremolo(tremolo: Tremolo): void;

  /**
   * Runs several checks on a vibrato filter.
   * @param vibrato
   */
  static validateVibrato(vibrato: Vibrato): void;

  /**
   * Runs a check on a volume filter.
   * @param volume
   */
  static validateVolume({ volume }: Volume): void;

  /**
   * Returns true if the difference between a given value and the default.
   * is greater or equal to 0.01;.
   *
   * @param val Value to check.
   * @param def Default value.
   */
  static isSet(val: number, def: number): boolean;

  /**
   * The configured equalizer filter.
   */
  getEqualizer(): Equalizer | null;

  /**
   * Configures the equalizer filter.
   * @param bands The gain values for each band.
   */
  setEqualizer(...bands: number[]): FilterChain;
  /**
   * Set the equalizer bands.
   * @param bands The bands to supply.
   */
  setEqualizer(...bands: Band[]): FilterChain;

  /**
   * Returns whether the equalizer filter is enabled.
   */
  isEqualizerEnabled(): Boolean;

  /**
   * Get the current volume of the player.
   * @param toPercentage Whether to convert the current volume to a percentage (0-100 instead of 0-1)
   */
  getVolume(toPercentage?: boolean): number;

  /**
   * Configure the volume for this player.
   * @param volume The volume amount (must be 0-5) or null to reset the volume.
   */
  setVolume(volume: number | null): FilterChain;

  /**
   * The current karaoke configuration.
   */
  getKaraoke(): Karaoke | null;

  /**
   * Configure the karaoke filter.
   * @param level
   * @param monoLevel
   * @param filterBand
   */
  setKaraoke(level?: number, monoLevel?: number, filterBand?: number): FilterChain;
  /**
   * Configure the karaoke filter.
   * @param data The karaoke filter data.
   */
  setKaraoke(data?: Karaoke): FilterChain;

  /**
   * The current timescale configuration.
   */
  getTimescale(): Timescale | null;

  /**
   * Configure the timescale filter.
   * @param speed The track speed.
   * @param pitch The track pitch
   * @param rate The track rate
   */
  setTimescale(speed?: number, pitch?: number, rate?: number): FilterChain;
  /**
   * Configure the timescale filter.
   * @param data The timescale filter data.
   */
  setTimescale(data?: Timescale): FilterChain;

  /**
   * Check whether the timescale filter is enabled.
   */
  isTimescaleEnabled(): boolean;

  /**
   * The current karaoke configuration.
   */
  getTremolo(): Tremolo | null;

  /**
   * Configure the tremolo filter.
   * @param depth
   * @param frequency
   */
  setTremolo(depth?: number, frequency?: number): FilterChain;
  /**
   * Configure the tremolo filter.
   * @param data The tremolo filter data.
   */
  setTremolo(data?: Tremolo): FilterChain;

  /**
   * Check whether the tremolo filter is enabled.
   */
  isTremoloEnabled(): boolean;

  /**
   * Returns the configured vibrato filter, or null.
   */
  getVibrato(): Vibrato | null;

  /**
   * Configure the tremolo filter.
   * @param depth
   * @param frequency
   */
  setVibrato(depth?: number, frequency?: number): FilterChain;
  /**
   * Configures the vibrato filter.
   * @param data The vibrato filter data.
   */
  setVibrato(data?: Vibrato): FilterChain;

  /**
   * Check whether the vibrato filter is enabled.
   */
  isVibratoEnabled(): boolean;

  /**
   * Applies this filter chain to the player.
   */
  apply(): Promise<Player>;

  /**
   * Get the JSON representation for this filter chain.
   */
  toJSON(): FilterMap;
}

export enum ManagerEvent {
  NODE_READY = "nodeReady",
  NODE_ERROR = "nodeError",
  NODE_PACKET = "nodePacket",
  NODE_DISCONNECT = "nodeDisconnect",
  DEBUG = "debug"
}

export class PlayerManager extends EventEmitter {
  /**
   * All connected nodes.
   */
  readonly nodes: Map<string | number, Node>;
  /**
   * The send method used for disconnecting/connecting from voice channels.
   */
  readonly send: SendMethod;
  /**
   * The configured user id.
   */
  userId: string | null;
  /**
   * Default reconnection options.
   */
  reconnectionDefaults: Required<ReconnectionOptions>;
  /**
   * The default event buffer to use for all configured nodes.
   */
  eventBuffer?: number;

  /**
   * @param options The player manager options.
   */
  constructor(options: PlayerManagerOptions);

  /**
   * An array of ideal nodes, sorted by the amount of penalties one has.
   */
  get ideal(): Node[];

  /**
   * Every player spanning across each configured node..
   */
  get players(): Map<string, Player>;

  /**
   * Initializes every configured node.
   * @param userId The user id to use.
   */
  init(userId?: string | null): Promise<void>;

  /**
   * Creates a new player.
   *
   * @param guildId The guild id.
   * @param options The transport and node to use.
   *
   * @returns The created player.
   */
  createPlayer(guildId: string, options?: CreatePlayerOptions): Player;

  /**
   * Destroys a player.
   *
   * @param guildId The Guild ID of the player to destroy.
   *
   * @returns Whether the player was destroyed.
   */
  destroyPlayer(guildId: string): Promise<boolean>;

  /**
   * Used for providing voice server updates to lavalink.
   * @param update The voice server update sent by Discord.
   */
  serverUpdate(update: DiscordVoiceServer): Promise<void>;

  /**
   * Used for providing voice state updates to lavalink
   * @param update The voice state update sent by Discord.
   */
  stateUpdate(update: DiscordVoiceState): Promise<void>;
}

export interface PlayerManager {
  on<E extends keyof PlayerManagerEvents>(event: E, listener: (...args: PlayerManagerEvents[E]) => void): this;

  once<E extends keyof PlayerManagerEvents>(event: E, listener: (...args: PlayerManagerEvents[E]) => void): this;

  off<E extends keyof PlayerManagerEvents>(event: E, listener: (...args: PlayerManagerEvents[E]) => void): this;

  emit<E extends keyof PlayerManagerEvents>(event: E, ...args: PlayerManagerEvents[E]): boolean;
}

interface PlayerManagerEvents {
  [ManagerEvent.NODE_READY]: [ Node ];
  [ManagerEvent.NODE_DISCONNECT]: [ Partial<Omit<WebSocket.CloseEvent, "reason">> & {
    reason: string;
  }, Node ];
  [ManagerEvent.NODE_PACKET]: [ Dictionary, Node ];
  [ManagerEvent.NODE_ERROR]: [ Error | string, Node ];
  [ManagerEvent.DEBUG]: [ string ];
}

export namespace Stats {
  interface Players {
    total: number;
    playing: number;
  }

  interface VirtualMachine {
    name: string;
    vendor: string;
    version: string;
  }

  interface Spec {
    name: string;
    vendor: string;
    version: string;
  }

  interface Version {
    feature: number;
    interim: number;
    update: number;
    patch: number;
    pre: string | null;
    build: number;
    optional: string;
  }

  interface Runtime {
    uptime: number;
    pid: number;
    managementSpecVersion: string;
    name: string;
    vm: VirtualMachine;
    spec: Spec;
    version: Version;
  }

  interface OperatingSystem {
    processors: number;
    name: string;
    arch: string;
    version: string;
  }

  interface CPU {
    andesite: number;
    system: number;
  }

  interface ClassLoading {
    loaded: number;
    totalLoaded: number;
    unloaded: number;
  }

  interface Thread {
    running: number;
    daemon: number;
    peak: number;
    totalStarted: number;
  }

  interface Compilation {
    name: string;
    totalTime: number;
  }

  interface Heap {
    init: number;
    used: number;
    committed: number;
    max: number;
  }

  interface NonHeap {
    init: number;
    used: number;
    committed: number;
    max: number;
  }

  interface Memory {
    pendingFinalization: number;
    heap: Heap;
    nonHeap: NonHeap;
  }

  interface GarbageCollector {
    name: string;
    collectionCount: number;
    collectionTime: number;
    pools: string[];
  }

  interface CollectionUsage {
    init: number;
    used: number;
    committed: number;
    max: number;
  }

  interface PeakUsage {
    init: number;
    used: number;
    committed: number;
    max: number;
  }

  interface Usage {
    init: number;
    used: number;
    committed: number;
    max: number;
  }

  interface MemoryPool {
    name: string;
    type: string;
    collectionUsage: CollectionUsage;
    collectionUsageThreshold?: number;
    collectionUsageThresholdCount?: number;
    peakUsage: PeakUsage;
    usage: Usage;
    usageThreshold?: number;
    usageThresholdCount?: number;
    managers: string[];
  }

  interface MemoryManager {
    name: string;
    pools: string[];
  }

  interface FrameStatistic {
    user: string;
    guild: string;
    success: number;
    loss: number;
  }
}

export interface NodeStats {
  players: Stats.Players;
  runtime: Stats.Runtime;
  os: Stats.OperatingSystem;
  cpu: Stats.CPU;
  classLoading: Stats.ClassLoading;
  thread: Stats.Thread;
  compilation: Stats.Compilation;
  memory: Stats.Memory;
  gc: Stats.GarbageCollector[];
  memoryPools: Stats.MemoryPool[];
  memoryManagers: Stats.MemoryManager[];
  frameStats: Stats.FrameStatistic[];
}

export interface NodeMetadata {
  /**
   * List of plugins loaded.
   */
  loadedPlugins: string[];
  /**
   * Region defined in the config.
   */
  nodeRegion: string;
  /**
   * Revision version of the node.
   */
  versionRevision: string;
  /**
   * List of sources enabled in the config.
   */
  enabledSources: string[];
  /**
   * Commit hash of the node.
   */
  versionCommit: string;
  /**
   * Build number provided by the CI
   */
  versionBuild: number;
  /**
   * Major version of the node.
   */
  versionMajor: string;
  /**
   * Minor version of the node.
   */
  versionMinor: string;
  /**
   * Version of the node.
   */
  version: string;
  /**
   * ID defined in the config.
   */
  nodeId: string;
}

export interface Equalizer {
  /**
   * Array of bands to configure.
   */
  bands: Band[];
}

export interface Band {
  /**
   * Band number to configure
   */
  band: number;
  /**
   * Value to set for the band.
   * @default 0
   */
  gain?: number;
}

export interface Karaoke {
  /**
   * @default 1
   */
  level?: number;
  /**
   * @default 1
   */
  monoLevel?: number;
  /**
   * @default 220
   */
  filterBand?: number;
  /**
   * @default 100
   */
  filterWidth?: number;
}

export interface Volume {
  volume: number;
}

export interface Timescale {
  /**
   * Speed to play music at.
   * @default 1
   */
  speed?: number;
  /**
   * Pitch to set.
   * @default 1
   */
  pitch?: number;
  /**
   * Rate to set.
   * @default 1
   */
  rate?: number;
}

export interface Tremolo {
  /**
   * @default 2
   */
  frequency?: number;
  /**
   * @default 0.5
   */
  depth?: number;
}

export interface Vibrato {
  /**
   * @default 2
   */
  frequency?: number;
  /**
   * @default 0.5
   */
  depth?: number;
}

export interface StackFrame {
  /**
   * Name of the class loader.
   */
  classLoader: string | null;
  /**
   * Name of the module.
   */
  moduleName: string | null;
  /**
   * Version of the module.
   */
  moduleVersion: string | null;
  /**
   * Name of the class.
   */
  className: string;
  /**
   * Name of the method.
   */
  methodName: string;
  /**
   * Name of the source file.
   */
  fileName: string | null;
  /**
   * Line in the source file.
   */
  lineNumber: number | null;
  /**
   * Pretty printed version of this frame, as it would appear on Throwable#printStackTrace
   */
  pretty: string;
}

export interface LoadTracksResponse {
  /**
   * Type* of the response
   */
  loadType: LoadTypes;
  /**
   * Loaded tracks.
   */
  tracks: TrackInfo[] | null;
  /**
   * Metadata of the loaded playlist.
   */
  playlistInfo: PlaylistInfo | null;
  /**
   * Error that occurred while loading tracks.
   */
  cause: Exception | null;
  /**
   * Severity of the error.
   */
  severity: string | null;
}

export interface FilterMap {
  equalizer?: Equalizer | null;
  karaoke?: Karaoke | null;
  timescale?: Timescale | null;
  tremolo?: Tremolo | null;
  vibrato?: Vibrato | null;
  volume?: Volume | null;
}

export interface EventBase {
  type: EventType;
  guildId: string;
  userId: string;
}

export interface TrackStartEvent extends EventBase {
  type: "TrackStartEvent";
  track: string;
}

export interface TrackEndEvent {
  type: "TrackEndEvent";
  track: string;
  reason: TrackEndReason;
  mayStartNext: boolean;
}

export interface TrackExceptionEvent {
  type: "TrackExceptionEvent";
  track: string;
  error: string;
  exception: Exception;
}

export interface TrackStuckEvent {
  type: "TrackStuckEvent";
  track: string;
  thresholdMs: number;
}

export interface WebSocketClosedEvent {
  type: "WebSocketClosedEvent";
  reason: string;
  code: number;
  byRemote: boolean;
}

export interface Exception {
  /**
   * Class of the error.
   */
  class: string;
  /**
   * Message of the error.
   */
  message: string | null;
  /**
   * Stacktrace of the error.
   */
  stack: StackFrame;
  /**
   * Cause of the error.
   */
  cause: Exception | null;
  /**
   * Suppressed errors.
   */
  suppressed: Exception[];
}

export interface PlaylistInfo {
  /**
   * Name of the playlist.
   */
  name: string;
  /**
   * Index of the selected track in the tracks array, or null if no track is selected.
   */
  selectedTrack: number;
}

export interface TrackInfo {
  /**
   * Base64 encoded track.
   */
  track: string;
  /**
   * Metadata of the track.
   */
  info: TrackMetadata;
}

export interface TrackMetadata {
  /**
   * Class name of the lavaplayer track.
   */
  class: string;
  /**
   * Title of the track.
   */
  title: string;
  /**
   * Author of the track.
   */
  author: string;
  /**
   * Duration of the track, in milliseconds.
   */
  length: number;
  /**
   * Identifier of the track.
   */
  identifier: string;
  /**
   * URI of the track.
   */
  uri: string;
  /**
   * Whether or not the track is a livestream
   */
  isStream: boolean;
  /**
   * Whether or not the track supports seeking
   */
  isSeekable: boolean;
  /**
   * Current position of the track
   */
  position: number;
}

export interface MixerPlayer {
  /**
   * Current unix timestamp on the node.
   */
  time: string;
  /**
   * Position of the current playing track, or null if nothing is playing
   */
  position?: number;
  /**
   * Whether or not the player is paused
   */
  paused: boolean;
  /**
   * The volume of the player.
   */
  volume: number;
  /**
   * Map of filter name -> filter settings for each filter present
   */
  filters: FilterMap;
}

export interface DiscordVoiceServer {
  token: string;
  guild_id: string;
  endpoint: string;
}

export interface DiscordVoiceState {
  channel_id?: string;
  user_id: string;
  guild_id: string;
  session_id: string;
}

export interface CreatePlayerOptions {
  /**
   * The player transport to use.
   */
  transport?: PlayerTransport;
  /**
   * The node to use, defaults to the first ideal node.
   */
  node?: string;
}

export interface PlayerManagerOptions {
  /**
   * The nodes to connect to.
   */
  nodes?: NodeOptions[];
  /**
   * A method used for sending voice updates to Discord.
   */
  send: SendMethod;
  /**
   * The user id for the client.
   */
  userId?: string;
  /**
   * Default reconnection options.
   */
  reconnectionDefaults?: ReconnectionOptions;
  /**
   * When a connection is closed, events will be buffered for up to the timeout specified.
   */
  eventBuffer?: number;
}

export interface PlayerState {
  /**
   * Current unix timestamp on the node.
   */
  time: string;
  /**
   * Position of the current playing track, or null if nothing is playing
   */
  position: number | null;
  /**
   * Whether or not the player is paused
   */
  paused: boolean;
  /**
   * The volume of the player.
   */
  volume: boolean;
  /**
   * Map of filter name -> filter settings for each filter present.
   */
  filters: FilterMap;
  /**
   * Map of mixer player id -> mixer player
   */
  mixer: MixerPlayer;
  /**
   * Whether or not the mixer is the current source of audio.
   */
  mixerEnabled: boolean;
}

export interface UpdatePlayer {
  /**
   * Whether or not to pause the player.
   */
  pause?: boolean;
  /**
   * Timestamp to set the current track to, in milliseconds.
   */
  position?: number;
  /**
   * Volume to set on the player.
   */
  volume?: number;
  /**
   * Configuration for the filters.
   */
  filters?: FilterMap;
}

export interface PlayOptions {
  /**
   * Timestamp, in milliseconds, to start the track.
   */
  start?: number;
  /**
   * Timestamp, in milliseconds, to end the track
   */
  end?: number;
  /**
   * Whether or not to pause the player
   */
  pause?: boolean;
  /**
   * Volume to set on the player
   */
  volume?: number;
  /**
   * If true and a track is already playing/paused, this command is ignored
   */
  noReplace?: boolean;
}

export interface ConnectOptions {
  /**
   * Whether to automatically mute the bot when joining.
   */
  selfMute?: boolean;
  /**
   * Whether to automatically deafen the bot when joining.
   */
  selfDeaf?: boolean;
}

export interface VoiceServerUpdate {
  /**
   * Session ID for the current user in the event's guild.
   */
  sessionId: string;
  /**
   * ID of the guild.
   */
  guildId: string;
  /**
   * Voice server update event sent by discord.
   */
  event: DiscordVoiceServer;
}

export interface NodeOptions {
  /**
   * The host name of the node.
   */
  host: string;
  /**
   * The port that the node is on.
   */
  port: number | string;
  /**
   * The authorization used for connecting. You can omit this if you didn't set a password.
   */
  auth?: string;
  /**
   * The identifier for this node..
   */
  id?: string | number;
  /**
   * Whether to use https/wss.
   */
  secure?: boolean;
  /**
   * How often to ping the andesite instance, in milliseconds. This can be omitted if you do not want to ping the node.
   */
  pingInterval?: number;
  /**
   * When a connection is closed, events will be buffered for up to the timeout specified.
   */
  eventBuffer?: number;
  /**
   * The reconnection options for this node.
   */
  reconnection?: ReconnectionOptions;
}

export interface ReconnectionOptions {
  /**
   * The delay between each reconnection.
   */
  delay?: number;
  /**
   * The total number of reconnection tries.
   */
  tries?: number;
}

/**
 * "websocket" - controls the player via websocket
 * "rest"      - controls the player through the rest api.
 */
export type PlayerTransport = "websocket" | "rest";
export type Dictionary<T = any> = Record<string, T>;
export type SendMethod = (id: string, payload: any) => any;
export type Event = TrackStartEvent | TrackEndEvent | TrackExceptionEvent | TrackStuckEvent | WebSocketClosedEvent;
export type TrackEndReason = "FINISHED" | "LOAD_FAILED" | "STOPPED" | "REPLACED" | "CLEANUP";
export type EventType =
  "TrackStartEvent"
  | "TrackEndEvent"
  | "TrackExceptionEvent"
  | "TrackStuckEvent"
  | "WebSocketClosedEvent";
/**
 * - TRACK_LOADED - tracks will only have one track, playlistInfo, cause and severity will be null.
 * - SEARCH_RESULT - cause and severity will be null.
 * - PLAYLIST_LOADED - cause and severity will be null.
 * - NO_MATCHES - all other fields will be null.
 * - LOAD_FAILED - tracks and playlistInfo will be null.
 */
export type LoadTypes = "TRACK_LOADED" | "SEARCH_RESULT" | "PLAYLIST_LOADED" | "NO_MATCHES" | "LOAD_FAILED";

