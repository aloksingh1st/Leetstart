import { db } from "../libs/db.js";
import {
    getJudge0LanguageId,
    pollBatchResults,
    submitBatch,
} from "../libs/judge0.lib.js";




/**
 * @swagger
 * /api/problems/create-problem:
 *   post:
 *     summary: Create a new coding problem
 *     tags: [Problems]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - difficulty
 *               - testcases
 *               - referenceSolutions
 *             properties:
 *               title:
 *                 type: string
 *                 example: Two Sum
 *               description:
 *                 type: string
 *                 example: Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 *               difficulty:
 *                 type: string
 *                 enum: [EASY, MEDIUM, HARD]
 *                 example: EASY
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [array, hash-map]
 *               examples:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     input:
 *                       type: string
 *                       example: "nums = [2,7,11,15], target = 9"
 *                     output:
 *                       type: string
 *                       example: "[0,1]"
 *               constraints:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"]
 *               testcases:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     input:
 *                       type: string
 *                       example: "1 2"
 *                     output:
 *                       type: string
 *                       example: "3"
 *               codeSnippets:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *                 example:
 *                   javascript: |
 *                     function twoSum(nums, target) {
 *                       // ...
 *                     }
 *               referenceSolutions:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *                 example:
 *                   javascript: |
 *                     function twoSum(nums, target) {
 *                       let map = new Map();
 *                       for (let i = 0; i < nums.length; i++) {
 *                         let complement = target - nums[i];
 *                         if (map.has(complement)) {
 *                           return [map.get(complement), i];
 *                         }
 *                         map.set(nums[i], i);
 *                       }
 *                     }
 *     responses:
 *       201:
 *         description: Problem created successfully
 *       400:
 *         description: Validation or solution test failed
 *       500:
 *         description: Server error
 */

export const createProblem = async (req, res) => {
    const {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
    } = req.body;

    // going to check the user role once again

    try {
        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            const languageId = getJudge0LanguageId(language);

            if (!languageId) {
                return res
                    .status(400)
                    .json({ error: `Language ${language} is not supported` });
            }

            //
            const submissions = testcases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output,
            }));

            const submissionResults = await submitBatch(submissions);

            const tokens = submissionResults.map((res) => res.token);

            const results = await pollBatchResults(tokens);

            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                console.log("Result-----", result);
                // console.log(
                //   `Testcase ${i + 1} and Language ${language} ----- result ${JSON.stringify(result.status.description)}`
                // );
                if (result.status.id !== 3) {
                    return res.status(400).json({
                        error: `Testcase ${i + 1} failed for language ${language}`,
                    });
                }
            }
        }

        const newProblem = await db.problem.create({
            data: {
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                testcases,
                codeSnippets,
                referenceSolutions,
                userId: req.user.id,
            },
        });

        return res.status(201).json({
            sucess: true,
            message: "Message Created Successfully",
            problem: newProblem,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error While Creating Problem",
        });
    }
};


/**
 * @swagger
 * /api/problems/get-all-problems:
 *   get:
 *     summary: Get all problems
 *     tags: [Problems]
 *     responses:
 *       200:
 *         description: Successfully fetched all problems
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Message Fetched Successfully"
 *                 problems:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "Example Problem"
 *                       description:
 *                         type: string
 *                         example: "This is a problem description."
 *                       difficulty:
 *                         type: string
 *                         example: "easy"
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["arrays", "math"]
 *                       examples:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Example input and output."]
 *                       constraints:
 *                         type: string
 *                         example: "Input size should be less than 1000."
 *                       testcases:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             input:
 *                               type: string
 *                               example: "1 2 3"
 *                             output:
 *                               type: string
 *                               example: "6"
 *                       codeSnippets:
 *                         type: object
 *                         properties:
 *                           python:
 *                             type: string
 *                             example: "def solve(): pass"
 *                       referenceSolutions:
 *                         type: object
 *                         properties:
 *                           python:
 *                             type: string
 *                             example: "def solve(): pass"
 *       404:
 *         description: No problems found
 *       500:
 *         description: Internal server error
 */

export const getAllProblems = async (req, res) => {
    try {
        const problems = await db.problem.findMany();

        if (!problems) {
            return res.status(404).json({
                error: "No problems Found",
            });
        }

        res.status(200).json({
            sucess: true,
            message: "Message Fetched Successfully",
            problems,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error While Fetching Problems",
        });
    }
};



/**
 * @swagger
 * /api/problems/get-problem/{id}:
 *   get:
 *     summary: Get problem by ID
 *     tags: [Problems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the problem to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully fetched the problem
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Message Created Successfully"
 *                 problem:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Example Problem"
 *                     description:
 *                       type: string
 *                       example: "This is a problem description."
 *                     difficulty:
 *                       type: string
 *                       example: "easy"
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["arrays", "math"]
 *                     examples:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Example input and output."]
 *                     constraints:
 *                       type: string
 *                       example: "Input size should be less than 1000."
 *                     testcases:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           input:
 *                             type: string
 *                             example: "1 2 3"
 *                           output:
 *                             type: string
 *                             example: "6"
 *                     codeSnippets:
 *                       type: object
 *                       properties:
 *                         python:
 *                           type: string
 *                           example: "def solve(): pass"
 *                     referenceSolutions:
 *                       type: object
 *                       properties:
 *                         python:
 *                           type: string
 *                           example: "def solve(): pass"
 *       404:
 *         description: Problem not found
 *       500:
 *         description: Internal server error
 */

export const getProblemById = async (req, res) => {
    const { id } = req.params;

    try {
        const problem = await db.problem.findUnique({
            where: {
                id,
            },
        });

        if (!problem) {
            return res.status(404).json({ error: "Problem not found." });
        }

        return res.status(200).json({
            sucess: true,
            message: "Message Created Successfully",
            problem,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error While Fetching Problem by id",
        });
    }
};

export const deleteProblem = async (req, res) => {
};

export const getAllProblemsSolvedByUser = async (req, res) => {
};