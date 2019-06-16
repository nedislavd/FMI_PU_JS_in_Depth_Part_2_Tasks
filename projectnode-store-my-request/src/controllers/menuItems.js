const {menuItems} = require('../db/restaurantMenu.json');

module.exports = {

    getMenuItems: (req, res) => {
        res.json({menuItems});
    },
    addMenuItems: (req, res) => {
        const { name, itemType, price, available } = req.body;

        // POSTs the menu items to db.json
        menuItems.push({
            id: menuItems.length, // implement UUID or any "random" number generator here
            name,
            itemType,
            price,
            available
        })
        res.json({
            'success': true,
            'msg': 'Addition successful'
        });
    },
    updateMenuItem: (req,res) => {
        const { id } = req.params;
        const { name, type, price, available } = req.body;

        menuItems.forEach((product, i) => {
            if (product.id === Number(id)) {
                if (name) product.name = name;
                if (itemType) product.itemType = itemType;
                if (price) product.price = price;
                if (available) product.available = available;
            }
        });

        res.json({
            'success': true,
            'msg': 'Menu item update successful'
        });
        
    },
    deleteMenuItem: (req, res) => {

        const {id} = req.params;

        menuItems.forEach((product, i) => {
            
            if (product.id === Number(id)) {
                menuItems.splice(i,1);
            }
        });

        res.json({
            'success': true,
            'msg': 'Deletion successful'
        });
    }
};