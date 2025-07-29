const express = require("express");
const app = express();
app.use(express.json());

const fullName = "sidharth sharma";
const dob = "05-12-2004";
const userId = `${fullName}_${dob}`;
const email = "sidharthsharma17240@gmail.com";
const rollNumber = "2210992379";

function isNumber(str) {
    return /^[0-9]+$/.test(str);
}

function isAlpha(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function isSpecialChar(str) {
    return /^[^a-zA-Z0-9]+$/.test(str);
}

function alternatingCapsReverseConcat(alphas) {
    const combined = alphas.join("").split("").reverse();
    return combined.map((ch, i) =>
        i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
    ).join("");
}

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

        for (let item of inputData) {
            if (isNumber(item)) {
                const num = parseInt(item);
                sum += num;
                if (num % 2 === 0) {
                    evenNumbers.push(item);
                } else {
                    oddNumbers.push(item);
                }
            } else if (isAlpha(item)) {
                alphabets.push(item.toUpperCase());
            } else if (isSpecialChar(item)) {
                specialChars.push(item);
            }
        }

        const concatString = alternatingCapsReverseConcat(alphabets);

        return res.status(200).json({
            is_success: true,
            user_id: userId,
            email: email,
            roll_number: rollNumber,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
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
