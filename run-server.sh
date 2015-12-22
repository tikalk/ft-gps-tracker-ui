#!/bin/bash
export PORT=3000
export MANAGEMENT_HOST=localhost
export MANAGEMENT_PORT=3080
export GPS_HOST=localhost
export GPS_PORT=8080
export SEGMENT_HOST=localhost
export SEGMENT_PORT=9080
export EVENT_HOST=localhost
export EVENT_PORT=8080

nodejs server.js
