// =========================================================
// STATE
// =========================================================

let toastTimeout;
let activeStepId = 1;

let completedSteps =
    JSON.parse(
        localStorage.getItem("linkedinCompletedSteps")
    ) || [];

let giftOpened = false;

let participantName =
    localStorage.getItem("participantName") || "";

let certificateId =
    localStorage.getItem("certificateId") || "";

function generateCertificateId() {

    if (!certificateId) {

        const year =
            new Date().getFullYear();

        const uniquePart =
            Date.now()
                .toString(36)
                .toUpperCase()
                .slice(-6);

        certificateId =
            `BB-LINKEDIN-${year}-${uniquePart}`;

        localStorage.setItem(
            "certificateId",
            certificateId
        );
    }

    return certificateId;
}


// =========================================================
// START BUTTON
// =========================================================

let justCompletedStepId = null;


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
        example: `
    <span class="block text-slate-500">
        Your URL:
    </span>

    <strong class="mt-1 block text-slate-700">
        linkedin.com/in/your-name
    </strong>

    <span class="mt-3 block text-xs text-slate-400">
        Example: linkedin.com/in/maria-zourob
    </span>
`,
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

const startBtnText =
    document.getElementById("startBtnText");

const sidebarSteps =
    document.getElementById("sidebarSteps");

const sidebarCounter =
    document.getElementById("sidebarCounter");

const resetWorkshopBtn =
    document.getElementById("resetWorkshopBtn");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");

const stepNumber =
    document.getElementById("currentStepNumber");

const stepNumberShort =
    document.getElementById("currentStepNumberShort");

const stepTitle =
    document.getElementById("currentStepTitle");

const stepDescription =
    document.getElementById("currentStepDescription");

const stepWhy =
    document.getElementById("currentStepWhy");

const stepExample =
    document.getElementById("currentStepExample");

const stepTip =
    document.getElementById("currentStepTip");

const stepCompleteBtn =
    document.getElementById("stepCompleteBtn");

const nextStepBtn =
    document.getElementById("nextStepBtn");

const stepPanel =
    document.querySelector(".step-panel");


// =========================================================
// COMPLETION ELEMENTS
// =========================================================

const completionOverlay =
    document.getElementById("completionOverlay");

const giftStage =
    document.getElementById("giftStage");

const giftBox =
    document.getElementById("giftBox");

const giftHint =
    document.getElementById("giftHint");

const successMessage =
    document.getElementById("successMessage");

const score =
    document.getElementById("score");

const closeCompletion =
    document.getElementById("closeCompletion");


// =========================================================
// INCOMPLETE STEPS MODAL
// =========================================================

const incompleteStepsModal =
    document.getElementById(
        "incompleteStepsModal"
    );

const remainingStepsList =
    document.getElementById(
        "remainingStepsList"
    );

const closeIncompleteSteps =
    document.getElementById(
        "closeIncompleteSteps"
    );

const goToIncompleteStep =
    document.getElementById(
        "goToIncompleteStep"
    );

const stayOnStepBtn =
    document.getElementById(
        "stayOnStepBtn"
    );

const giftSound =
    document.getElementById("giftSound");

const completeSound =
    document.getElementById("completeSound");


// =========================================================
// NAME MODAL
// =========================================================

const nameModal =
    document.getElementById("nameModal");

const participantNameInput =
    document.getElementById("participantName");

const continueWorkshopBtn =
    document.getElementById("continueWorkshopBtn");

const closeNameModal =
    document.getElementById("closeNameModal");

const nameError =
    document.getElementById("nameError");


if (participantName) {

    startBtnText.textContent =
        `Continue as ${participantName}`;

}


// =========================================================
// CERTIFICATE
// =========================================================

const certificate =
    document.getElementById("certificate");

const certificateOverlay =
    document.getElementById("certificateOverlay");

const certificateParticipantName =
    document.getElementById(
        "certificateParticipantName"
    );

const certificateIdDisplay =
    document.getElementById(
        "certificateId"
    );

const successParticipantName =
    document.getElementById(
        "successParticipantName"
    );

