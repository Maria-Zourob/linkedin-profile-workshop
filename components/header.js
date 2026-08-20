class SiteHeader extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {

        this.innerHTML = `
            <header class="page-load-down sticky top-0 z-40 border-b border-slate-200 bg-white">

                <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">

                    <!-- Brand -->
                    <div class="flex min-w-0 items-center gap-3 sm:gap-4">

                        <div
                            class="page-scale delay-200 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg text-white shadow-sm sm:h-12 sm:w-12 sm:text-xl"
                        >
                            <i class="fa-brands fa-linkedin-in"></i>
                        </div>

                        <div class="page-load delay-300 min-w-0">

                            <div class="flex items-center gap-2 sm:gap-3">

                                <h1 class="truncate text-sm font-bold tracking-tight text-slate-900 sm:text-lg">
                                    LinkedIn Profile Upgrade
                                </h1>

                                <!-- Page Badge -->
                                <span
                                    id="pageBadge"
                                    class="hidden rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 sm:inline-flex"
                                >
                                    Workshop
                                </span>

                            </div>

                            <p class="mt-1 hidden text-sm text-slate-500 sm:block">
                                Review · Improve · Stand Out
                            </p>

                        </div>

                    </div>


                    <!-- Desktop Navigation -->
                    <div class="hidden items-center gap-4 md:flex">

                        <!-- Dynamic Navigation Button -->
                        <a
                            id="pageNavLink"
                            href="./content.html"
                            class="group inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-100 hover:shadow-sm"
                        >

                            <i
                                id="pageNavIcon"
                                class="fa-solid fa-book-open transition-transform duration-300 group-hover:scale-110"
                            ></i>

                            <span id="pageNavText">
                                Workshop Steps
                            </span>

                        </a>


                        <!-- Presenter -->
                        <div class="page-load delay-400 flex items-center gap-3">

                            <div class="text-right">

                                <strong class="block text-sm font-semibold text-slate-900">
                                    Maria Zourob
                                </strong>

                                <span class="text-xs text-slate-500">
                                    Profile Workshop
                                </span>

                            </div>

                            <img
                                src="./assets/images/maria.jpg"
                                alt="Maria Zourob"
                                class="h-11 w-11 rounded-full border-2 border-white object-cover shadow-md ring-1 ring-slate-200 transition duration-300 hover:scale-105"
                            >

                        </div>

                    </div>


                    <!-- Mobile Menu Button -->
                    <button
                        id="mobileMenuBtn"
                        type="button"
                        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 md:hidden"
                        aria-label="Open menu"
                        aria-expanded="false"
                    >
                        <i class="fa-solid fa-bars"></i>
                    </button>

                </div>


                <!-- Mobile Menu -->
                <div
                    id="mobileMenu"
                    class="hidden border-t border-slate-100 bg-white px-4 py-4 md:hidden"
                >

                    <a
                        id="mobilePageNavLink"
                        href="./content.html"
                        class="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                    >

                        <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">

                            <i
                                id="mobilePageNavIcon"
                                class="fa-solid fa-book-open"
                            ></i>

                        </span>

                        <span id="mobilePageNavText">
                            Workshop Steps
                        </span>

                        <i class="fa-solid fa-arrow-right ml-auto text-xs"></i>

                    </a>

                </div>

            </header>
        `;

        this.setupMobileMenu();
        this.setupPageInfo();
    }


    // =====================================================
    // MOBILE MENU
    // =====================================================

    setupMobileMenu() {

        const button = this.querySelector("#mobileMenuBtn");
        const menu = this.querySelector("#mobileMenu");

        if (!button || !menu) return;

        button.addEventListener("click", () => {

            const isOpen = !menu.classList.contains("hidden");

            menu.classList.toggle("hidden");

            button.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            const icon = button.querySelector("i");

            if (icon) {

                icon.classList.toggle(
                    "fa-bars",
                    isOpen
                );

                icon.classList.toggle(
                    "fa-xmark",
                    !isOpen
                );

            }

        });

    }


    // =====================================================
    // PAGE INFORMATION
    // =====================================================

    setupPageInfo() {

        const pageBadge = this.querySelector("#pageBadge");

        const pageNavLink = this.querySelector("#pageNavLink");
        const pageNavText = this.querySelector("#pageNavText");
        const pageNavIcon = this.querySelector("#pageNavIcon");

        const mobilePageNavLink =
            this.querySelector("#mobilePageNavLink");

        const mobilePageNavText =
            this.querySelector("#mobilePageNavText");

        const mobilePageNavIcon =
            this.querySelector("#mobilePageNavIcon");


        if (!pageBadge || !pageNavLink) return;


        // Get current HTML file
        const currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        // =====================================================
        // INDEX PAGE
        // =====================================================

        if (
            currentPage === "index.html" ||
            currentPage === ""
        ) {

            // Badge
            pageBadge.textContent = "Workshop";


            // Desktop button
            pageNavLink.href = "./content.html";

            pageNavText.textContent = "Workshop Steps";

            pageNavIcon.className =
                "fa-solid fa-book-open transition-transform duration-300 group-hover:scale-110";


            // Mobile button
            if (mobilePageNavLink) {
                mobilePageNavLink.href = "./content.html";
            }

            if (mobilePageNavText) {
                mobilePageNavText.textContent =
                    "Workshop Steps";
            }

            if (mobilePageNavIcon) {
                mobilePageNavIcon.className =
                    "fa-solid fa-book-open";
            }

        }


        // =====================================================
        // CONTENT PAGE
        // =====================================================

        else if (currentPage === "content.html") {

            // Badge
            pageBadge.textContent = "Workshop Content";


            // Desktop button
            pageNavLink.href = "./index.html";

            pageNavText.textContent = "Back to Workshop";

            pageNavIcon.className =
                "fa-solid fa-arrow-left transition-transform duration-300 group-hover:scale-110";


            // Mobile button
            if (mobilePageNavLink) {
                mobilePageNavLink.href = "./index.html";
            }

            if (mobilePageNavText) {
                mobilePageNavText.textContent =
                    "Back to Workshop";
            }

            if (mobilePageNavIcon) {
                mobilePageNavIcon.className =
                    "fa-solid fa-arrow-left";
            }

        }

    }

}


customElements.define("site-header", SiteHeader);