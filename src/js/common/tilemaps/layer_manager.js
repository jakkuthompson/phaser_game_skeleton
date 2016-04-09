// Constructor function
// new LayerManager(game, tilemap);
function LayerManager(game, tilemap) {
    this._game = game;
    this._tilemap = tilemap;
}

// Common properties and methods for LayerManager object
LayerManager.prototype = {
    // Current active layer. _ -> private, don't use directly
    _active: null,

    // A reference to the tilemap
    _tilemap: null,

    // A reference to the game object
    _game: null,
    
    // Method to load a layer
    load(name) {
        console.log("Loading layer: ", name);

        // If a layer is already loaded, destroy it.
        if (this._active) {
            this._active.destroy();
        }

        // Load new layer and set it as the active layer
        this._active = this._tilemap.createLayer(name);
        this._active.debug = true;
    },
    
    // Method to bind a particular tile to load a different layer
    bindTileToLayer(id, layer, callback) {
        this._tilemap.setTileIndexCallback(id, () => {
            this.load(layer);
            // If you want something to happen after a layer has been loaded (something custom),
            // pass it as a callback.
            if (callback) {
                callback();
            }
        });
    },
    
    destroy() {
        this._active.destroy();
    },
    
    // Getter method. Treats a method as a property. Doing LayerManager.active will run this function :)
    get active() {
        return this._active;
    }
};

// Export LayerManager object
module.exports = LayerManager;