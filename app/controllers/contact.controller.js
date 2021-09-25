const { handle } = require("express/lib/router");
const { Contact } = require("../models");

// nCreate and Save a new Contact
exports.create = async(req,res) => {
    //Validate request
    if(!req.body.name) {
        return next(new BadRequestError(400,"Name can not be empty"));
    }

    //Create a contact
    const contact = new contact ({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        favorive: String(req.body.favorive).toLowerCase() == "true",
    });

    if(error) {
        return next(new BadRequestError(500,
            "An error occurrred while creating the contact"));
    }

    return res.send(document);
    res.send({ message: "create handler"});
    contact.save();
};

//Retrieve all contacts of a user from the database.
exports.findAll = async(req, res, next) => {
    const condition = { };
    const name = req.query.name;
    if(name) {
        condition.name =  { $regex: new ReqExp(name), $options:"i"};
    }

    const [error,documents] = await handle(Contact.find(condition));

    if(error) {
        return next(new BadRequestError(500,
            "An error occurred while retrieving contacts"));
    }

    return res.send(document);

    res.send({ message: "findOne handler"})
};

//Find a single contact with an id
exports.findOne = async(req, res, next) => {
    const condition = {
        _id: req.parmas.id,
    };

    const [error, document] = await handle(Contact.findOne(condition));

    if(error) {
        return next (new BadRequestError(500,
            `Error retrieving contact with id=${req.parmas.id}`));

    }
    
    if(!document) {
        return next(new BadRequestError(404, "Contact not found"));
    }
    res.send({message: "findOne hander "} );
};

//Update a contact by the id in the request
exports.update = async(req, res, next) => {
    if(!req.body) {
        return next(new BadRequestError(400,
            "Data to update can not be empty"));
    }

    const condition = {
        _id: req.parmas.id,
    };

    const [error, document] = await handle(
        Contact.findOneAndUpdate(condition, req.body, {
            new: true,
        })
    );

    if(error) {
        return next( new BadRequestError(500,
            `Error retrieving contact with id=${req.parmas.id}`));
        }
    if(!document) {
        return next(new BadRequestError(404,"Contact not found"));

    }

    return     res.send({ message: "Contact was updated successfully" });
};

//Delete a contact with the specified id in the request


//Delete all contacts of a user from the database
exports.delete = async(req, res) => {
    const condition = {
        _id: req.parmas.id,
    };

    const [error, document] = await handle(
        Contact.findOneAndDelete(condition)
    );

    if(error) {
        return next(new BadRequestError(500,
            `Could not datele contact with id=${req.parmas.id}`));
    }

    if(!document) {
        return next(new BadRequestError(404, "Contact not found"));
    }

    return res.send({message: "Contact was deleted successfully"});
};

exports.deleteAll = async(req, res) => {

    const [error, data] = await handle(
        Contact.deleteMany({ })
    );

    if(error) {
        return next(new BadRequestError(500,
            "An error occurred while removing all contacts"));
    }

    return res.send({ message:`${data.deleteCount} contacts were daleted successfully`,});
};

// Find all favorite contacts of a user
exports.findAllFavorite = async(req,res) => {
    const [error, documents] = await handle(
        Contact.find({favorive:true,})
    );
    if(error) {
        return next(new BadRequestError(500,
            "An error occurred while retrieving favorite contacts"));
    }
    return res.send(documents);
    res.send({message: "findAllFavorite handler"});
};



