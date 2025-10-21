import { db } from "../libs/db.js";

/**
 * @swagger
 * /submissions:
 *   get:
 *     summary: Get all submissions by the logged-in user
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Submissions fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 submissions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Submission'
 *       500:
 *         description: Failed to fetch submissions
 */
export const getAllSubmissions = async (req, res) => {
    try {
        const userId = req.user.id;
        const submissions = await db.submission.findMany({
            where: {
                userId: userId
            },
        });

        res.status(200).json({
            success: true,
            message: "Submissions fetched successfully",
            submissions,
        });
    } catch (error) {
        console.error("Fetch Submissions Error:", error);
        res.status(500).json({ error: "Failed to fetch submissions" });
    }
};

/**
 * @swagger
 * /submissions/problem/{problemId}:
 *   get:
 *     summary: Get all submissions for a specific problem by the logged-in user
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: problemId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the problem
 *     responses:
 *       200:
 *         description: Submissions fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 submissions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Submission'
 *       500:
 *         description: Failed to fetch submissions
 */
export const getSubmissionsForProblem = async (req, res) => {
    try {
        const userId = req.user.id;
        const problemId = req.params.problemId;
        const submissions = await db.submission.findMany({
            where: {
                userId: userId,
                problemId: problemId
            },
        });

        res.status(200).json({
            success: true,
            message: "Submissions fetched successfully",
            submissions,
        });
    } catch (error) {
        console.error("Fetch Submissions Error:", error);
        res.status(500).json({ error: "Failed to fetch submissions" });
    }
};

/**
 * @swagger
 * /submissions/problem/{problemId}/count:
 *   get:
 *     summary: Get the total number of submissions for a specific problem (across all users)
 *     tags: [Submissions]
 *     parameters:
 *       - in: path
 *         name: problemId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the problem
 *     responses:
 *       200:
 *         description: Submission count fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 count:
 *                   type: integer
 *       500:
 *         description: Failed to fetch submission count
 */
export const getAllTheSubmissionsForProblem = async (req, res) => {
    try {
        const problemId = req.params.problemId;
        const submissions = await db.submission.count({
            where: {
                problemId: problemId
            },
        });

        res.status(200).json({
            success: true,
            message: "Submissions fetched successfully",
            count: submissions,
        });
    } catch (error) {
        console.error("Fetch Submissions Error:", error);
        res.status(500).json({ error: "Failed to fetch submissions" });
    }
};
