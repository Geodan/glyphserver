# Mapbox Glyphserver

This project serves glyphs (fonts and symbols) requested by mapbox like clients. These clients request glyphs as:


https://servername/glyphserverpath/Font%20Family%20A,Font%20Family%20B,Font%20Family%20N/range.pbf

This (very simple) server searches for the available range file in the order of the given font names and streams the first one found if available.

## prerequisites
* git
* npm / node
* _output directory generated by https://github.com/openmaptiles/fonts
    ```
    git clone https://github.com/openmaptiles/fonts
    cd fonts
    npm intall
    node generate.js
    ```

## installation
```
git clone this_repo
cd this_repo
npm install
# now copy the _ouput directory generated by the openmaptiles/fonts project (see prerequisites)
npm start
```