const certificateBtn =
    document.getElementById(
        "certificateBtn"
    );

const closeCertificate =
    document.getElementById(
        "closeCertificate"
    );

const downloadCertificate =
    document.getElementById(
        "downloadCertificate"
    );

const stepCompletionToast =
    document.getElementById(
        "stepCompletionToast"
    );

const closeStepCompletionToast =
    document.getElementById(
        "closeStepCompletionToast"
    );


// =========================================================
// RESET WORKSHOP
// =========================================================

const resetModal =
    document.getElementById("resetModal");

const cancelResetBtn =
    document.getElementById("cancelResetBtn");

const confirmResetBtn =
    document.getElementById("confirmResetBtn");


// =========================================================
// START WORKSHOP
// =========================================================

startBtn.addEventListener("click", () => {

    nameModal.classList.remove("hidden");

    nameModal.classList.add(
        "flex",
        "items-center",
        "justify-center"
    );

    participantNameInput.value =
        participantName;

    nameError.classList.add("hidden");

    setTimeout(() => {
        participantNameInput.focus();
    }, 100);

});


continueWorkshopBtn.addEventListener(
    "click",
    startWorkshop
);


participantNameInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            startWorkshop();

        }

    }
);


closeNameModal.addEventListener(
    "click",
    () => {

        nameModal.classList.add("hidden");

        nameModal.classList.remove(
            "flex",
            "items-center",
            "justify-center"
        );

    }
);


// =========================================================
// START WORKSHOP FUNCTION
// =========================================================

function startWorkshop() {

    const name =
        participantNameInput.value.trim();

    if (!name) {

        nameError.classList.remove("hidden");

        participantNameInput.focus();

        return;

    }

    participantName = name;

    localStorage.setItem(
        "participantName",
        participantName
    );

    nameModal.classList.add("hidden");

    welcomeSection.classList.add("hidden");

    stepsSection.classList.remove("hidden");

    activeStepId = 1;

    renderSidebar();

    renderCurrentStep();

    updateProgress();

    scrollToStep();

}


function showStepCompletionToast() {

    if (!stepCompletionToast) {
        return;
    }

    clearTimeout(toastTimeout);

    // Reset animation

    stepCompletionToast.classList.remove(
        "toast-in",
        "toast-out"
    );

    // Show

    stepCompletionToast.classList.remove(
        "hidden"
    );

    // Restart animation

    void stepCompletionToast.offsetWidth;

    stepCompletionToast.classList.add(
        "toast-in"
    );

    // Hide automatically

    toastTimeout = setTimeout(() => {

        hideStepCompletionToast();

    }, 3000);

}


