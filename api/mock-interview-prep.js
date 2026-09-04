export function generateMockInterviewQuestions({
    role,
    difficulty,
    focusAreas,
    numQuestions,
}) {
    const questions = [];

    if (focusAreas.technical) {
        questions.push(
            {
                category: "Technical",
                question: `What are the most important concepts you would focus on as a ${role}?`,
            },
            {
                category: "Technical",
                question: `Explain a challenging technical problem you have faced while working with ${role}-related technologies.`,
            },
            {
                category: "Technical",
                question: `How would you approach debugging an issue in a ${role} project?`,
            },
            {
                category: "Technical",
                question: `What tools or technologies are commonly used by a ${role}, and why?`,
            },
            {
                category: "Technical",
                question: `How do you make sure your code is maintainable and easy for other developers to understand?`,
            }
        );
    }

    if (focusAreas.behavioral) {
        questions.push(
            {
                category: "Behavioral",
                question: `Tell me about a challenging project you worked on as a ${role} and how you handled it.`,
            },
            {
                category: "Behavioral",
                question: `Tell me about a time you made a mistake in a project. What did you learn from it?`,
            },
            {
                category: "Behavioral",
                question: `Describe a situation where you had to learn something new quickly.`,
            },
            {
                category: "Behavioral",
                question: `How do you handle disagreements with a teammate?`,
            },
            {
                category: "Behavioral",
                question: `Tell me about a time when you had to work under a tight deadline.`,
            }
        );
    }

    if (focusAreas.hr) {
        questions.push(
            {
                category: "HR / General",
                question: `Why are you interested in working as a ${role}?`,
            },
            {
                category: "HR / General",
                question: `Why should we hire you for this ${role}?`,
            },
            {
                category: "HR / General",
                question: `Where do you see yourself growing in this career?`,
            },
            {
                category: "HR / General",
                question: `What are your strengths and weaknesses?`,
            },
            {
                category: "HR / General",
                question: `Why do you want to join our company?`,
            }
        );
    }

    // Shuffle questions so the same questions aren't always shown first.
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);

    return {
        role,
        difficulty,
        questions: shuffledQuestions.slice(0, numQuestions),
    };
}