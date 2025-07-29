const express = require("express");
const app = express();
app.use(express.json());

const fullName = "sidharth sharma";
const dob = "05-12-2004";
const userId = `${fullName}_${dob}`;
const email = "sidharthsharma17240@gmail.com";
const rollNumber = "2210992379";

const patterns = {
    number: /^[0-9]+$/,
    alpha: /^[a-zA-Z]+$/,
    special: /^[^a-zA-Z0-9]+$/
};

const checkType = (str) => {
    if (patterns.number.test(str)) return "number";
    if (patterns.alpha.test(str)) return "alpha";
    if (patterns.special.test(str)) return "special";
    return "unknown";
};

const alternatingCapsReverseConcat = (alphas) =>
    alphas
        .join("")
        .split("")
        .reverse()
        .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
        .join("");

app.post("/bfhl", (req, res) => {
    try {
        const inputData = req.body.data;

        if (!Array.isArray(inputData)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }

        const evenNumbers = [];
        const oddNumbers = [];
        const alphabets = [];
        const specialChars = [];
        let sum = 0;

        inputData.forEach(item => {
            const type = checkType(item);
            switch (type) {
                case "number":
                    const num = parseInt(item, 10);
                    sum += num;
                    (num % 2 === 0 ? evenNumbers : oddNumbers).push(item);
                    break;
                case "alpha":
                    alphabets.push(item.toUpperCase());
                    break;
                case "special":
                    specialChars.push(item);
                    break;
            }
        });

        const concatString = alternatingCapsReverseConcat(alphabets);

        return res.status(200).json({
            is_success: true,
            user_id: userId,
            email,
            roll_number: rollNumber,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets,
            special_characters: specialChars,
            sum: sum.toString(),
            concat_string: concatString
        });

    } catch (error) {
        return res.status(500).json({
            is_success: false,
            message: "Server Error",
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
