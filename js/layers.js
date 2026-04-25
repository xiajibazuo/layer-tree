addLayer("L", {
    name: "层级", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		layerPoint: new Decimal(0)
    }},
    color: "#7FAFFF",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "层级", // Name of prestige currency
    baseResource: "层级点数", // Name of resource prestige is based on
    baseAmount() {return player.L.layerPoint}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    getResetGain() {
      
        return formatWhole(tmp[this.layer].layerPoint.log(2))
        
    },
    getNextAt: function(){
        return Decimal.pow(2,player.L.points)
	},
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}
})
