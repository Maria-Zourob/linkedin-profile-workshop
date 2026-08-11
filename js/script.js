let activeStepId = 1;


// =========================================================
// STEPS DATA
// =========================================================

const steps = [

    {
        id: 1,

        title: "Profile Photo",

        description:
            "Use a clear and professional profile photo that immediately creates a strong first impression.",

        why:
            "Your profile photo is often the first visual element recruiters notice.",

        icon: "fa-user",

        example:
            "Use a clear headshot with good lighting, a simple background, and a friendly professional appearance.",

        tip:
            "Choose a recent photo where your face is clearly visible."
    },


    {
        id: 2,

        title: "Headline",

        description:
            "Write a clear headline that explains who you are, what you do, and what you bring to the table.",

        why:
            "Your headline appears across LinkedIn and helps people understand your professional direction quickly.",

        icon: "fa-heading",

        example:
            "Full Stack Developer | ASP.NET Core | React | SQL Server",

        tip:
            "Don't use only your job title. Include the skills or area you want to be known for."
    },


    {
        id: 3,

        title: "About Section",

        description:
            "Tell your professional story in a short and clear summary that shows your experience, skills, and goals.",

        why:
            "A strong About section helps recruiters understand who you are beyond your job title.",

        icon: "fa-align-left",

        example:
            "Software developer passionate about building scalable web applications using ASP.NET Core, React and SQL Server.",

        tip:
            "Keep it concise and write it in your own natural voice."
    },


    {
        id: 4,

        title: "Experience",

        description:
            "Add your relevant work experience and describe what you actually contributed to each role.",

        why:
            "Experience shows recruiters how you have applied your skills in real situations.",

        icon: "fa-briefcase",

        example:
            "Frontend Developer — Built responsive interfaces using HTML, CSS and JavaScript.",

        tip:
            "Focus on achievements and results instead of listing responsibilities only."
    },


    {
        id: 5,

        title: "Education",

        description:
            "Add your university, degree, and relevant academic information in a clean and professional way.",

        why:
            "Education gives recruiters context about your background and technical foundation.",

        icon: "fa-graduation-cap",

        example:
            "Bachelor's Degree in Intelligent Systems and Computer Engineering",

        tip:
            "Include relevant coursework or academic achievements when they strengthen your profile."
    },


    {
        id: 6,

        title: "Skills",

        description:
            "Add the technical and professional skills that best represent your capabilities.",

        why:
            "Skills help recruiters quickly match your profile with the requirements of a role.",

        icon: "fa-code",

        example:
            "ASP.NET Core, C#, SQL Server, React, JavaScript, Git",

        tip:
            "Prioritize skills that match the jobs you want."
    },


    {
        id: 7,

        title: "Featured Section",

        description:
            "Showcase your strongest projects, certificates, posts, or achievements in one visible place.",

        why:
            "The Featured section gives recruiters concrete evidence of what you can actually do.",

        icon: "fa-star",

        example:
            "Add your GitHub projects, portfolio, certificates, or important professional posts.",

        tip:
            "Quality matters more than quantity. Choose your strongest work."
    },


    {
        id: 8,

        title: "Certifications",

        description:
            "Add relevant certifications and courses that support your professional direction.",

        why:
            "Relevant certifications can reinforce your skills and show continuous learning.",

        icon: "fa-certificate",

        example:
            "Add certificates from recognized platforms, training programs, or professional organizations.",

        tip:
            "Only include certifications that are relevant to your career."
    },


    {
        id: 9,

        title: "Projects",

        description:
            "Showcase projects that demonstrate your practical skills and problem-solving ability.",

        why:
            "Projects give recruiters real examples of what you have built and how you work.",

        icon: "fa-diagram-project",

        example:
            "Add 2–4 strong projects with a title, short description, technologies used, and a GitHub or live link.",

        tip:
            "Choose projects that are relevant to the type of job you want."
    },


    {
        id: 10,

        title: "Custom LinkedIn URL",

        description:
            "Create a clean and professional LinkedIn profile URL that is easy to share.",

        why:
            "A clean URL looks more professional on your CV, portfolio, email signature, and applications.",

        icon: "fa-link",

        example:
            "linkedin.com/in/maria-zourob",

        tip:
            "Keep it simple, professional, and as close to your name as possible."
    }

];


// =========================================================
// DOM ELEMENTS
// =========================================================

const welcomeSection =
    document.getElementById("welcomeSection");

const stepsSection =
    document.getElementById("stepsSection");

const startBtn =
    document.getElementById("startBtn");

const sidebarSteps =
    document.getElementById("sidebarSteps");

const sidebarCounter =
    document.getElementById("sidebarCounter");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");

const stepNumber =
    document.getElementById("currentStepNumber");

const stepNumberShort =
    document.getElementById(
        "currentStepNumberShort"
    );

const stepTitle =
    document.getElementById(
        "currentStepTitle"
    );

