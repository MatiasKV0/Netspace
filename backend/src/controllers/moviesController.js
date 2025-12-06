import { client } from "../config/db.js";
import { ObjectId } from "mongodb";

const collection = client.db("sample_mflix").collection("movies");

const getListResults = async (req, res) => {
  const genre = req.query.genre;
  const limit = parseInt(req.query.limit) || 10;

  const results = await collection
    .find({ genres: genre })
    .sort({ year: -1 })
    .limit(limit)
    .toArray();

  res.json({ results });
};

const getSeries = async (req, res) => {
  const vars = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10,
    genre: req.query.genre || "Genres",
    order: req.query.order || "Newest",
  };

  const skip = (vars.page - 1) * vars.limit;

  let sortOrder;
  switch (vars.order) {
    case "Newest":
      sortOrder = { year: -1 };
      break;
    case "Oldest":
      sortOrder = { year: 1 };
      break;
    case "A-Z":
      sortOrder = { title: 1 };
      break;
    case "Z-A":
      sortOrder = { title: -1 };
      break;
    default:
      sortOrder = { year: -1 };
      break;
  }

  const query =
    vars.genre !== "Genres"
      ? { type: "series", genres: vars.genre }
      : { type: "series" };

  const results = await collection
    .find(query)
    .sort(sortOrder)
    .skip(skip)
    .limit(vars.limit)
    .toArray();

  const total = await collection.countDocuments(query);

  res.json({
    results,
    total,
    page: vars.page,
    totalPages: Math.ceil(total / vars.limit),
  });
};

const getMovies = async (req, res) => {
  const vars = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10,
    genre: req.query.genre || "Genres",
    order: req.query.order || "Newest",
  };

  const skip = (vars.page - 1) * vars.limit;

  let sortOrder;
  switch (vars.order) {
    case "Newest":
      sortOrder = { year: -1 };
      break;
    case "Oldest":
      sortOrder = { year: 1 };
      break;
    case "A-Z":
      sortOrder = { title: 1 };
      break;
    case "Z-A":
      sortOrder = { title: -1 };
      break;
    default:
      sortOrder = { year: -1 };
      break;
  }

  const query =
    vars.genre !== "Genres"
      ? { type: "movie", genres: vars.genre }
      : { type: "movie" };

  const results = await collection
    .find(query)
    .sort(sortOrder)
    .skip(skip)
    .limit(vars.limit)
    .toArray();

  const total = await collection.countDocuments(query);

  res.json({
    results,
    total,
    page: vars.page,
    totalPages: Math.ceil(total / vars.limit),
  });
};

const getNovedades = async (req, res) => {
  const vars = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10,
    genre: req.query.genre || "Genres",
    order: req.query.order || "Newest",
  };

  const skip = (vars.page - 1) * vars.limit;

  let sortOrder;
  switch (vars.order) {
    case "Newest":
      sortOrder = { year: -1 };
      break;
    case "Oldest":
      sortOrder = { year: 1 };
      break;
    case "A-Z":
      sortOrder = { title: 1 };
      break;
    case "Z-A":
      sortOrder = { title: -1 };
      break;
    default:
      sortOrder = { year: -1 };
      break;
  }

  const query = vars.genre !== "Genres" ? { genres: vars.genre } : {};

  const results = await collection
    .find(query)
    .sort(sortOrder)
    .skip(skip)
    .limit(vars.limit)
    .toArray();

  const total = await collection.countDocuments({});

  res.json({
    results,
    total,
    page: vars.page,
    totalPages: Math.ceil(total / vars.limit),
  });
};

const getDetails = async (req, res) => {
  const id = req.params.id;
  const getId = ObjectId.createFromHexString(id);
  const result = await collection.findOne({ _id: getId });

  res.json(result);
};

const getResults = async (req, res) => {
  const search = req.query.search;
  const limit = parseInt(req.query.limit) || 10;

  const results = await collection
    .find({ title: { $regex: search, $options: "i" } })
    .limit(limit)
    .sort({ year: -1 })
    .toArray();

  res.json({
    results,
    totalPages: 1,
  });
};

export {
  getListResults,
  getResults,
  getSeries,
  getMovies,
  getNovedades,
  getDetails
};
