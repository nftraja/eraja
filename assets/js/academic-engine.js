// ERaja Academic Engine

const ERajaAcademic = {

    currentSubject: null,
    currentData: null,

    async loadSubject() {

        this.currentSubject = localStorage.getItem("eraja_currentSubject");

        if (!this.currentSubject) {
            alert("No subject selected");
            window.location.href = "academic.html";
            return;
        }

        try {
            const response = await fetch(`../data/academic/${this.currentSubject}.json`);
            this.currentData = await response.json();
            this.renderSubject();
        } catch (error) {
            console.error("Subject Load Error:", error);
        }
    },

    renderSubject() {

        const container = document.getElementById("subjectContainer");
        container.innerHTML = "";

        this.currentData.lessons.forEach(lesson => {

            const div = document.createElement("div");
            div.className = "lesson-card";
            div.innerHTML = `
                <h3>${lesson.title}</h3>
                <p>${lesson.description}</p>
                <button onclick="ERajaAcademic.openLesson('${lesson.id}')">
                    Start Lesson
                </button>
            `;
            container.appendChild(div);
        });
    },

    openLesson(lessonId) {
        localStorage.setItem("eraja_currentLesson", lessonId);
        window.location.href = "lesson.html";
    }

};