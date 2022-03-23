const shortid = require("shortid");
const WatchModel = require("../models/watch");
const WatchController = {
  // GET: /
  sayHelloFromServer: (req, res) => {
    res.send("Hello");
  },

  // GET: /api/v1/watches
  getAllWatchList: async (req, res) => {
    try {
      const { limit } = req.query;

      if (limit) {
        const watchList = await WatchModel.find({}).limit(parseInt(limit));
        if (watchList) {
          res.status(200).json(watchList);
        } else {
          res.status(400).json({ watchList: [], message: "Can not found" });
        }
      } else {
        const watchList = await WatchModel.find({});
        if (watchList) {
          res.status(200).json(watchList);
        } else {
          res.status(400).json({ watchList: [], message: "Can not found" });
        }
      }

      return;
    } catch (error) {
      console.log(error);
    }
  },

  // GET: /api/v1/categories
  getAllCategories: async (req, res) => {
    try {
      res.status(200).json([
        {
          id: 1,
          title: "Womens Watches",
        },
        {
          id: 2,
          title: "Mens Watches",
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  },

  // GET: /api/v1/categories/:category_ids
  getWatchesByCategory: async (req, res) => {
    try {
      const { category_ids } = req.params;
      // res.json(category_ids);
      const watchesByCategoryIds = await WatchModel.find({
        categories: category_ids,
      });
      if (watchesByCategoryIds.length > 0) {
        res.status(200).json(watchesByCategoryIds);
      } else {
        res.status(402).json({ message: "Null" });
      }
    } catch (error) {
      console.log(error);
    }
  },

  // GET: /api/v1/watches/:color
  getWatchesByColor: async (req, res) => {
    try {
      const { color } = req.params;
      const watchesWithColor = await WatchModel.find({
        color: color,
      });
      if (watchesWithColor.length > 0) {
        res.status(200).json(watchesWithColor);
      } else {
        res.status(402).json({ message: "Null" });
      }
    } catch (error) {
      console.log(error);
    }
  },

  // POST: /api/v1/watches
  // Post watch to save on database
  postWatch: async (req, res) => {
    try {
      const {
        title,
        color,
        price,
        quantities,
        imageUrl,
        categories,
        description,
      } = req.body;

      const nid = shortid.generate();
      const add = await WatchModel.create({
        id: nid,
        title: title,
        color: color,
        price: price,
        imageUrl: imageUrl,
        quantities: Number(quantities),
        categories: [categories],
        href: nid + "/" + imageUrl,
        description: description,
      });

      if (add) {
        res.status(200).json({ message: "Added" });
      } else {
        res.status(400).json({ message: "Can not add." });
      }
    } catch (error) {
      console.log(error);
    }
  },

  //UPDATE.PACTH: /api/v1/watches/:watch_ids
  updateWatchById: async (req, res) => {
    try {
      const { watch_ids } = req.params;

      const updatedWatches = await WatchModel.findByIdAndUpdate(
        {
          id: watch_ids,
        },
        {
          $set: {
            title: req.body.title,
            color: req.body.color,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            quantities: Number(req.body.quantities),
            description: req.body.description,
          },
        },
        {
          new: true,
        }
      );

      if (updatedWatches) {
        res.status(200).json({ message: true });
      } else {
        res.status(400).json({ message: false });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ Error: "Something went wrong!" });
    }
  },

  // DETELE: /api/v1/watches/:watch_ids
  deleteWatchById: async (req, res) => {
    try {
      const { watch_ids } = req.params;
      const deleted = await WatchModel.findOneAndDelete({ id: watch_ids });
      if (deleted) {
        res.status(200).json({
          message: "Deleted",
        });
      } else {
        res.status(400).json({ message: "Can not delete." });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = WatchController;
