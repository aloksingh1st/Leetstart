import axios from "axios"

export const getJudge0LanguageId = (language) => {
    const languageMap = {
        "PYTHON": 71,
        "JAVA": 62,
        "JAVASCRIPT": 63,
    }

    return languageMap[language.toUpperCase()]
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const pollBatchResults = async (tokens) => {
    while (true) {

        // const { data } = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`, {
        //     params: {
        //         tokens: tokens.join(","),
        //         base64_encoded: false,
        //     }
        // })

        const { data } = await axios.get(`${process.env.JUDGE0_API_URL}submissions/batch`, {
            params: {
                tokens: tokens.join(","),
                base64_encoded: false,
            },

            headers: {
                'Content-Type': 'application/json',
                'X-Rapidapi-Key': 'f7c89bbd6emsh4a27131f1ae489fp180bdejsn1530ce38f2cf',
                'X-Rapidapi-Host': 'judge0-ce.p.rapidapi.com',
            },
        })


        const results = data.submissions;


        console.log(data);

        const isAllDone = results.every(
            (r) => r.status.id !== 1 && r.status.id !== 2
        )

        if (isAllDone) return results
        await sleep(1000)
    }
}

export const submitBatch = async (submissions) => {
    // const { data } = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`, {
    //     submissions
    // })


    // console.log("yha tak aaya");

    // console.log(process.env.JUDGE0_API_URL);
    // console.log(process.env.RAPIDAPI_KEY);

    const { data } = await axios.post(
        `${process.env.JUDGE0_API_URL}submissions/batch?base64_encoded=false`,
        { submissions },
        {
            headers: {
                'Content-Type': 'application/json',
                'X-Rapidapi-Key': process.env.RAPIDAPI_KEY,
                'X-Rapidapi-Host': 'judge0-ce.p.rapidapi.com',
            },
        }
    );

    console.log("Submission Results: ", data)

    return data;
}


export function getLanguageName(languageId) {
    const LANGUAGE_NAMES = {
        74: "TypeScript",
        63: "JavaScript",
        71: "Python",
        62: "Java",
        76: "Cpp",
    }

    return LANGUAGE_NAMES[languageId] || "Unknown"
}