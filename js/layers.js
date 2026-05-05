addLayer("L", {
    name: "层级",
    symbol: "L",
    position: 0,
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            layerPoint: new Decimal(0)
        }
    },
    color: "#7FAFFF",
    requires: new Decimal(1),
    resource: "层级",
    baseResource: "层级点数",
    baseAmount() {
        return player.L.layerPoint
    },
    type: "static",
    base() {
        return new Decimal(2)
    },
    exponent: 1,
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    autoPrestige() {
        return hasMilestone('L', 1) && !hasMilestone('L', 3)
    },
    row: 0,
    update(diff) {
        player.L.layerPoint = getBuyableAmount("L", 11).add(getBuyableAmount("L", 12))
        if (player.L.points.gte(3)) {
            player.L.points = new Decimal(3)
        }
    },
    milestones: {
        1: {
            requirementDescription: "0层级",
            effectDescription: "自动购买层级，每一个层级都会解锁一个层级，上限为3个层级",
            done() {
                return player.L.points.gte(0)
            }
        },
        2: {
            requirementDescription: "0层级点数",
            effectDescription: "自动购买层级点数",
            done() {
                return player.L.layerPoint.gte(0)
            }
        },
        3: {
            requirementDescription: "1层级",
            effectDescription: "第一个里程碑的第一个效果没有作用",
            done() {
                return player.L.points.gte(1)
            }
        },
        4: {
            requirementDescription: "1层级点数",
            effectDescription: "第二个里程碑没有作用",
            done() {
                return player.L.layerPoint.gte(1)
            }
        }
    },
    buyables: {
        11: {
            title: "点数",
            display() {
                return "价格：" + format(new Decimal(10).pow(new Decimal(10).pow(getBuyableAmount("L", 11)))) + "点数"
            },
            unlocked() {
                return true
            },
            canAfford() {
                return player.points.gte(new Decimal(10).pow(new Decimal(10).pow(getBuyableAmount("L", 11))))
            },
            buy() {
                let cost = new Decimal(10).pow(new Decimal(10).pow(getBuyableAmount("L", 11)))
                player.points = player.points.minus(cost)
                setBuyableAmount("L", 11, getBuyableAmount("L", 11).add(1))
            }
        },
        12: {
            title: "层级点数",
            display() {
                return "价格：达到" + format(new Decimal(2).pow(getBuyableAmount("L", 11))) + "层级点数"
            },
            unlocked() {
                return true
            },
            canAfford() {
                return player.L.layerPoint.gte(new Decimal(2).pow(getBuyableAmount("L", 11)))
            },
            buy() {
                setBuyableAmount("L", 12, getBuyableAmount("L", 12).add(1))
            }
        }
    },
    tabFormat: {
        "里程碑": {
            content: [
                "main-display",
                "blank",
                ["prestige-button", ""],
                "blank",
                "resource-display",
                "blank",
                "blank",
                "milestones"
            ]
        },
        "层级点数": {
            content: [
                "main-display",
                "blank",
                ["prestige-button", ""],
                "blank",
                "resource-display",
                "blank",
                "blank",
                "buyables"
            ]
        }
    },
    automateStuff() {
        if (hasMilestone("L", 2) && !hasMilestone('L', 4)) {
            if (this.buyables[11].canAfford()) {
                let target = player.points.log(10).log(10).floor().add(1)
                setBuyableAmount("L", 11, target.min(getBuyableAmount("L", 11).add(10)))
            }
            if (this.buyables[12].canAfford()) {
                let target2 = player.L.layerPoint.log(2).floor().add(1)
                setBuyableAmount("L", 12, target2.min(getBuyableAmount("L", 12).add(10)))
            }
        }
    },
    layerShown() {
        return true
    }
})