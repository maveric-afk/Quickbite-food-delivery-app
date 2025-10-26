const express=require('express')
const {handleGetAllFooditem,handleGetBurgers,handleGetDesserts,handleGetDrinks,handleGetMeals,handleGetPizzas,handleGetSnacks}=require('../controllers/fooditem')

const router=express.Router();

router.get('/all',handleGetAllFooditem);
router.get('/pizzas',handleGetPizzas);
router.get('/burgers',handleGetBurgers);
router.get('/desserts',handleGetDesserts);
router.get('/snacks',handleGetSnacks);
router.get('/drinks',handleGetDrinks);
router.get('/meals',handleGetMeals);


module.exports=router