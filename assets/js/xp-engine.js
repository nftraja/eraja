// ERaja XP + Level Engine

const ERajaXP = {

    baseXP: 100,

    getProfile() {
        let profile = ERajaStorage.get("profile");

        if (!profile) {
            profile = {
                name: "Student",
                ageGroup: "6-10",
                role: "student",
                xp: 0,
                level: 1,
                badges: [],
                completedMissions: [],
                completedLessons: []
            };
            ERajaStorage.set("profile", profile);
        }

        return profile;
    },

    saveProfile(profile) {
        ERajaStorage.set("profile", profile);
    },

    addXP(amount) {
        let profile = this.getProfile();

        profile.xp += amount;

        while (profile.xp >= this.xpToNextLevel(profile.level)) {
            profile.xp -= this.xpToNextLevel(profile.level);
            profile.level += 1;
        }

        this.saveProfile(profile);
        return profile;
    },

    xpToNextLevel(level) {
        return this.baseXP + (level - 1) * 50;
    },

    getProgressPercentage() {
        let profile = this.getProfile();
        let needed = this.xpToNextLevel(profile.level);
        return Math.floor((profile.xp / needed) * 100);
    },

    addBadge(badgeName) {
        let profile = this.getProfile();

        if (!profile.badges.includes(badgeName)) {
            profile.badges.push(badgeName);
        }

        this.saveProfile(profile);
    },

    completeMission(missionId) {
        let profile = this.getProfile();

        if (!profile.completedMissions.includes(missionId)) {
            profile.completedMissions.push(missionId);
            this.addXP(20);
        }

        this.saveProfile(profile);
    },

    completeLesson(lessonId) {
        let profile = this.getProfile();

        if (!profile.completedLessons.includes(lessonId)) {
            profile.completedLessons.push(lessonId);
            this.addXP(10);
        }

        this.saveProfile(profile);
    }

};