import { User, Domain, Task, TaskSubmission } from "../models/schema.js";

const studentApply = async (req, res) => {
  try {
    const { domainId } = req.body;
    const user = req.user;
    
    if (user.activeInternship) {
        user.applicationStatus = "rejected";
        await user.save();
        return res
        .status(400)
        .json({
            msg: "Can't apply to multiple Internship at same time",
            user,
        });
    }
    const domain = await Domain.findById(domainId);
    if (!domain) {
      return res.status(404).json({ message: "Domain not found." });
    }
    
    user.domain =  domain._id;
    user.applicationStatus = "pending";
    await user.save();

    res.status(200).json({ msg: "Applied Successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).send("student apply Server Error " + err.message);
  }
};

const studentDashboard = async (req, res) => {
  try {
    const user = req.user;
    const dashboardData = await Task.find({ assignedTo: user._id })
      .populate("domain", "name durationInMonths") 
      .select("title description status domain createdAt");
    if (!dashboardData || dashboardData.length === 0) {
      return res.status(404).json({ message: "No tasks assigned yet" });
    }
    res.status(200).json({
      message: "Student Dashboard Data",
      tasks: dashboardData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("student dashboard Server Error " + err.message);
  }
}

const studentTaskSubmission = async (req, res) => {
  try{
    const { taskId } = req.params;
    const user = req.user;
    const {submissionLink } = req.body;

    const task = await Task.findOne({_id: taskId, assignedTo: user._id });
    if (!task) {
      return res.status(404).json({ message: "Task not found or not assigned to this student" });
    }
    const existingSubmission = await TaskSubmission.findOne({ student: user._id, task: taskId });
    if (existingSubmission) {
      return res.status(400).json({ message: "Task already submitted" });
    }
    const newSubmission = new TaskSubmission({
      student: user._id,
      task: taskId,
      submissionLink,
      status: "submitted",
      submittedAt: new Date(),
    });
    task.status = "completed";
    await Promise.all([newSubmission.save(), task.save()]);
     res.status(200).json({
      message: "Task submitted successfully",
      submission: newSubmission,
    });

  }
  catch(err){ 
    console.error(err);
    res.status(500).send("student task submission Server Error " + err.message);
  }
}

export {studentApply ,studentDashboard, studentTaskSubmission};
