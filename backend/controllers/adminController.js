import { User, Domain, Task, TaskSubmission } from "../models/schema.js";

const applicationsHandler = async (req, res) => {
  try {
    const applications = await User.find({
      applicationStatus: "pending",
      activeInternship: false,
    })
      .select("-password")
      .populate("domain", "name");
    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "No pending applications found" });
    }
    res.status(200).json({
      message: "All applications fetched successfully",
      applications: applications,
    });
  } catch (err) {
    console.error("Error in applicationsHandler:", err.message);
    res.status(500).json({
      message: "applicationsHandler: Server error in admin controller",
      error: err.message,
    });
  }
};


const applicationsapprovehandler = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({
      _id: userId,
      applicationStatus: "pending",
      activeInternship: false,
    }).populate("domain");

    if (!user) {
      return res
        .status(404)
        .json({ message: "No pending application found for this user" });
    }
    const domain = user.domain;
    if (!domain) {
      return res.status(400).json({ message: "User has not applied to any domain" });
    }
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + domain.durationInMonths);

    user.applicationStatus = "approved";
    user.activeInternship = true;
    user.internshipApproved = true; 
    user.internshipStartDate = startDate;
    user.internshipEndDate = endDate;
    const createdTasks = [];
    for (const task of domain.defaultTasks) {
      const newTask = await Task.create({
        title: task.title,
        description: task.description,
        assignedTo: user._id,
        domain: domain._id,
        status: "pending",
      });
      createdTasks.push(newTask._id);
    }
    user.assignedTasks = createdTasks;
    await user.save();

     user.pastInternships.push({
      domainName: domain.name,
      certificationStatus: "pending",
      startDate,
      endDate,
    });

    // Save user changes
    await user.save();
    res.status(200).json({
      message: "Application approved and tasks assigned successfully",
      user,
    });
  }
  catch (err) {
    console.error("Error in applicationsapprovehandler:", err.message);
    res.status(500).json({
        message: "applicationsapprovehandler: Server error in admin controller",   
        error: err.message,
    });
  }
}

const submittedApplicationsHandler = async (req, res) => {
  try {
    const { email, name } = req.query;

    let userFilter = {};
    if (email) userFilter.email = email;
    if (name) userFilter.name = name;

    let users = [];
    if (Object.keys(userFilter).length > 0) {
      users = await User.find(userFilter).select("_id name email");
    }

    let submissionsQuery = {};
    if (users.length > 0) {
      const userIds = users.map((u) => u._id);
      submissionsQuery.student = { $in: userIds };
    }

    const submissions = await TaskSubmission.find(submissionsQuery)
      .populate("student", "name email")
      .populate("task", "title description status")
      .populate({ path: "task", populate: { path: "domain", select: "name" } });

    res.status(200).json({
      message:
        users.length === 1
          ? `Submissions fetched successfully for ${users[0].name}`
          : "All submissions fetched successfully",
      count: submissions.length,
      submissions,
    });
  } catch (err) {
    console.error("Error in submittedApplicationsHandler:", err.message);
    res.status(500).json({
      message:
        "submittedApplicationsHandler: Server error in admin controller",
      error: err.message,
    });
  }
};

export { applicationsHandler, applicationsapprovehandler, submittedApplicationsHandler};
