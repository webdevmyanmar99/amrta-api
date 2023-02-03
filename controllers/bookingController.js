import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

export const addBooking = async (req, res) => {
  try {
    const { room, start, end } = req.body;
    const newBooking = new Booking({
      room,
      start,
      end,
    });
    const saveBooking = await newBooking.save();
    res.status(201).json(saveBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});

    res.status(200).json(bookings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedBooking);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAvailableRooms = async (req, res) => {
  try {
    const { from_date, to_date } = req.params;

    const bookings = await Booking.find({
      $or: [
        { start: { $gte: from_date, $lte: to_date } },
        {
          end: { $gte: from_date, $lte: to_date },
        },
        {
          $and: [{ start: { $lte: from_date } }, { end: { $gte: to_date } }],
        },
      ],
    }).select("room");

    const roomIds = bookings.map((b) => b.room);

    const availableRooms = await Room.find({
      _id: {
        $nin: roomIds,
      },
    }   );

    res.status(200).json(availableRooms);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
