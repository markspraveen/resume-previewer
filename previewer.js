// Author: Praveen
// Creation Date: 2023-09-25
// Description: Script for dynamically generating resume sections and handling page overflow.
// Git: https://github.com/praveenyen

const resume = document.querySelector(".resume");

function getSection(sectionData) {
  if (!sectionData) return;
  if (sectionData.isHidden) return;
  if (sectionData.sectionType === "personal_information") {
    return getPersonalInformation(sectionData);
  } else if (sectionData.sectionType === "summary") {
    return getSummary(sectionData);
  } else if (sectionData.sectionType === "publications") {
    return getPublications(sectionData);
  } else if (sectionData.sectionType === "volunteering") {
    return getVolunteering(sectionData);
  } else if (sectionData.sectionType === "certifications") {
    return getCertifications(sectionData);
  } else if (sectionData.sectionType === "skills") {
    return getSkills(sectionData);
  } else if (sectionData.sectionType === "work_experience") {
    return getWorkExperience(sectionData);
  } else if (sectionData.sectionType === "education") {
    return getEducation(sectionData);
  } else if (sectionData.sectionType === "awards") {
    return getAwards(sectionData);
  } else if (sectionData.sectionType === "references") {
    return getReferences(sectionData);
  } else if (sectionData.sectionType === "achievements") {
    return getAchievements(sectionData);
  }
}

function getReferences(sectionData) {
  const references = document.createElement("div");
  references.innerHTML = `
                <h2>References</h2>
                <p>${sectionData.data}</p>`;

  return references;
}

function getEducation(sectionData) {
  const education = document.createElement("div");
  education.innerHTML = `
                <h2>Education</h2>
                <ul>
                    ${sectionData.data
                      .map(
                        (education) => `
                        <li>
                            <h3>${education.institution_name}</h3>
                            <p>${education.field_of_study} - ${education.city}, ${education.country}</p>
                            <p>${education.from_date} - ${education.to_date}</p>
                            <p>${education.description}</p>
                        </li>
                    `
                      )
                      .join("")}
                </ul>`;

  return education;
}

function getWorkExperience(sectionData) {
  const workExperience = document.createElement("div");
  workExperience.innerHTML = `
                <h2>Experience</h2>
                <ul>
                    ${sectionData.data
                      .map(
                        (experience) => `
                        <li>
                            <h3>${experience.title}</h3>
                            <p>${experience.company_name} - ${experience.city}, ${experience.country}</p>
                            <p>${experience.from_date} - ${experience.to_date}</p>
                            <p>${experience.description}</p>
                        </li>
                    `
                      )
                      .join("")}
                </ul>`;

  return workExperience;
}

function getSkills(sectionData) {
  const skills = document.createElement("div");
  skills.innerHTML = `
                <h2>Skills</h2>
                <ul>
                    ${sectionData.data
                      .map((skill) => `<li>${skill}</li>`)
                      .join("")}
                </ul>`;

  return skills;
}

function getPersonalInformation(sectionData) {
  const personalInformation = document.createElement("div");
  personalInformation.innerHTML = `
                <h2>Personal Information</h2>
                <p>First Name: ${sectionData.data.firstName}</p>
                <p>Last Name: ${sectionData.data.lastName}</p>
                <p>Email: ${sectionData.data.email}</p>
                <p>Phone: ${sectionData.data.phone}</p>`;

  return personalInformation;
}

function getSummary(sectionData) {
  const summary = document.createElement("div");
  summary.innerHTML = `
                <h2>Summary</h2>
                <p>${sectionData.data}</p>`;

  return summary;
}

function addSection(sectionIndex) {
  const section = resumeData[sectionIndex];
  const sectionElement = document.createElement("div");
  sectionElement.classList.add("section");
  sectionElement.id = section.sectionType;
  sectionElement.innerHTML = getSection(section).innerHTML;

  const pages = document.querySelectorAll(".page");
  const lastPage = pages[pages.length - 1];
  lastPage.appendChild(sectionElement);

  const isPageOverflow = isLastPageOverflow();
  if (isPageOverflow) {
    lastPage.removeChild(sectionElement);
    const newPage = lastPage.cloneNode(false); // create a new page without deep cloning
    resume.appendChild(newPage);
    newPage.appendChild(sectionElement);
  }
}

