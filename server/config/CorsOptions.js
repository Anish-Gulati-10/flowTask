// Cross Origin Resource Sharing
const whitelist = [
  "https://flow-task-delta.vercel.app",
  "http://localhost:5500",
  "http://localhost:5173",
];
const CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = CorsOptions;