const stepDescription =
    document.getElementById(
        "currentStepDescription"
    );

const stepWhy =
    document.getElementById(
        "currentStepWhy"
    );

const stepExample =
    document.getElementById(
        "currentStepExample"
    );

const stepTip =
    document.getElementById(
        "currentStepTip"
    );

const stepCompleteBtn =
    document.getElementById(
        "stepCompleteBtn"
    );

const nextStepBtn =
    document.getElementById(
        "nextStepBtn"
    );

const stepPanel =
    document.querySelector(
        ".step-panel"
    );

const completionOverlay =
    document.getElementById(
        "completionOverlay"
    );

const giftStage =
    document.getElementById(
        "giftStage"
    );

const giftBox =
    document.getElementById(
        "giftBox"
    );

const giftHint =
    document.getElementById(
        "giftHint"
    );

const successMessage =
    document.getElementById(
        "successMessage"
    );

const score =
    document.getElementById(
        "score"
    );

const closeCompletion =
    document.getElementById(
        "closeCompletion"
    );


// =========================================================
// STATE
// =========================================================

let completedSteps =
    JSON.parse(
        localStorage.getItem(
            "linkedinCompletedSteps"
        )
    ) || [];

let giftOpened = false;


// =========================================================
// START WORKSHOP
// =========================================================

startBtn.addEventListener(
    "click",
    () => {

        welcomeSection.classList.add(
            "hidden"
        );

        stepsSection.classList.remove(
            "hidden"
        );

        activeStepId = 1;

        renderSidebar();

        renderCurrentStep();

        updateProgress();

      scrollToStep();

    }
);


// =========================================================
// RENDER CURRENT STEP
// =========================================================

function renderCurrentStep() {

    const step =
        steps.find(
            item =>
                item.id === activeStepId
        );

    if (!step) return;


    stepNumber.textContent =
        `Step ${step.id} of ${steps.length}`;


    stepNumberShort.textContent =
        String(step.id).padStart(2, "0");


    stepTitle.textContent =
        step.title;


    stepDescription.textContent =
        step.description;


    stepWhy.textContent =
        step.why;


    stepExample.textContent =
        step.example;


    stepTip.textContent =
        step.tip;


    const isCompleted =
        completedSteps.includes(
            step.id
        );


    // =====================================================
    // COMPLETE BUTTON
    // =====================================================

    if (isCompleted) {

        stepCompleteBtn.innerHTML =
            `
                <i class="fa-solid fa-check"></i>
                Completed
            `;

        stepCompleteBtn.disabled =
            true;

        stepCompleteBtn.classList.add(
            "completed"
        );

    } else {

        stepCompleteBtn.innerHTML =
            `
                <i class="fa-regular fa-circle-check"></i>
                Mark as completed
            `;

        stepCompleteBtn.disabled =
            false;

        stepCompleteBtn.classList.remove(
            "completed"
        );

    }


    // =====================================================
    // NEXT BUTTON
    // =====================================================

    if (
        activeStepId ===
        steps.length
    ) {

        nextStepBtn.innerHTML =
            `
                Finish
                <i class="fa-solid fa-check"></i>
            `;

    } else {

        nextStepBtn.innerHTML =
            `
                Next step
                <i class="fa-solid fa-arrow-right"></i>
            `;

    }


    // =====================================================
    // ANIMATION
    // =====================================================

    stepPanel.classList.remove(
        "animate"
    );

    void stepPanel.offsetWidth;

    stepPanel.classList.add(
        "animate"
    );

}


// =========================================================
// RENDER SIDEBAR
// =========================================================

function renderSidebar() {

    sidebarSteps.innerHTML = "";

    steps.forEach(
        step => {

            const isCompleted =
                completedSteps.includes(
                    step.id
                );

            const isActive =
                activeStepId === step.id;


            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "sidebar-item";


            if (isActive) {

                button.classList.add(
                    "active"
                );

            }


            if (isCompleted) {

                button.classList.add(
                    "completed"
                );

            }


            button.innerHTML =
                `

                    <div
                        class="sidebar-step-number"
                    >
                        ${
                            isCompleted
                                ? '<i class="fa-solid fa-check"></i>'
                                : String(step.id).padStart(2, "0")
                        }
                    </div>


                    <div
                        class="sidebar-item-content"
                    >

                        <span
                            class="sidebar-item-title"
                        >
                            ${step.title}
                        </span>


                        <span
                            class="sidebar-item-status"
                        >
                            ${
                                isCompleted
                                    ? "Completed"
                                    : isActive
                                        ? "Current step"
                                        : `Step ${step.id}`
                            }
                        </span>

                    </div>

                `;


            button.addEventListener(
                "click",
                () => {

                    activeStepId =
                        step.id;

                    renderSidebar();

                    renderCurrentStep();

                    scrollToStep();
                }
            );


            sidebarSteps.appendChild(
                button
            );

        }
    );

}