function isLastPageOverflow() {
  const pages = document.querySelectorAll(".page");
  const lastPage = pages[pages.length - 1];
  return lastPage.scrollHeight > lastPage.clientHeight;
}

function setResumeScale(scale) {
  const resumeElement = document.querySelector('.resume');
  if (resumeElement) {
    resumeElement.style.transform = `scale(${scale})`;
  }
}

window.onresize = function() {
  const A4_WIDTH = 794; // A4 width in pixels at 96 DPI
  const currentWidth = document.body.clientWidth;
  const scale = currentWidth / A4_WIDTH;
  setResumeScale(scale - 0.3);
};



window.onabort = () => {
    window.removeEventListener("message", handleMessage);
}

window.onload = () => {
    setResumeScale('1')
  const sortedResumeData = resumeData.sort((a, b) => a.order - b.order);
  sortedResumeData.forEach((section, sectionIndex) => {
    if (!section.isHidden) {
      addSection(sectionIndex);
    }
  });
};

function addDummySection() {
    addSection(resumeData.length -1)
}

const resumeData = [
  {
    order: 2,
    isHidden: false,
    sectionType: "personal_information",
    title: "Personal Information",
    data: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "(123) 456-7890",
    },
  },
  {
    order: 3,
    isHidden: false,
    sectionType: "summary",
    title: "Summary",
    data: "A highly motivated and detail-oriented web developer with a passion for front-end development. Skilled in HTML, CSS, JavaScript, and Python. Strong team collaboration skills with a focus on problem-solving.",
  },
  {
    order: 30,
    isHidden: false,
    sectionType: "skills",
    title: "Skills",
    data: [
      "Proficient in HTML, CSS, JavaScript, and Python",
      "Strong communication and team collaboration skills",
      "Excellent problem-solving abilities",
    ],
  },
  {
    order: 4,
    isHidden: false,
    sectionType: "work_experience",
    title: "Experience",
    data: [
      {
        order: 1,
        company_name: "Credit Saison",
        title: "Frontend Developer",
        city: "Tokyo",
        country: "Japan",
        from_date: "Jan 2020",
        to_date: "Present",
        description:
          "Developed user interface elements using JavaScript, HTML, and CSS based on the requirements gathered from clients. Participated in project meetings, with technical staff and business stakeholders, to analyze business requirements and outline proposed IT solutions.",
      },
      {
        order: 2,
        company_name: "Tech Solutions",
        title: "Web Developer Intern",
        city: "New York",
        country: "USA",
        from_date: "May 2018",
        to_date: "Dec 2019",
        description:
          "Assisted in the development of user interface elements using JavaScript, HTML, and CSS based on the requirements gathered from clients. Participated in project meetings, with technical staff and business stakeholders, to analyze business requirements and outline proposed IT solutions.",
      },
      {
        order: 3,
        company_name: "Tech Solutions",
        title: "Web Developer Intern",
        city: "New York",
        country: "USA",
        from_date: "May 2018",
        to_date: "Dec 2019",
        description:
          "Assisted in the development of user interface elements using JavaScript, HTML, and CSS based on the requirements gathered from clients. Participated in project meetings, with technical staff and business stakeholders, to analyze business requirements and outline proposed IT solutions.",
      },
    ],
  },
  {
    order: 5,
    isHidden: false,
    sectionType: "education",
    title: "Education",
    data: [
      {
        order: 1,
        institution_name: "University of Technology",
        field_of_study: "Computer Science",
        degree: "Bachelor of Science",
        city: "New York",
        country: "USA",
        from_date: "May 2018",
        to_date: "May 2022",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis sit amet nunc fringilla ultricies. Nullam nec nunc nec nunc ultricies.",
      },
    ],
  },
  {
    order: 6,
    isHidden: false,
    sectionType: "references",
    title: "References",
    data: "Available upon request.",
  },
];
