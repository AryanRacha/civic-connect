import Issue from "../models/issue.model.js";
import Report from "../models/report.model.js";
import User from "../models/user.model.js";
import Department from "../models/dept.model.js";

export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find({})
      .populate("reports")
      .populate("firstReportedBy", "_id name email")
      .populate("assignedTo", "_id name")
      .populate("follows", "_id name email");
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getIssueById = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await Issue.findById(id).populate("reports");
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addReportToIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // Check if user already reported this issue
    const alreadyReported = issue.reports.some(
      (r) => r.user?.toString() === userId.toString()
    );
    if (alreadyReported) {
      return res
        .status(400)
        .json({ message: "User has already reported this issue" });
    }

    if (issue.reports.length === 0) {
      // First report: store description and imageUrl
      const { description, imageUrl } = req.body;
      const report = new Report({
        description,
        imageUrl,
        reportedBy: userId,
        issue: id,
      });
      await report.save();
      issue.reports.push({ user: userId, issue: id });
      await issue.save();
      return res
        .status(201)
        .json({ message: "First report added to issue", report });
    } else {
      // Only add userId and issueId for subsequent reports
      // Prevent duplicate reports from same user
      const alreadyReported = issue.reports.some(
        (r) => r.user?.toString() === userId.toString()
      );
      if (alreadyReported) {
        return res
          .status(400)
          .json({ message: "User has already reported this issue" });
      }
      issue.reports.push({ user: userId, issue: id });
      await issue.save();
      return res
        .status(201)
        .json({ message: "Report reference added to issue" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const followIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    if (!issue.follows.includes(userId)) {
      issue.follows.push(userId);
      await issue.save();
    }
    res.status(200).json({ message: "Issue followed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const unfollowIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    issue.follows = issue.follows.filter(
      (followerId) => followerId.toString() !== userId.toString()
    );
    await issue.save();
    res.status(200).json({ message: "Issue unfollowed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowedStatuses = ["Submitted", "In Progress", "Resolved"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    issue.status = status;
    await issue.save();
    res.status(200).json({ message: "Issue status updated", issue });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const assignIssueToDept = async (req, res) => {
  try {
    const { id } = req.params;
    const { departmentId } = req.body;
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    issue.assignedTo = departmentId;
    await issue.save();
    res.status(200).json({ message: "Issue assigned to department", issue });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    await Issue.findByIdAndDelete(id);
    res.status(200).json({ message: "Issue deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
