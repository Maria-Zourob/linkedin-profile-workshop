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

                        <div class="page-scale delay-200 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg text-white shadow-sm sm:h-12 sm:w-12 sm:text-xl">
                            <i class="fa-brands fa-linkedin-in"></i>
                        </div>

                        <div class="page-load delay-300 min-w-0">

                            <div class="flex items-center gap-2 sm:gap-3">

                                <h1 class="truncate text-sm font-bold tracking-tight text-slate-900 sm:text-lg">
                                    LinkedIn Profile Upgrade
                                </h1>

                                <span class="hidden rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 sm:inline-flex">
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

                        <a
                            href="./content.html"
                            class="group inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-100 hover:shadow-sm"
                        >
                            <i class="fa-solid fa-book-open transition-transform duration-300 group-hover:scale-110"></i>

                            Workshop Content
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
                        href="./content.html"
                        class="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                    >

                        <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
                            <i class="fa-solid fa-book-open"></i>
                        </span>

                        <span>
                            Workshop Content
                        </span>

                        <i class="fa-solid fa-arrow-right ml-auto text-xs"></i>

                    </a>

                </div>

            </header>
        `;

        this.setupMobileMenu();
    }


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
}

customElements.define("site-header", SiteHeader);