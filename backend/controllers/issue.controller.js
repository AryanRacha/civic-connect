/**
 * Controller functions for handling Issue-related operations in the backend.
 *
 * This file provides endpoints for:
 * - Creating a new issue (`createIssue`)
 * - Fetching all issues or a specific issue by ID
 * - Adding a report to an existing issue (`addReportToIssue`)
 * - Following/unfollowing issues
 * - Updating issue status
 * - Assigning issues to departments
 * - Deleting issues
 *
 * IMPORTANT: Difference between `createIssue` and `addReportToIssue`
 * ----------------------------------------------------------------------------
 * - `createIssue`: 
 *      - Used to create a brand new issue in the system.
 *      - Expects all necessary issue details in the request body.
 *      - Saves a new Issue document to the database.
 *      - Should be called when a user is reporting a problem that does not exist yet.
 *
 * - `addReportToIssue`:
 *      - Used to add a user's report to an already existing issue.
 *      - Prevents duplicate reports from the same user for the same issue.
 *      - If it's the first report for the issue, it creates a new Report document and links it to the issue.
 *      - For subsequent reports, it only adds a reference (user and issue) to the issue's `reports` array.
 *      - Should be called when a user wants to indicate they are also affected by or have information about an existing issue.
 *
 * This distinction is important: 
 *   - Use `createIssue` for new, unique problems.
 *   - Use `addReportToIssue` for supporting or contributing to an already reported issue.
 *
 * All controller functions handle errors and respond with appropriate HTTP status codes and messages.
 */
import Issue from "../models/issue.model.js";
import Report from "../models/report.model.js";
import Department from "../models/dept.model.js";
import User from "../models/user.model.js";



export const createIssue = async (req, res) => {
  try {
    const newIssue = new Issue(req.body);
    await newIssue.save();
    res.status(201).json(newIssue);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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

/**
 * Adds a report to an existing issue.
 *
 * Logic:
 * - Retrieves the issue by ID from the request parameters.
 * - Checks if the issue exists; if not, responds with 404.
 * - Checks if the current user has already reported this issue; if so, responds with 400.
 * - If this is the first report for the issue:
 *   - Expects `description` and `imageUrl` in the request body.
 *   - Creates a new Report document and saves it.
 *   - Adds a reference to the report in the issue's `reports` array.
 *   - Responds with 201 and the created report.
 * - If there are already reports for the issue:
 *   - Only adds the user and issue reference to the `reports` array (no new Report document).
 *   - Prevents duplicate reports from the same user.
 *   - Responds with 201 and a success message.
 * - Handles server errors with a 500 response.
 *
 * @async
 * @function addReportToIssue
 * @param {Object} req - Express request object, expects `params.id`, `user._id`, and optionally `body.description`, `body.imageUrl`.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
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
    const userId = req.user._id; // assuming user is authenticated and user object is in req
    const { issueId } = req.body;

    if (!issueId) {
      return res.status(400).json({ message: "Issue ID is required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Prevent duplicate follows
    if (user.followedIssues.includes(issueId)) {
      return res.status(400).json({ message: "Already following this issue." });
    }

    user.followedIssues.push(issueId);
    await user.save();

    res.status(200).json({
      message: "Issue followed successfully.",
      followedIssues: user.followedIssues,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
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
