const express = require('express');
const router = express.Router();

const {
        getMenuItems,
        addMenuItems,
        deleteMenuItem,
        updateMenuItem
    } = require('../controllers/menuItems');

router.route('/')
    .get( (req,res) => {
        res.send('Available routes: /menu, /menu/(id)');
    }        
    );
    
//localhost:3000/menu
router.route('/menu')
    .get(getMenuItems)
    .post(addMenuItems);

//localhost:3000/menu/4 --> executes PUT/GET on menu item with id === 4
router.route('/menu/:id')
    .put(updateMenuItem)
    .delete(deleteMenuItem);

module.exports = router;