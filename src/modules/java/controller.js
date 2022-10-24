const util = require("util");
const cuid = require("cuid");
const fs = require("fs/promises");
const exec = util.promisify(require("child_process").exec);

const compileJava = async (req, res) => {
    const { code } = req.body;
    const filename = cuid.slug();
    const path = `${__dirname}/temp/${filename}.java`;
    try {
        await fs.writeFile(path, code);
        const command = `java ${path}`;
        const { stderr, stdout } = await exec(command);
        if (stderr) {
            if (error.toString().indexOf("Error: stdout maxBuffer exceeded.") != -1) {
                const out = { error: "Error: stdout maxBuffer exceeded. You might have initialized an infinite loop." };
                res.status(400).json(out);
            } else {
                console.log(`INFO: ${filename}.js contained an error while executing`);
                const out = { error: stderr };
                res.status(200).json(out);
            }
        }
        console.log(`INFO: ${filename}.js successfully executed !`);
        const out = { output: stdout };
        console.log(`INFO: ${filename}.js successfully deleted!`);
        await fs.unlink(path);
        res.status(200).json(out);
    } catch (err) {
        res.status(500).json(err);
    }
};

const compileJavaWithInput = async (req, res) => {
    const { code, input = "" } = req.body;
    const args = input?.split("\n")?.join(" ");
    const filename = cuid.slug();
    const path = `${__dirname}/temp/${filename}.java`;
    try {
        await fs.writeFile(path, code);
        const command = `java ${path} ${args}`;
        const { stderr, stdout } = await exec(command);
        if (stderr) {
            if (stderr.toString().indexOf("Error: stdout maxBuffer exceeded.") != -1) {
                res.status(400).json({
                    error: "Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.",
                });
            } else {
                console.log(`INFO: ${filename}.js contained an error while executing`);
                res.status(200).json({ error: stderr });
            }
        }
        console.log(`INFO: ${filename}.js successfully executed !`);
        const out = { output: stdout };
        console.log(`INFO: ${filename}.js successfully deleted!`);
        await fs.unlink(path);
        res.status(200).json(out);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    compileJava,
    compileJavaWithInput,
};
