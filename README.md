```
# How does socket communication work

## Connection

📱Client                           🖥️ Server (NestJS)
   │                                 │
   │     (1) io('server address')    │
   ├──────────── connect ──────────▶ │  <== handshake
   │                                 │
   │   (2) emit('event', data)       │
   ├──────────── message ──────────▶ │
   │                                 │
   │   (3) on('event', callback)     │
   ◀────────── message ───────────── ┤


## DisConnection

📱 Client                     🖥️ Server (NestJS)
   │                              │
   │   FIN (TCP exit call)        │
   ├─────────────────────────────▶│
   │                              │
   │◀────── ACK (Accecpt exit) ───│
   │                              │
   │◀─────────   FIN  ────────────│
   │                              │
   ├──────────   ACK  ───────────▶│
   │                              │
```
