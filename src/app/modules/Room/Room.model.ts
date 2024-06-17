import { Schema, model } from "mongoose";
import { TRoom } from "./Room.interface";

const roomSchema = new Schema<TRoom>({
    name: {type: String, required: true},
    roomNo: {type: Number, required: true, unique: true},
    floorNo: {type: Number, required: true},
    capacity: {type: Number, required: true},
    pricePerSlot: {type: Number, required: true},
    amenities: {type: [String], required: true},
    isDeleted: {type: Boolean, default: false},
});

roomSchema.pre("find", async function(next){
    this.find({isDeleted: {$ne: true}});

    next()
})
roomSchema.pre("findOne", async function(next){
    this.find({isDeleted: {$ne: true}});

    next()
})

export const Room = model<TRoom>("Room", roomSchema);