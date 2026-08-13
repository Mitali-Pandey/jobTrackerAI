import Application from "../models/Application.js";

// @route  POST /api/applications
// @desc   Create a new job application
export const createApplication = async (req, res) => {
  try {
    const { company, role, status, appliedDate, link, notes } = req.body;

    if (!company || !role) {
      return res.status(400).json({ message: "Company and role are required" });
    }

    const application = await Application.create({
      user: req.user._id, // comes from the protect middleware
      company,
      role,
      status,
      appliedDate,
      link,
      notes,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/applications
// @desc   Get all applications for the logged-in user
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id }).sort({
      createdAt: -1, // newest first
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/applications/:id
// @desc   Get a single application by id
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // make sure the application belongs to the logged-in user
    if (application.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to view this application" });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  PUT /api/applications/:id
// @desc   Update an application
export const updateApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this application" });
    }

    const updated = await Application.findByIdAndUpdate(req.params.id, req.body, {
      new: true,          // return the updated document
      runValidators: true, // re-run schema validation (e.g. enum check on status)
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  DELETE /api/applications/:id
// @desc   Delete an application
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this application" });
    }

    await application.deleteOne();
    res.json({ message: "Application deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};