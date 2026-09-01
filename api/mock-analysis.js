export function generateMockAnalysis(resumeText, jobDescription) {

    const jd = jobDescription.toLowerCase();

    const skills = [
        "javascript",
        "react",
        "html",
        "css",
        "git",
        "node.js",
        "express.js",
        "mongodb"
    ];

    const matchedSkills = skills.filter(
        skill =>
            resumeText.toLowerCase().includes(skill) &&
            jd.includes(skill)
    );

    const missingSkills = skills.filter(
        skill =>
            jd.includes(skill) &&
            !resumeText.toLowerCase().includes(skill)
    );

    const matchScore = Math.min(
        95,
        Math.max(
            35,
            50 + matchedSkills.length * 8 - missingSkills.length * 4
        )
    );

    return {
        matchScore,

        matchedSkills,

        missingSkills,

        strengths: matchedSkills.length
            ? `Your resume matches the job description in ${matchedSkills.length} key skill areas.`
            : "Your resume currently has limited skill overlap with this job description.",

        improvementSuggestions: [
            missingSkills.length
                ? `Consider improving your knowledge of ${missingSkills.slice(0, 2).join(" and ")}.`
                : "Your technical skills align well with this job description.",

            "Add measurable achievements to your resume bullets.",

            "Highlight projects that demonstrate the skills mentioned in the job description."
        ]
    };
}