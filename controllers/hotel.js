import Hotel from "../models/Hotel.js";

//CREATE
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const saveHotel = await newHotel.save();
    res.status(200).send(saveHotel);
  } catch (error) {
    next(error);
  }
};

//UPDATE
export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send(updateHotel);
  } catch (error) {
    next(error);
  }
};

//DELETE
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).send("hotel deleted");
  } catch (error) {
    next(error);
  }
};

//GET ONE
export const getOneHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).send(hotel);
  } catch (error) {
    next(error);
  }
};

//GET ALL
export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find(req.query).limit(req.query.limit);
    res.status(200).send(hotels);
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map(city => {
        return Hotel.countDocuments({ city: city });
      })
    );
    console.log(list);
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res
      .status(200)
      .json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount }
      ]);
  } catch (err) {
    next(err);
  }
};
