import Room from "../models/Room.js";

export const addRoom = async (req, res) => {
  try {
    const { roomId, hotel, price, capacity, facilities, booked_date } =
      req.body;
    const newRoom = new Room({
      roomId,
      hotel,
      price,
      capacity,
      facilities,
      booked_date,
    });
    const saveRoom = await newRoom.save();
    res.status(201).json(saveRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllRoom = async (req, res) => {
  try {
    const rooms = await Room.find({});

    res.status(200).json(rooms);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedRoom);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
