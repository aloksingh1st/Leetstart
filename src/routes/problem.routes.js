import express from 'express';
import { authMiddleware, checkAdmin } from '../middleware/auth.middleware.js';
import { createProblem } from '../controllers/problems.controller.js';


const problemRoutes = express.Router();


/**
 * @swagger
 * /api/problems:
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
problemRoutes.post("/create-problem", authMiddleware, checkAdmin, createProblem)


export default problemRoutes;