import cron from "node-cron";
import { User, Task } from "../models/schema.js"; 
// Runs every day at midnight
cron.schedule("0 0 * * *", async () => {
    try {
        console.log("🔍 Running Internship Completion Cron Job...");

        // 1️⃣ Find all users whose internship period is over
        const users = await User.find({
            activeInternship: true,
            internshipEndDate: { $lte: new Date() }
        }).populate("domain");

        if (users.length === 0) {
            console.log("⚠ No internships to finalize today.");
            return;
        }

        for (const user of users) {
            console.log(`⏳ Checking internship for: ${user.name}`);

            // 2️⃣ Count their total assigned tasks
            const totalTasks = await Task.countDocuments({ assignedTo: user._id });

            // 3️⃣ Count completed tasks
            const completedTasks = await Task.countDocuments({
                assignedTo: user._id,
                status: "completed"
            });

            // 4️⃣ Decide pass / fail (80% minimum)
            const required = Math.ceil(totalTasks * 0.8);
            const result = completedTasks >= required ? "passed" : "failed";

            console.log(
                `📊 ${user.name}: Completed ${completedTasks}/${totalTasks} → ${result}`
            );

            // 5️⃣ Update user's internship record
            user.activeInternship = false;
            user.applicationStatus = "completed";
            user.certificationStatus = result;

            // Update last entry in pastInternships
            const lastIndex = user.pastInternships.length - 1;
            if (lastIndex >= 0) {
                user.pastInternships[lastIndex].certificationStatus = result;
                user.pastInternships[lastIndex].endDate = new Date();
            }

            await user.save();
            console.log(`✅ Internship finalized for ${user.name}`);
        }

        console.log("🎉 Internship Completion Job Finished Successfully!");

    } catch (err) {
        console.error("❌ Cron Job Error:", err.message);
    }
});