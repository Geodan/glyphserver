# Mapbox Glyphserver

This project serves glyphs (fonts and symbols) requested by mapbox like clients. These clients request glyphs as:


https://servername/glyphserverpath/Font%20Family%20A,Font%20Family%20B,Font%20Family%20N/range.pbf

This (very simple) server searches for the available range file in the order of the given font names and streams the first one found if available.

## prerequisites
* git
* npm / node
* 

## installation

```bash
git clone --recurse-submodules this_repo
cd this_repo
npm install
npm start
```

## configuration

The following environment variables are supported:
* PORT
    - The port the service will listen on, default 8484
* NOCORS
    - If true or 1, does not add CORS headers to service responses, default false. 