module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            name: {
                type: String,
                required: [true, "Contact name is required"],
            },
            email: {
                type:String,
                trim: true,
                lowercase: true,
            },
            address:String,
            phone:String,
            favorite: Boolean,
        },
        {timestamps:true}
    );

    //Replace _id with id and remove __V
    schema.method("toJSON",function() {
        const { __V, _id, ...object} = this.toObject();
        object.id= _id;
        return object;
    });

    return mongoose.model("contact", schema);
};