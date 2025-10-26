const fooditemModel=require('../Models/FoodItemModel')
const restaurantModel=require('../Models/RestaurantModel')

async function handleAddNewItems(req,res) {
    const restaurantId=req.params?.id;
    const restaurant=await restaurantModel.find({_id:restaurantId});
    const body=req.body;
    const file=req.file;

    const fooditem=await fooditemModel.create({
        itemImg:file.path,
        name:body.name,
        description:body.description,
        category:body.category,
        actualprice:body.actualPrice,
        restaurant:restaurant[0]._id,
        discountprice:body.discountPrice,
        type:body.type
    })

    await restaurantModel.updateOne({_id:restaurantId},{$push:{fooditems:fooditem._id}});
    return res.json({success:'Item Added'})
}

async function handleGetAllFooditem(req,res) {
    const allfoodItems=await fooditemModel.find({});
    return res.json({allfoodItems:allfoodItems});
}

async function handleGetPizzas(req,res) {
    const Pizzas=await fooditemModel.find({category:"Pizza"});
    return res.json({Pizzas:Pizzas});
}

async function handleGetBurgers(req,res) {
    const Burgers=await fooditemModel.find({category:"Burger"});
    return res.json({Burgers:Burgers});
}

async function handleGetDesserts(req,res) {
    const Desserts=await fooditemModel.find({category:"Dessert"});
    return res.json({Desserts:Desserts});
}

async function handleGetDrinks(req,res) {
    const Drinks=await fooditemModel.find({category:"Drinks"});
    return res.json({Drinks:Drinks});
}

async function handleGetSnacks(req,res) {
    const Snacks=await fooditemModel.find({category:"Snacks"});
    return res.json({Snacks:Snacks});
}

async function handleGetMeals(req,res) {
    const Meals=await fooditemModel.find({category:"Meal"});
    return res.json({Meals:Meals});
}


module.exports={handleAddNewItems,handleGetAllFooditem,handleGetPizzas,handleGetBurgers,handleGetDesserts,handleGetDrinks,handleGetSnacks,handleGetMeals}