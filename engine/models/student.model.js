const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    registrationNumber: {
        type: String,
        unique: true,
        required: true,
    },
    personalDetails: {
        firstName: {
            type: String,
            default: ''
        },
        lastName: {
            type: String,
            default: ''
        },
        profileImage: {
            type: String,
            default: 'default.png'
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other", ""],
            default: ""
        },
        mobile: {
            type: String,
            default: ''
        },
        currentLocation: {
            type: String,
            default: ''
        },
        secondLocation: { type: String, default: '' },
        isFilled: {
            type: Boolean,
            default: false
        }
    },
    educationalDetails: {
        secondary: {
            schoolName: {
                type: String,
                default: ''
            },
            percentage: {
                type: Number,
                default: ''
            },
            medium: {
                type: String,
                default: ''
            },
            board: {
                type: String,
                default: ''
            },
            marksheetImage: {
                type: String,
                default: ''
            }
        },
        seniorSecondary: {
            stream: {
                type: String,
                default: ''
            },
            schoolName: {
                type: String,
                default: ''
            },
            percentage: {
                type: Number,
                default: ''
            },
            medium: {
                type: String,
                default: ''
            },
            board: {
                type: String,
                default: ''
            },
            marksheetImage: {
                type: String,
                default: ''
            }
        },
        graduation: {
            graduationStatus: {
                type: String,
                enum: ["Pursuing", "Completed", ""],
                default: ""
            },
            startYear: {
                type: String,
                default: ""
            },
            endYear: {
                type: String,
                default: ""
            },
            course: {
                type: String,
                default: ""
            },
            specialization: {
                type: String,
                default: ""
            },
            department: {
                type: String,
                default: ""
            },
            performanceScale: {
                type: String,
                default: ""
            }
        },
        postGraduation: {
            graduationStatus: {
                type: String,
                enum: ["Pursuing", "Completed", ""],
                default: ""
            },
            startYear: {
                type: String,
                default: ""
            },
            endYear: {
                type: String,
                default: ""
            },
            course: {
                type: String,
                default: ""
            },
            specialization: {
                type: String,
                default: ""
            },
            department: {
                type: String,
                default: ""
            },
            performanceScale: {
                type: String,
                default: ""
            }
        },
        isFilled: {
            type: Boolean,
            default: false
        }

    },
    skills: {
        skills: {
            type: Array,
            default: [],
        },
        isFilled: {
            type: Boolean,
            default: false
        }
    },
    preferences: {
        currentLookingFor: {
            type: String,
            enum: ["Internships", "Jobs", ""],
            default: ""
        },
        types: {
            type: String,
            enum: ["In-office", "Remote", ""],
            default: ""
        },
        interests: {
            firstPreference: {
                type: String,
                default: ""
            },
            secondPreference: {
                type: String,
                default: ""
            },
            thirdPreference: {
                type: String,
                default: ""
            }
        },
        preferredLocations: {
            type: Array,
            default: []
        },
        isFilled: {
            type: Boolean,
            default: false
        }
    },
    workSamples: {
        blog: {
            type: String,
            default: ""
        },
        github: {
            type: String,
            default: ""
        },
        linkedIn: {
            type: String,
            default: ""
        },
        isFilled: {
            type: Boolean,
            default: false
        }
    },
    role: {
        type: String,
        default: 'student',
        enum: ['student', 'admin']
    },
    verified: {
        type: Boolean,
        default: false
    }
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;