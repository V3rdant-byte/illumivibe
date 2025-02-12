# IllumiVibe - A Personal Light Effect Editor and Vibe Creator
by CPEN 391 Group 30
## Project Description
This project will allow users to create, edit, and share (social media integration) linear light effects of different patterns for uploading to programmable led strips. In addition, it allows for auto light effect pre-generation for chosen songs from Spotify, and the generated effect is stored until users choose to delete them.

### Design Overview
Design diagrams of frontend, backend and hardware are in the folder [`figures`](figures).
![Design Overview](https://user-images.githubusercontent.com/20661066/162269417-0f1f3a63-29b2-437b-a8bd-967c3bc95883.png)


## Frontend

To view the frontend, go to https://illumivibe.netlify.app for the deployed version or,
1. cd into frontend/
2. make sure you have NodeJS
3. run npm install
4. run npm start
5. view local deployment at localhost:3000

## Hardware

To check the code for hardware, 
1. cd into /hardware/
2. The project file for the FPGA design is ws2811.qpf
3. The Nios software is in /hardware/software/
4. The lua scripts on the WiFi module is in  /hardware/scripts/

## Backend
[https://illumivibe.cf/](https://illumivibe.cf/)

### Deployment

Make sure the key `illumivibe.pem` is in the project root directory.

#### Deploy
``./gradlew deploy``

This will connect to and run `startserver.sh` on `illumivibe.cf`.

#### Fetch Log
``./gradlew fetchLog``

### Scripts
#### startserver.sh
This is the script for running the new server process. A version of it with credentials is stored at `illumivibe.cf`. 

## Spotify API (research/spotify)
This repo is for experimenting with different Spotify Web APIs. 

## Contributions

#### Grant Li
- React Web Application
  - All of the HTML and CSS
  - Redux and Redux Thunk as local storage
  - Action interaction handling with Javascript, on-demand rendering
- Frontend API Integration
  - Device, Light Effect, Spotify feature related endpoints
#### Huanfei Chang
- Hardware integration
- WS2812 driver integration
- Account related API integration in frontend
- Music related endpoints:
  - Get authorization
  - Retrieve the related data from Spotify Web API endpoint
#### Juntong
- All server features & database operations
  - Login, user library, light effect, device, Spotify
- Writing OpenAPI specifications
- Passing light effects to the hardware
#### Jacob
- Algorithm rendering the light effect (hardware)
  - One finite state machine to send data to ws2812 driver using start-finish protocol
  - One top-level state machine to iterate over the 12 units of leds
- Light effect data decode and generation with Nios (software)
  - PIOs sending color data to the LED strip accelerator
  - Two timer interrupt service routines to implement flashing and shifting
#### Juntong & Jacob - RFS board Wifi module integration (software)
- Flash the RFS board with firmware from NodeMCU
- Wrote scripts to build Wifi connection and poll requests
- Connect and parse the data received from JTAG on NIOS

## Outside Sources Declaration

1. WS2812 Driver (hardware/Blink_mode.v modified, hardware/tb.v copied, hardware/util.v copied): https://github.com/dhrosa/ws2812-verilog/blob/master/
2. Timer Interrupt (hardware/software/led_software/timer.c modified): https://titanwolf.org/Network/Articles/Article?AID=1e239fca-bf5a-4cfc-89fb-a13d9e861453
3. More Utils (hardware/Generate_Organ_Tone_Divided_Clk32.sc copied, hardware/SevenSegmentDispayDecoder.sv copied): Jacob Yang's CPEN311 labs
4. Base 64 Decoding Library (hardware/software/led_software/base64.h copied, hardware/software/led_software/base64.c copied): https://github.com/rafagafe/base64
5. NodeMCU (This is the link to request for the firmware to flash the RFS board): https://nodemcu.readthedocs.io/en/release/
6. Lua Intialization Script (hardware/scripts/init.lua modified): https://nodemcu.readthedocs.io/en/release/upload/#initlua