function hideStepCompletionToast() {

    if (!stepCompletionToast) {
        return;
    }

    stepCompletionToast.classList.remove(
        "toast-in"
    );

    stepCompletionToast.classList.add(
        "toast-out"
    );

    setTimeout(() => {

        stepCompletionToast.classList.add(
            "hidden"
        );

        stepCompletionToast.classList.remove(
            "toast-out"
        );

    }, 300);

}


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

    stepExample.innerHTML =
        step.example;

    stepTip.textContent =
        step.tip;

    const isCompleted =
        completedSteps.includes(step.id);


    // =====================================================
    // COMPLETE BUTTON
    // =====================================================

    if (isCompleted) {

        stepCompleteBtn.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Completed
        `;

        stepCompleteBtn.disabled = true;

        stepCompleteBtn.className = `
            flex items-center justify-center gap-2
            rounded-xl px-5 py-3
            bg-emerald-50 text-emerald-600
            border border-emerald-200
            font-semibold
            cursor-not-allowed
        `;

    } else {

        stepCompleteBtn.innerHTML = `
            <i class="fa-regular fa-circle-check"></i>
            Mark as completed
        `;

        stepCompleteBtn.disabled = false;

        stepCompleteBtn.className = `
            flex items-center justify-center gap-2
            rounded-xl px-5 py-3
            bg-white text-slate-700
            border border-slate-200
            font-semibold
            hover:border-blue-300
            hover:text-blue-600
            transition-all duration-200
        `;

    }


    // =====================================================
    // NEXT BUTTON
    // =====================================================

    if (activeStepId === steps.length) {

        nextStepBtn.innerHTML = `
            Finish
            <i class="fa-solid fa-check"></i>
        `;

    } else {

        nextStepBtn.innerHTML = `
            Next step
            <i class="fa-solid fa-arrow-right"></i>
        `;

    }


    // =====================================================
    // SIMPLE TAILWIND ANIMATION
    // =====================================================

    stepPanel.classList.remove(
        "opacity-0",
        "translate-y-2"
    );

    stepPanel.classList.add(
        "transition-all",
        "duration-300",
        "opacity-100",
        "translate-y-0"
    );

}


// =========================================================
// RENDER SIDEBAR
// =========================================================

function renderSidebar() {

    sidebarSteps.innerHTML = "";

    steps.forEach(step => {

        const isCompleted =
            completedSteps.includes(step.id);

        const isActive =
            activeStepId === step.id;

        const button =
            document.createElement("button");

        button.type = "button";

        button.className = `
            w-full flex items-center gap-3
            text-left rounded-xl p-3
            border transition-all duration-200
            group
        `;

        if (isActive) {

            button.classList.add(
                "bg-blue-50",
                "border-blue-200",
                "text-blue-700"
            );

        } else {

            button.classList.add(
                "bg-transparent",
                "border-transparent",
                "hover:bg-slate-50"
            );

        }


        // =================================================
        // STEP NUMBER
        // =================================================

        const numberDiv =
            document.createElement("div");

        numberDiv.className = `
            w-9 h-9 shrink-0
            rounded-lg
            flex items-center justify-center
            text-sm font-bold
        `;

        if (isCompleted) {

            numberDiv.classList.add(
                "bg-emerald-500",
                "text-white"
            );

            if (
                justCompletedStepId === step.id
            ) {

                numberDiv.classList.add(
                    "sidebar-check-pop"
                );

            }

            numberDiv.innerHTML =
                `<i class="fa-solid fa-check"></i>`;

        } else if (isActive) {

            numberDiv.classList.add(
                "bg-blue-600",
                "text-white"
            );

            numberDiv.textContent =
                String(step.id).padStart(2, "0");

        } else {

            numberDiv.classList.add(
                "bg-slate-100",
                "text-slate-500"
            );

            numberDiv.textContent =
                String(step.id).padStart(2, "0");

        }


        // =================================================
        // CONTENT
        // =================================================

        const contentDiv =
            document.createElement("div");

        contentDiv.className =
            "min-w-0 flex-1";

        const title =
            document.createElement("span");

        title.className =
            "block text-sm font-semibold truncate";

        title.textContent =
            step.title;

        const status =
            document.createElement("span");

        status.className =
            "block text-xs mt-0.5 text-slate-400";

        if (isCompleted) {

            status.textContent =
                "Completed";

            status.classList.remove(
                "text-slate-400"
            );

            status.classList.add(
                "text-emerald-500"
            );

        } else if (isActive) {

            status.textContent =
                "Current step";

            status.classList.remove(
                "text-slate-400"
            );

            status.classList.add(
                "text-blue-500"
            );

        } else {

            status.textContent =
                `Step ${step.id}`;

        }

        contentDiv.appendChild(title);

        contentDiv.appendChild(status);

        button.appendChild(numberDiv);

        button.appendChild(contentDiv);


        // =================================================
        // CLICK
        // =================================================

        button.addEventListener(
            "click",
            () => {

                activeStepId = step.id;

                renderSidebar();

                justCompletedStepId = null;

                renderCurrentStep();

                scrollToStep();

            }
        );


        if (isActive) {

            setTimeout(() => {

                button.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "start"
                });

            }, 50);

        }

        sidebarSteps.appendChild(button);

    });

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

        justCompletedStepId =
            activeStepId;

        showStepCompletionToast();

        // Play completion sound

        completeSound.currentTime = 0;

        completeSound
            .play()
            .catch(() => {});

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
// SHOW INCOMPLETE STEPS MODAL
// =========================================================

function showIncompleteStepsModal() {

    const incompleteSteps =
        steps.filter(
            step =>
                !completedSteps.includes(step.id)
        );

    if (incompleteSteps.length === 0) {
        return;
    }

    // Clear previous list

    remainingStepsList.innerHTML = "";

    // Render remaining steps

    incompleteSteps.forEach(step => {

        const stepItem =
            document.createElement("button");

        stepItem.type = "button";

        stepItem.className = `
            flex w-full items-center gap-3
            rounded-lg
            border border-white
            bg-white
            p-3
            text-left
            transition-all duration-200
            hover:border-blue-200
            hover:bg-blue-50
        `;

        stepItem.innerHTML = `

            <span
                class="
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-lg
                    bg-slate-100
                    text-xs font-bold
                    text-slate-500
                "
            >
                ${String(step.id).padStart(2, "0")}
            </span>

            <span
                class="
                    min-w-0 flex-1
                    text-sm font-semibold
                    text-slate-700
                "
            >
                ${step.title}
            </span>

            <i
                class="
                    fa-solid fa-arrow-right
                    text-xs text-slate-400
                "
            ></i>
        `;

        stepItem.addEventListener(
            "click",
            () => {

                closeIncompleteStepsModal();

                goToStep(step.id);

            }
        );

        remainingStepsList.appendChild(
            stepItem
        );

    });

    // Show modal

    incompleteStepsModal.classList.remove(
        "hidden"
    );

    incompleteStepsModal.classList.add(
        "flex"
    );

    document.body.classList.add(
        "overflow-hidden"
    );

}


// =========================================================
// CLOSE INCOMPLETE STEPS MODAL
// =========================================================

function closeIncompleteStepsModal() {

    incompleteStepsModal.classList.add(
        "hidden"
    );

    incompleteStepsModal.classList.remove(
        "flex"
    );

    document.body.classList.remove(
        "overflow-hidden"
    );

}


// =========================================================
// GO TO STEP
// =========================================================

function goToStep(stepId) {

    activeStepId = stepId;

    renderSidebar();

    renderCurrentStep();

    scrollToStep();

}


// =========================================================
// NEXT STEP
// =========================================================

nextStepBtn.addEventListener(
    "click",
    () => {

        const currentIndex =
            steps.findIndex(
                step =>
                    step.id === activeStepId
            );


        // =================================================
        // LAST STEP
        // =================================================

        if (
            currentIndex ===
            steps.length - 1
        ) {

            // =================================================
            // CHECK ALL STEPS BEFORE FINISHING
            // =================================================

            const incompleteSteps =
                steps.filter(
                    step =>
                        !completedSteps.includes(
                            step.id
                        )
                );


            // If there are incomplete steps

            if (incompleteSteps.length > 0) {

                // Give visual feedback on current button

                shakeButton(
                    stepCompleteBtn
                );


                // Show clear explanation

                showIncompleteStepsModal();

                return;

            }


            // =================================================
            // ALL STEPS COMPLETED
            // =================================================

            showCompletionGift();

            return;

        }


        // =================================================
        // NEXT
        // =================================================

        activeStepId =
            steps[currentIndex + 1].id;

        renderSidebar();

        renderCurrentStep();

        scrollToStep();

    }
);


// =========================================================
// SHAKE BUTTON
// =========================================================

function shakeButton(button) {

    button.classList.add(
        "animate-pulse"
    );

    setTimeout(() => {

        button.classList.remove(
            "animate-pulse"
        );

    }, 500);

}


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
            (completed / total) * 100
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

    if (percentage === 100) {

        progressBar.classList.add(
            "bg-emerald-500"
        );

        progressBar.classList.remove(
            "bg-blue-600"
        );

        if (!giftOpened) {

            setTimeout(() => {

                showCompletionGift();

            }, 700);

        }

    } else {

        progressBar.classList.remove(
            "bg-emerald-500"
        );

        progressBar.classList.add(
            "bg-blue-600"
        );

    }

}


// =========================================================
// SHOW GIFT
// =========================================================

function showCompletionGift() {

    // Generate certificate ID once

    generateCertificateId();

    completionOverlay.classList.remove("hidden");

    completionOverlay.classList.add(
        "flex",
        "items-center",
        "justify-center"
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

    giftOpened = true;

    giftSound.currentTime = 0;

    giftSound
        .play()
        .catch(() => {});

    giftBox.classList.add(
        "scale-110"
    );

    giftHint.textContent =
        "Opening your reward...";

    createConfetti();

    setTimeout(() => {

        giftStage.classList.add(
            "hidden"
        );

        successMessage.classList.remove(
            "hidden"
        );

        if (successParticipantName) {

            successParticipantName.textContent =
                participantName;

        }

    }, 600);

}


// =========================================================
// CLOSE COMPLETION
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
            document.createElement("div");

        confetti.className = `
            fixed top-0
            w-2 h-3
            z-[9999]
            pointer-events-none
        `;

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

        confetti.animate(
            [
                {
                    transform:
                        `translateY(-20px) rotate(0deg)`,
                    opacity: 1
                },
                {
                    transform:
                        `translateY(100vh) rotate(720deg)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    Math.random() * 2000 + 2000,

                delay:
                    Math.random() * 400,

                easing:
                    "ease-out"
            }
        );

        document.body.appendChild(
            confetti
        );

        setTimeout(
            () => {

                confetti.remove();

            },
            3500
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
// CERTIFICATE
// =========================================================

certificateBtn.addEventListener(
    "click",
    () => {

        generateCertificateId();

        certificateParticipantName.textContent =
            participantName;

        certificateIdDisplay.textContent =
            certificateId;

        certificateOverlay.classList.remove(
            "hidden"
        );

        document.body.classList.add(
            "overflow-hidden"
        );

    }
);


// =========================================================
// CLOSE CERTIFICATE
// =========================================================

closeCertificate.addEventListener(
    "click",
    () => {

        certificateOverlay.classList.add(
            "hidden"
        );

        document.body.classList.remove(
            "overflow-hidden"
        );

    }
);


// =========================================================
// DOWNLOAD CERTIFICATE
// =========================================================

downloadCertificate.addEventListener(
    "click",
    async () => {

        const originalText =
            downloadCertificate.innerHTML;

        downloadCertificate.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Preparing Certificate...
        `;

        downloadCertificate.disabled = true;

        try {

            // Make sure certificate data is updated

            generateCertificateId();

            certificateParticipantName.textContent =
                participantName;

            certificateIdDisplay.textContent =
                certificateId;


            // =====================================================
            // WAIT FOR CERTIFICATE IMAGES
            // =====================================================

            const images =
                certificate.querySelectorAll("img");

            await Promise.all(
                Array.from(images).map(img => {

                    if (img.complete) {
                        return Promise.resolve();
                    }

                    return new Promise(resolve => {

                        img.onload = resolve;
                        img.onerror = resolve;

                    });

                })
            );


            // =====================================================
            // HIGH QUALITY CANVAS
            // =====================================================

            const canvas =
                await html2canvas(
                    certificate,
                    {
                        scale: 4,
                        useCORS: true,
                        allowTaint: false,
                        backgroundColor: "#ffffff",
                        logging: false,
                        imageTimeout: 15000,
                        scrollX: 0,
                        scrollY: 0
                    }
                );


            // =====================================================
            // CREATE A4 LANDSCAPE PDF
            // =====================================================

            const {
                jsPDF
            } = window.jspdf;

            const pdf =
                new jsPDF({
                    orientation: "landscape",
                    unit: "mm",
                    format: "a4",
                    compress: true
                });

            const pageWidth =
                pdf.internal.pageSize.getWidth();

            const pageHeight =
                pdf.internal.pageSize.getHeight();


            // =====================================================
            // KEEP ORIGINAL ASPECT RATIO
            // =====================================================

            const canvasRatio =
                canvas.width / canvas.height;

            const pageRatio =
                pageWidth / pageHeight;

            let pdfWidth;
            let pdfHeight;
            let x;
            let y;

            if (canvasRatio > pageRatio) {

                pdfWidth = pageWidth;

                pdfHeight =
                    pageWidth / canvasRatio;

                x = 0;

                y =
                    (pageHeight - pdfHeight) / 2;

            } else {

                pdfHeight = pageHeight;

                pdfWidth =
                    pageHeight * canvasRatio;

                x =
                    (pageWidth - pdfWidth) / 2;

                y = 0;

            }


            // =====================================================
            // EXPORT AS HIGH-QUALITY PNG
            // =====================================================

            const imageData =
                canvas.toDataURL(
                    "image/png"
                );

            pdf.addImage(
                imageData,
                "PNG",
                x,
                y,
                pdfWidth,
                pdfHeight,
                undefined,
                "FAST"
            );


            // =====================================================
            // FILE NAME
            // =====================================================

            const safeName =
                participantName
                    .replace(
                        /[^a-z0-9]/gi,
                        "-"
                    )
                    .replace(
                        /-+/g,
                        "-"
                    )
                    .replace(
                        /^-|-$/g,
                        ""
                    );

            const shortCertificateId =
                certificateId
                    .split("-")
                    .pop();

            pdf.save(
                `${safeName}-LinkedIn-Workshop-${shortCertificateId}.pdf`
            );


        } catch (error) {

            console.error(
                "Certificate generation failed:",
                error
            );

            alert(
                "Sorry, we couldn't generate the certificate. Please try again."
            );

        } finally {

            downloadCertificate.innerHTML =
                originalText;

            downloadCertificate.disabled =
                false;

        }

    }
);


// =========================================================
// EVENTS
// =========================================================

closeIncompleteSteps.addEventListener(
    "click",
    closeIncompleteStepsModal
);

stayOnStepBtn.addEventListener(
    "click",
    closeIncompleteStepsModal
);

goToIncompleteStep.addEventListener(
    "click",
    () => {

        const firstIncompleteStep =
            steps.find(
                step =>
                    !completedSteps.includes(
                        step.id
                    )
            );

        if (!firstIncompleteStep) {
            return;
        }

        closeIncompleteStepsModal();

        goToStep(
            firstIncompleteStep.id
        );

    }
);

giftBox.addEventListener(
    "click",
    openGift
);

closeCompletion.addEventListener(
    "click",
    closeCompletionGift
);


// =========================================================
// OPEN RESET MODAL
// =========================================================

resetWorkshopBtn.addEventListener(
    "click",
    () => {

        resetModal.classList.remove("hidden");

        resetModal.classList.add(
            "flex",
            "items-center",
            "justify-center"
        );

    }
);


// =========================================================
// CANCEL RESET
// =========================================================

cancelResetBtn.addEventListener(
    "click",
    () => {

        resetModal.classList.add("hidden");

        resetModal.classList.remove(
            "flex",
            "items-center",
            "justify-center"
        );

    }
);


// =========================================================
// CONFIRM RESET
// =========================================================

confirmResetBtn.addEventListener(
    "click",
    () => {

        // Clear saved progress

        localStorage.removeItem(
            "linkedinCompletedSteps"
        );

        localStorage.removeItem(
            "certificateId"
        );

        completedSteps = [];

        certificateId = "";

        activeStepId = 1;

        giftOpened = false;


        // Close reset modal

        resetModal.classList.add("hidden");

        resetModal.classList.remove(
            "flex",
            "items-center",
            "justify-center"
        );


        // Reset completion UI

        giftStage.classList.remove("hidden");

        successMessage.classList.add("hidden");


        // Update workshop

        renderSidebar();

        renderCurrentStep();

        updateProgress();


        // Scroll to first step

        scrollToStep();

    }
);


closeStepCompletionToast.addEventListener(
    "click",
    hideStepCompletionToast
);


// =========================================================
// INITIAL RENDER
// =========================================================

renderSidebar();

updateProgress();

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
        const isHidden = mobileMenu.classList.contains("hidden");

        if (isHidden) {
            mobileMenu.classList.remove("hidden");
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            mobileMenuBtn.setAttribute("aria-expanded", "true");
        } else {
            mobileMenu.classList.add("hidden");
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            mobileMenuBtn.setAttribute("aria-expanded", "false");
        }
    });
}

