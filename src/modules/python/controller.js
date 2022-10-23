const util = require("util");
const cuid = require("cuid");
const fs = require("fs/promises");
const exec = util.promisify(require("child_process").exec);

const compilePython = async (req, res) => {
    const { code } = req.body;
    const filename = cuid.slug();

    const path = `${__dirname}/temp/${filename}.py`;

    try {
        await fs.writeFile(path, code);
        const command = `python ${path}`;
        const { stderr, stdout } = await exec(command);

        if (stderr) {
            if (error.toString().indexOf("Error: stdout maxBuffer exceeded.") != -1) {
                const out = { error: "Error: stdout maxBuffer exceeded. You might have initialized an infinite loop." };
                res.status(400).json(out);
            } else {
                console.log(`INFO: ${filename}.py contained an error while executing`);
                const out = { error: stderr };
                res.status(200).json(out);
            }
        }
        console.log(`INFO: ${filename}.py successfully executed !`);
        const out = { output: stdout };
        console.log(`INFO: ${filename}.py successfully deleted!`);
        await fs.unlink(path);
        res.status(200).json(out);
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err);
    }
};

const compilePythonWithInput = async (req, res) => {
    const { code, input = "" } = req.body;
    const filename = cuid.slug();

    const path = `${__dirname}/temp/${filename}.py`;
    const inputFilePath = `${__dirname}/temp/${filename}_input.txt`;

    try {
        await fs.writeFile(path, code);
        await fs.writeFile(inputFilePath, input);
        const command = `python ${path} < ${inputFilePath}`;
        const { stderr, stdout } = await exec(command);
        if (stderr) {
            if (error.toString().indexOf("Error: stdout maxBuffer exceeded.") != -1) {
                const out = { error: "Error: stdout maxBuffer exceeded. You might have initialized an infinite loop." };
                res.status(400).json(out);
            } else {
                console.log(`INFO: ${filename}.py contained an error while executing`);
                const out = { error: stderr };
                res.status(200).json(out);
            }
        }
        console.log(`INFO: ${filename}.py successfully executed !`);
        const out = { output: stdout };
        console.log(`INFO: ${filename}.py successfully deleted!`);
        await fs.unlink(path);
        console.log(`INFO: ${filename}_input.txt successfully deleted!`);
        await fs.unlink(inputFilePath);
        res.status(200).json(out);
    } catch (err) {
        res.status(500).json(stderr);
    }
};

module.exports = {
    compilePython,
    compilePythonWithInput,
};
