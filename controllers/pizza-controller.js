const {Pizza} = require('../models');

const pizzaController = {
    // get all pizzas     
    getAllPizza(req,res){
        Pizza.find({})
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one pizza by id
    getPizzaById({params},res){
        Pizza.findOne({_id: params.id})
            .then(dbPizzaData => {
                // if no pizza is found, send 404
                if(!dbPizzaData){
                    res.status(404).json({message:'No pizza found with that id.'});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create a new pizza
    createPizza({body},res){
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },

    // update pizza by id
    updatePizza({params,body},res){
        Pizza.findOneAndUpdate({_id:params.id},body,{new:true})
        // note the findOneAndUpdate method finds the document we want to update, updates it, then returns the new document.
        // if we don't set that third parameter to new:true, it will return the original document.
        // by setting the parameter to true, we are instructing Mongoose to return the new version of the document.
        .then(dbPizzaData => {
            if(!dbPizzaData){
                res.status(404).json({message:'No pizza found with that id.'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete a pizza
    deletePizza({params},res){
        Pizza.findOneAndDelete({_id:params.id})
        .then(dbPizzaData => {
            if(!dbPizzaData){
                res.status(404).json({message:'No pizza found with that id.'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }


 // note: we could also use the syntax: getAllPizza:function(){...} for all of these methods.

  
};


module.exports = pizzaController;