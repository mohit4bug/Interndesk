const { updatePreferences,
    updatePersonalDetails,
    updateWorkSamples,
    updateSecondaryDetails,
    updateSeniorSecondaryDetails,
    updateGraduation,
    updatePostGraduation,
    updateSkills
} = require("../controllers/details.controller");
const multer = require("multer");
const { verify } = require("../middlware/verify");

const router = require("express").Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post("/preferences", verify, updatePreferences)
router.post("/personal", verify, upload.single("profileImage"), updatePersonalDetails)
router.post("/worksamples", verify, updateWorkSamples)
router.post("/skills", verify, updateSkills)
router.post("/edu/secondary", verify, upload.single("marksheetImage"), updateSecondaryDetails)
router.post("/edu/seniorsecondary", verify, upload.single("marksheetImage"), updateSeniorSecondaryDetails)
router.post("/edu/graduation", verify, updateGraduation)
router.post("/edu/postgraduation", verify, updatePostGraduation)

module.exports = router;