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

module.exports={handleAddNewItems}