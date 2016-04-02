function LayerManager(game, tilemap) {
    this.game = game;
    this.tilemap = tilemap;
}

LayerManager.prototype = {
    active: null,
    load: (name) => {
        if (this.active) {
            this.active.destroy();
        }

        this.active = this.map.createLayer(name);
    }
};

module.exports = LayerManager;


layerm = new LayerManager(game, tilemap);

layerm.load('layer');

layerm.bindTile(id, layer);