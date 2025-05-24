import { db } from "../libs/db.js";
import {
    getJudge0LanguageId,
    pollBatchResults,
    submitBatch,
} from "../libs/judge0.lib.js";



/**
 * @swagger
 * /api/v1/problems/create-problem:
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
 *               - testCases
 *               - referenceSolutions
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               difficulty:
 *                 type: string
 *                 enum: [EASY, MEDIUM, HARD]
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               examples:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     input:
 *                       type: string
 *                     output:
 *                       type: string
 *               constraints:
 *                 type: array
 *                 items:
 *                   type: string
 *               testCases:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     input:
 *                       type: string
 *                     output:
 *                       type: string
 *               codeSnippets:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *               referenceSolutions:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
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
        testCases: testCases,
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



            console.log(req.body);
            //
            const submissions = testCases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output,
            }));

            const submissionResults = await submitBatch(submissions);

            console.log(submissionResults);

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
                testcases: testCases,
                codeSnippets,
                referenceSolutions,
                userId: req.user.id,
            },
        });

        return res.status(201).json({
            sucess: true,
            message: "Problem Created Successfully",
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
 * /api/v1/problems/get-all-problems:
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
 *                 message:
 *                   type: string
 *                 problems:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       difficulty:
 *                         type: string
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       examples:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             input:
 *                               type: string
 *                             output:
 *                               type: string
 *                       constraints:
 *                         type: array
 *                         items:
 *                           type: string
 *                       testCases:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             input:
 *                               type: string
 *                             output:
 *                               type: string
 *                       codeSnippets:
 *                         type: object
 *                         additionalProperties:
 *                           type: string
 *                       referenceSolutions:
 *                         type: object
 *                         additionalProperties:
 *                           type: string
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
            message: "Problems fetched succesfully",
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
 * /api/v1/problems/get-problem/{id}:
 *   get:
 *     summary: Get problem by ID
 *     tags: [Problems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the problem to retrieve
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
 *                 message:
 *                   type: string
 *                 problem:
 *                   $ref: '#/components/schemas/Problem'
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
            message: "Problem Fetched Successfully",
            problem,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error While Fetching Problem with id",
        });
    }
};



/**
 * @swagger
 * /api/v1/problems//delete-problem/{id}:
 *   delete:
 *     summary: Delete a problem by its ID
 *     description: Deletes a specific problem from the database using its unique ID.
 *     tags:
 *       - Problems
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the problem to be deleted
 *     responses:
 *       200:
 *         description: Problem deleted successfully
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
 *                   example: Problem deleted successfully!!!
 *                 deleteProblem:
 *                   type: object
 *                   description: The deleted problem object
 *       500:
 *         description: Error deleting the problem
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error Deleting Problem by id
 */

export const deleteProblem = async (req, res) => {

    const { id } = req.params;


    try {
        const deletedProblem = db.problem.delete({
            where: {
                id,
            }
        });


        if (deleteProblem) {
            res.status(200).json({
                sucess: true,
                message: "Problem deleted successfully!!!",
                deleteProblem,
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error Deleting Problem by id",
        });
    }
};



/**
 * @swagger
 * /api/v1/problems/get-problemsSolvedByUser:
 *   get:
 *     summary: Get all problems solved by the authenticated user
 *     description: Retrieves a list of problems that have been solved by the currently authenticated user.
 *     tags:
 *       - Problems
 *     security:
 *       - bearerAuth: []  # Assuming JWT or token-based auth is used
 *     responses:
 *       200:
 *         description: List of problems solved by the user
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
 *                   example: Problems fetched successfully
 *                 problems:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: A problem object (structure depends on your schema)
 *       500:
 *         description: Failed to fetch problems
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to fetch problems
 */
export const getAllProblemsSolvedByUser = async (req, res) => {
    try {

        console.log(req.user);
        const problems = await db.problem.findMany({
            where: {
                solvedBy: {
                    some: {
                        userId: req.user.id,
                    },
                },
            },
            include: {
                solvedBy: {
                    where: {
                        userId: req.user.id,
                    },
                },
            },
        });
        res.status(200).json({
            success: true,
            message: 'Problems fetched successfully',
            problems,
        });
    } catch (error) {
        console.error('Error fetching problems:', error);
        res.status(500).json({ error: 'Failed to fetch problems' });
    }
};