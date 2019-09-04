# CSGO Aware

A game state integration test for cs:go. Using a node js server listening for POST requests from the game. Which then sends appropriate data over usb serial.
The arduino code responds to these signals and lights up an array of leds using the neopixel library.

# Setup

Client computer needs a cfg file, in the CS:GO installtion directory, with the appropriate parameters to work.

[gamestate_integration_consolesample.cfg](https://github.com/jensgerntholtz/csgo-aware/blob/develop/gamestate_integration_consolesample.cfg)

cfg should be placed under Counter-Strike `[PATH TO INSTALLTION]\Global Offensive\csgo\cfg`

The next time the game launches it will detect the change.

# Running the Endpoint

In the root directory of this repo run `node mysample.js [port of your arduino]`

for reference here is a list of game state integrations

```"map_round_wins" "1"          // history of round wins
"map" "1"                     // mode, map, phase, team scores
"player_id" "1"               // steamid
"player_match_stats" "1"      // scoreboard info
"player_state" "1"            // armor, flashed, equip_value, health, etc.
"player_weapons" "1"          // list of player weapons and weapon state
"provider" "1"                // info about the game providing info 
"round" "1"                   // round phase and the winning team

// Below this line must be spectating or observing
"allgrenades" "1"             // grenade effecttime, lifetime, owner, position, type, velocity
"allplayers_id" "1"           // the steam id of each player
"allplayers_match_stats" "1"  // the scoreboard info for each player
"allplayers_position" "1"     // player_position but for each player
"allplayers_state" "1"        // the player_state for each player
"allplayers_weapons" "1"      // the player_weapons for each player
"bomb" "1"                    // location of the bomb, who's carrying it, dropped or not
"phase_countdowns" "1"        // time remaining in tenths of a second, which phase
"player_position" "1"         // forward direction, position for currently spectated player```