// =========================================================
// MARK COMPLETE
// =========================================================

stepCompleteBtn.addEventListener(
    "click",
    () => {

        if (
            completedSteps.includes(
                activeStepId
            )
        ) {

            return;
        }


        completedSteps.push(
            activeStepId
        );


        localStorage.setItem(
            "linkedinCompletedSteps",
            JSON.stringify(
                completedSteps
            )
        );


        renderSidebar();

        renderCurrentStep();

        updateProgress();

    }
);


// =========================================================
// NEXT STEP
// =========================================================

nextStepBtn.addEventListener(
    "click",
    () => {

        const currentIndex =
            steps.findIndex(
                step =>
                    step.id ===
                    activeStepId
            );


        // =================================================
        // LAST STEP
        // =================================================

        if (
            currentIndex ===
            steps.length - 1
        ) {

            if (
                !completedSteps.includes(
                    activeStepId
                )
            ) {

                stepCompleteBtn.animate(
                    [
                        {
                            transform:
                                "translateX(0)"
                        },
                        {
                            transform:
                                "translateX(-5px)"
                        },
                        {
                            transform:
                                "translateX(5px)"
                        },
                        {
                            transform:
                                "translateX(0)"
                        }
                    ],
                    {
                        duration: 300
                    }
                );

                return;
            }


            showCompletionGift();

            return;

        }


        // =================================================
        // NEXT
        // =================================================

        activeStepId =
            steps[
                currentIndex + 1
            ].id;


        renderSidebar();

        renderCurrentStep();

        scrollToStep();
    }
);


// =========================================================
// UPDATE PROGRESS
// =========================================================

function updateProgress() {

    const total =
        steps.length;

    const completed =
        completedSteps.length;


    const percentage =
        Math.round(
            (
                completed /
                total
            ) * 100
        );


    progressBar.style.width =
        `${percentage}%`;


    progressText.textContent =
        `${percentage}%`;


    sidebarCounter.textContent =
        `${completed} / ${total}`;


    if (score) {

        score.textContent =
            percentage;

    }


    if (
        percentage === 100 &&
        !giftOpened
    ) {

        setTimeout(
            () => {

                showCompletionGift();

            },
            600
        );

    }

}


// =========================================================
// SHOW GIFT
// =========================================================

function showCompletionGift() {

    completionOverlay.classList.remove(
        "hidden"
    );

    document.body.classList.add(
        "overflow-hidden"
    );

}


// =========================================================
// OPEN GIFT
// =========================================================

function openGift() {

    if (giftOpened) {

        return;

    }


    giftOpened =
        true;


    giftBox.classList.add(
        "gift-pop"
    );


    giftHint.textContent =
        "Opening your reward...";


    createConfetti();


    setTimeout(
        () => {

            giftStage.classList.add(
                "hidden"
            );

            successMessage.classList.remove(
                "hidden"
            );

        },
        600
    );

}


// =========================================================
// CLOSE
// =========================================================

function closeCompletionGift() {

    completionOverlay.classList.add(
        "hidden"
    );

    document.body.classList.remove(
        "overflow-hidden"
    );

}


// =========================================================
// CONFETTI
// =========================================================

function createConfetti() {

    const colors = [

        "#2563eb",
        "#22c55e",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
        "#ec4899"

    ];


    const count = 80;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const confetti =
            document.createElement(
                "div"
            );


        confetti.classList.add(
            "confetti"
        );


        const size =
            Math.random() * 8 + 5;


        confetti.style.left =
            `${Math.random() * 100}vw`;


        confetti.style.width =
            `${size}px`;


        confetti.style.height =
            `${size * 1.5}px`;


        confetti.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        confetti.style.borderRadius =
            Math.random() > 0.5
                ? "50%"
                : "2px";


        const duration =
            Math.random() * 2 + 2;


        confetti.style.animationDuration =
            `${duration}s`;


        confetti.style.animationDelay =
            `${Math.random() * 0.4}s`;


        document.body.appendChild(
            confetti
        );


        setTimeout(
            () => {

                confetti.remove();

            },
            (duration + 1) * 1000
        );

    }

}
// =========================================================
// SMART SCROLL
// =========================================================

function scrollToStep() {

    const isMobile =
        window.innerWidth <= 640;

    if (isMobile) {

        stepPanel.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    } else {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
}

// =========================================================
// EVENTS
// =========================================================

giftBox.addEventListener(
    "click",
    openGift
);


closeCompletion.addEventListener(
    "click",
    closeCompletionGift
);

button.addEventListener(
    "click",
    () => {

        activeStepId = step.id;

        renderSidebar();

        renderCurrentStep();

        setTimeout(() => {
            scrollToStep();
        }, 50);

    }
);
// =========================================================
// INITIAL RENDER
// =========================================================

renderSidebar();

updateProgress();