import { db } from '../libs/db.js';
import {
    getLanguageName,
    pollBatchResults,
    submitBatch,
} from '../libs/judge0.lib.js';



/**
 * @swagger
 * /api/execute:
 *   post:
 *     summary: Execute user-submitted code against test cases
 *     tags:
 *       - Code Execution
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - source_code
 *               - language_id
 *               - stdin
 *               - expected_outputs
 *               - problemId
 *             properties:
 *               source_code:
 *                 type: string
 *                 description: The source code to be executed
 *                 example: "print(input())"
 *               language_id:
 *                 type: integer
 *                 description: The language ID used by the Judge0 API
 *                 example: 71
 *               stdin:
 *                 type: array
 *                 description: Array of test case inputs
 *                 items:
 *                   type: string
 *                 example: ["5", "10"]
 *               expected_outputs:
 *                 type: array
 *                 description: Expected outputs corresponding to each stdin
 *                 items:
 *                   type: string
 *                 example: ["5", "10"]
 *               problemId:
 *                 type: string
 *                 description: The problem's ID from the database
 *                 example: "clvp4q6oi0000dzo1v5w8zplm"
 *     responses:
 *       200:
 *         description: Code executed and results stored successfully
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
 *                   example: Code executed successfully
 *                 submission:
 *                   type: object
 *                   description: Submission data including test case results
 *       400:
 *         description: Bad request (e.g., malformed input or missing fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid or missing test cases
 *       500:
 *         description: Internal server error during code execution
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to execute code
 */
export const executeCode = async (req, res) => {
    const { source_code, language_id, stdin, expected_outputs, problemId, isSubmission } = req.body;
    const userId = req.user.id;

    try {
        // ✅ 1. Validate incoming test cases
        if (
            !Array.isArray(stdin) ||
            stdin.length === 0 ||
            !Array.isArray(expected_outputs) ||
            expected_outputs.length !== stdin.length
        ) {
            return res.status(400).json({ error: 'Invalid or missing test cases' });
        }

        // 📦 2. Prepare submissions for Judge0
        const submissions = stdin.map((input) => ({
            source_code,
            language_id,
            stdin: input,
            base64_encoded: false,
            wait: false,
        }));

        // 🚀 3. Submit batch
        const submitResponse = await submitBatch(submissions);
        const tokens = submitResponse.map((res) => res.token);

        // ⏳ 4. Poll for results
        const results = await pollBatchResults(tokens);

        // 📊 5. Analyze test results
        let allPassed = true;
        const detailedResults = results.map((result, i) => {
            const stdout = result.stdout?.trim() || null;
            const expected_output = expected_outputs[i]?.trim();
            const passed = stdout === expected_output;

            if (!passed) allPassed = false;

            return {
                testCase: i + 1,
                passed,
                stdout,
                expected: expected_output,
                stderr: result.stderr || null,
                compile_output: result.compile_output || null,
                status: result.status.description,
                memory: result.memory ? `${result.memory} KB` : undefined,
                time: result.time ? `${result.time} s` : undefined,
            };
        });

        // 💾 6. Store submission summary

        if (isSubmission) {

            const submission = await db.submission.create({
                data: {
                    userId,
                    problemId,
                    sourceCode: source_code,
                    language: getLanguageName(language_id),
                    stdin: stdin.join('\n'),
                    stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
                    stderr: detailedResults.some((r) => r.stderr)
                        ? JSON.stringify(detailedResults.map((r) => r.stderr))
                        : null,
                    compileOutput: detailedResults.some((r) => r.compile_output)
                        ? JSON.stringify(detailedResults.map((r) => r.compile_output))
                        : null,
                    status: allPassed ? 'Accepted' : 'Wrong Answer',
                    memory: detailedResults.some((r) => r.memory)
                        ? JSON.stringify(detailedResults.map((r) => r.memory))
                        : null,
                    time: detailedResults.some((r) => r.time)
                        ? JSON.stringify(detailedResults.map((r) => r.time))
                        : null,
                },
            });

            // 🏆 7. Mark problem as solved if all test cases passed
            if (allPassed) {
                await db.problemSolved.upsert({
                    where: {
                        userId_problemId: { userId, problemId },
                    },
                    update: {},
                    create: { userId, problemId },
                });
            }
        }

        // 📁 8. Save individual test case results using detailedResults directly
        const testCaseResults = detailedResults.map((result) => ({
            submissionId: isSubmission ? submission?.id : null,
            testCase: result.testCase,
            passed: result.passed,
            stdout: result.stdout,
            expected: result.expected,
            stderr: result.stderr,
            compileOutput: result.compile_output,
            status: result.status,
            memory: result.memory,
            time: result.time,
        }));


        if (isSubmission) {
            await db.testCaseResult.createMany({ data: testCaseResults });

            // 🔍 9. Fetch full submission with test cases
            const submissionWithTestCases = await db.submission.findUnique({
                where: { id: submission.id },
                include: { testCases: true },
            });
        }

        // 📤 10. Respond to client
        res.status(200).json({
            success: true,
            message: 'Code executed successfully',
            submission: isSubmission ? submissionWithTestCases : testCaseResults,
        });
    } catch (error) {
        console.error('Error executing code:', error.message);
        res.status(500).json({ error: 'Failed to execute code' });
    }
};