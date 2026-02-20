// ERaja Core Engine

const ERajaCore = {

    init() {
        console.log("ERaja App Initialized");

        this.initializeProfile();
        this.setupNavigation();
        this.loadUserRole();
    },

    initializeProfile() {
        const profile = ERajaXP.getProfile();
        console.log("Profile Loaded:", profile);
    },

    setupNavigation() {
        document.addEventListener("click", function (e) {
            const target = e.target.closest("[data-link]");
            if (target) {
                e.preventDefault();
                const page = target.getAttribute("data-link");
                if (page) {
                    window.location.href = page;
                }
            }
        });
    },

    loadUserRole() {
        const profile = ERajaXP.getProfile();

        document.body.setAttribute("data-role", profile.role);
        document.body.setAttribute("data-age", profile.ageGroup);
    },

    setUserRole(role, ageGroup, name = "Student") {
        let profile = ERajaXP.getProfile();

        profile.role = role;
        profile.ageGroup = ageGroup;
        profile.name = name;

        ERajaXP.saveProfile(profile);
    }

};


// Auto Boot
document.addEventListener("DOMContentLoaded", function () {
    ERajaCore.init();
});