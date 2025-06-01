import { db } from "../libs/db.js";


export const getUserStreaks = async (req, res) => {
    try {
        const userId =req.user.id;

        const result = await db.$queryRawUnsafe(`
            WITH submission_days AS (
                SELECT DISTINCT DATE("createdAt") AS submission_date
                FROM "Submission"
                WHERE "userId" = $1
            ),
            grouped_days AS (
                SELECT 
                    submission_date,
                    submission_date - INTERVAL '1 day' * ROW_NUMBER() OVER (ORDER BY submission_date) AS streak_group
                FROM submission_days
            ),
            streaks AS (
                SELECT 
                    MIN(submission_date) AS start_date,
                    MAX(submission_date) AS end_date,
                    COUNT(*) AS streak_length
                FROM grouped_days
                GROUP BY streak_group
            ),
            current_streak AS (
                SELECT streak_length
                FROM streaks
                WHERE end_date = CURRENT_DATE
            )
            SELECT
                (SELECT MAX(streak_length) FROM streaks) AS "longestStreak",
                COALESCE((SELECT streak_length FROM current_streak), 0) AS "currentStreak";
        `, userId);

        const raw = result[0];
        const formatted = {
            longestStreak: Number(raw.longestStreak),
            currentStreak: Number(raw.currentStreak),
        };
        
        res.status(200).json({
            success: true,
            message: "Streaks fetched successfully",
            data: formatted,
        });
    } catch (error) {
        console.error("Fetch Streaks Error:", error);
        res.status(500).json({ error: "Failed to fetch streaks" });
    }



    
};




export const getLast30DaysSubmissionDates = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await db.$queryRawUnsafe(`
            SELECT DISTINCT TO_CHAR(DATE("createdAt"), 'YYYY-MM-DD') AS date
            FROM "Submission"
            WHERE "userId" = $1
              AND "createdAt" >= CURRENT_DATE - INTERVAL '30 days'
            ORDER BY date DESC;
        `, userId);

        const dates = result.map(row => row.date);

        res.status(200).json({
            success: true,
            message: "Last 30 days of submission dates fetched successfully",
            data: dates,
        });

    } catch (error) {
        console.error("Fetch Last 30 Days Submission Dates Error:", error);
        res.status(500).json({ error: "Failed to fetch submission dates" });
    }
};

export const get5Submissions = async (req, res) => {
    try {
        const userId = req.user.id;

        const submissions = await db.submission.findMany({
            where: {
              userId: userId
            },
            orderBy: {
              createdAt: 'desc'
            },
            take: 5,
            select: {
              createdAt: true,
              problem: {
                select: {
                  id: true,
                  title: true,
                  difficulty: true,
                }
              }
            }
          });
          

        res.status(200).json({
            success: true,
            message: "Latest 5 submissions with problem details fetched successfully",
            submissions,
        });
    } catch (error) {
        console.error("Fetch Submissions Error:", error);
        res.status(500).json({ error: "Failed to fetch submissions" });
    }
};
