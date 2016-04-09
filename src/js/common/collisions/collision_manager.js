function CollisionManager(game, tilemap) {
    this._game = game;
    this._tilemap = tilemap;
}

// Common properties and methods for LayerManager object
CollisionManager.prototype = {
    // A reference to the tilemap
    _tilemap: null,

    // A reference to the game object
    _game: null,

    collide: [1193, 1073, 822, 824, 1204, 1088, 892, 814, 1093],


    // Method to load a layer
    load(name) {
        this._active = this._tilemap.createLayer(name);
    },

    // Method to bind a particular tile to load a different layer
    bindCollisionToLayer(id) {
        this._tilemap.setCollision(id);
    },

    // Getter method. Treats a method as a property. Doing LayerManager.active will run this function :)
    get active() {
        return this._active;
    }
};

// Export LayerManager object
module.exports = CollisionManager;
// I'll let you fill this one out.
// Come up with an abstract class to manage all the collisions for your tilemaps.
// The reason we do this is to keep a centralized place to handle repetitive tasks.
// Come up with the API (Application Programming Interface): How you interact with the class first.
// The goal is to create a registry (an array) where you keep track of all collisions that need to happen
// And on the update loop, simply do a CollisionManager.update(); to handle your collisions.