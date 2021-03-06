[andesitejs](../../README.md) / [Exports](../../modules.md) / [api/types](../../modules/api_types.md) / PlayerState

# Interface: PlayerState

[api/types](../../modules/api_types.md).PlayerState

## Hierarchy

* **PlayerState**

## Table of contents

### Properties

- [filters](types.playerstate.md#filters)
- [mixer](types.playerstate.md#mixer)
- [mixerEnabled](types.playerstate.md#mixerenabled)
- [paused](types.playerstate.md#paused)
- [position](types.playerstate.md#position)
- [time](types.playerstate.md#time)
- [volume](types.playerstate.md#volume)

## Properties

### filters

• **filters**: [*FilterMap*](types.filtermap.md)

Map of filter name -> filter settings for each filter present.

Defined in: [api/types.ts:615](https://github.com/Lavaclient/andesite/blob/7241e28/src/api/types.ts#L615)

___

### mixer

• **mixer**: [*MixerPlayer*](types.mixerplayer.md)

Map of mixer player id -> mixer player

Defined in: [api/types.ts:620](https://github.com/Lavaclient/andesite/blob/7241e28/src/api/types.ts#L620)

___

### mixerEnabled

• **mixerEnabled**: *boolean*

Whether or not the mixer is the current source of audio.

Defined in: [api/types.ts:625](https://github.com/Lavaclient/andesite/blob/7241e28/src/api/types.ts#L625)

___

### paused

• **paused**: *boolean*

Whether or not the player is paused

Defined in: [api/types.ts:605](https://github.com/Lavaclient/andesite/blob/7241e28/src/api/types.ts#L605)

___

### position

• **position**: *null* \| *number*

Position of the current playing track, or null if nothing is playing

Defined in: [api/types.ts:600](https://github.com/Lavaclient/andesite/blob/7241e28/src/api/types.ts#L600)

___

### time

• **time**: *string*

Current unix timestamp on the node.

Defined in: [api/types.ts:595](https://github.com/Lavaclient/andesite/blob/7241e28/src/api/types.ts#L595)

___

### volume

• **volume**: *boolean*

The volume of the player.

Defined in: [api/types.ts:610](https://github.com/Lavaclient/andesite/blob/7241e28/src/api/types.ts#L610)
