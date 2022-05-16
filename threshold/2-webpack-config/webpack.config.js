const path = require("path");
const basePath = __dirname;
const distPath = "dist";

module.exports = {
    //Modo de Funcionamiento
    mode: "production",

    //Entry Point
    entry: {
        app: "./src/index.js",
    },

    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            }
        ]
    },

    //Output Point
    output: {
        path: path.join(basePath, distPath),
        filename: "bundle.js"
    }
}